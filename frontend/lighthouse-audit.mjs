import { spawn, execSync } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PORT = 4173
const URL = `http://localhost:${PORT}`
const REPORT_DIR = resolve(__dirname, 'reports')

// Hard timeout: force exit after 3.5 min (build ~60s + server ~10s + chrome+lh ~90s)
setTimeout(() => { process.exit(1) }, 210_000)

function log(msg) {
  process.stdout.write(msg + '\n')
}

function timeout(ms) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms))
}

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url)
      if (res.ok) return
    } catch { /* still starting */ }
    await new Promise(r => setTimeout(r, 500))
  }
  throw new Error('Server did not start in time')
}

function runBuild() {
  return new Promise((resolve_, reject) => {
    const p = spawn('pnpm', ['build'], { cwd: __dirname, shell: true, stdio: 'inherit' })
    p.on('close', code => code === 0 ? resolve_() : reject(new Error(`Build failed (exit ${code})`)))
  })
}

let _serverPid = null
let _chromePid = null

function killByPid(pid) {
  if (!pid) return
  try { execSync(`taskkill /F /T /PID ${pid}`, { stdio: 'pipe' }) } catch {}
}

async function killAll() {
  killByPid(_serverPid); _serverPid = null
  killByPid(_chromePid); _chromePid = null
}

const CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo']
const LABELS = { performance: 'Performance', accessibility: 'Accesibilidad', 'best-practices': 'Buenas prácticas', seo: 'SEO' }
const EMOJIS = { performance: '⚡', accessibility: '♿', 'best-practices': '✅', seo: '🔍' }
const WEIGHTS = { performance: 0.3, accessibility: 0.25, 'best-practices': 0.2, seo: 0.25 }

function bar(score, size = 20) {
  const filled = Math.round((score / 100) * size)
  const color = score >= 90 ? '\x1b[32m' : score >= 50 ? '\x1b[33m' : '\x1b[31m'
  return `${color}${'█'.repeat(filled)}${'\x1b[90m' + '░'.repeat(size - filled)}\x1b[0m`
}

function scoreColor(s) {
  return s >= 90 ? '\x1b[32m' : s >= 50 ? '\x1b[33m' : '\x1b[31m'
}

async function run() {
  log('Building...')
  await runBuild()

  log('Starting preview server...')
  const server = spawn('pnpm', ['preview', '--port', String(PORT)], {
    cwd: __dirname, shell: true, stdio: 'pipe', detached: false,
  })
  // Guardar PID del shell para poder matar el árbol de procesos en Windows
  _serverPid = server.pid
  // unref() evita que los pipes retengan el event loop de Node.js al finalizar
  server.unref()
  server.stderr.on('data', d => process.stderr.write(d))
  server.on('error', () => {})

  try {
    await waitForServer(URL)
    await mkdir(REPORT_DIR, { recursive: true })

    log('Launching Chrome...')
    const chrome = await Promise.race([
      chromeLauncher.launch({
        chromePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
      }),
      timeout(15000),
    ])
    _chromePid = chrome.pid

    try {
      log('Running Lighthouse audit...')
      const result = await Promise.race([
        lighthouse(URL, {
          port: chrome.port,
          output: 'html',
          onlyCategories: CATEGORIES,
          logLevel: 'error',
        }),
        timeout(45000),
      ])

      const htmlPath = resolve(REPORT_DIR, 'lighthouse-report.html')
      await writeFile(htmlPath, result.report)

      const scores = CATEGORIES.map(c => ({
        id: c, label: LABELS[c], emoji: EMOJIS[c],
        score: Math.round((result.lhr.categories[c].score ?? 0) * 100),
      }))

      const total = Math.round(
        scores.reduce((s, { score, id }) => s + score * WEIGHTS[id], 0) /
        Object.values(WEIGHTS).reduce((a, b) => a + b, 0)
      )

      log(`\n  ${'='.repeat(36)}`)
      log(`  ${'   RESUMEN LIGHTHOUSE'.padEnd(36)}`)
      log(`  ${'='.repeat(36)}\n`)

      for (const s of scores) {
        log(`  ${s.emoji}  ${s.label.padEnd(20)} ${bar(s.score)} ${scoreColor(s.score)}${s.score}\x1b[0m`)
      }

      log(`\n  ${'─'.repeat(36)}`)
      log(`  🏆  Total ponderado${' '.repeat(11)} ${scoreColor(total)}${total}\x1b[0m`)
      log(`  ${'─'.repeat(36)}`)
      log(`\n  Reporte: ${htmlPath}\n`)

    } finally {
      killByPid(_chromePid); _chromePid = null
    }
  } finally {
    // En Windows con shell:true, server.kill() solo mata cmd.exe, no vite.
    // killAll() usa taskkill /T /F /PID para matar el árbol completo.
    await killAll()
  }

  // Salida explícita: stdio:pipe retiene referencias en el event loop incluso
  // después de matar el proceso hijo, por lo que Node.js nunca saldría solo.
  process.exit(0)
}

run().catch(err => {
  log(`Error: ${err.message}`)
  process.exit(1)
})
