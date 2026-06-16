import { Injectable } from '@nestjs/common'

@Injectable()
export class LighthouseService {
  async run(url: string) {
    const chromeLauncher = await import('chrome-launcher')
    const lighthouse = await import('lighthouse')

    const chrome = await chromeLauncher.launch({
      chromePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
    })

    const timeout = <T>(ms: number) =>
      new Promise<T>((_, rej) => setTimeout(() => rej(new Error(`Lighthouse timeout after ${ms}ms`)), ms))

    try {
      const runnerResult = await Promise.race([
        lighthouse.default(url, {
          port: chrome.port,
          output: 'json',
          onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
          logLevel: 'error',
        }),
        timeout(90_000),
      ])

      if (!runnerResult?.lhr) throw new Error('No se obtuvo resultado de Lighthouse')

      const cats = runnerResult.lhr.categories
      const audits = runnerResult.lhr.audits

      return {
        scores: {
          performance: Math.round((cats.performance?.score ?? 0) * 100),
          accessibility: Math.round((cats.accessibility?.score ?? 0) * 100),
          'best-practices': Math.round((cats['best-practices']?.score ?? 0) * 100),
          seo: Math.round((cats.seo?.score ?? 0) * 100),
        },
        metrics: {
          tbt: audits['total-blocking-time']?.numericValue,
          lcp: audits['largest-contentful-paint']?.numericValue,
          cls: audits['cumulative-layout-shift']?.numericValue,
          si: audits['speed-index']?.numericValue,
          fcp: audits['first-contentful-paint']?.numericValue,
        },
      }
    } finally {
      try {
        await Promise.race([chrome.kill(), new Promise(r => setTimeout(r, 3000))])
      } catch { /* Windows EPERM fallo de limpieza */ }
      try { process.kill(chrome.pid) } catch { /* ya murió */ }
    }
  }
}
