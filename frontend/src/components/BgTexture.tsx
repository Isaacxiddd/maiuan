import { useEffect, useRef } from 'react'

// ── Perlin noise (permutation table + grad2 + fade + lerp) ──────────────────
const _src = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,
  30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,
  203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,
  165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,
  92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,
  89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,
  226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,
  182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,
  43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,
  228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,
  49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,
  236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180]
const P = new Uint8Array(512)
for (let i = 0; i < 256; i++) P[i] = P[i + 256] = _src[i]

const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)
const lerp = (a: number, b: number, t: number) => a + t * (b - a)
const g2 = (h: number, x: number, y: number) => ((h & 1) ? -x : x) + ((h & 2) ? -y : y)

function pnoise(x: number, y: number): number {
  const X = Math.floor(x) & 255, Y = Math.floor(y) & 255
  x -= Math.floor(x); y -= Math.floor(y)
  const u = fade(x), v = fade(y)
  const a = P[X] + Y, b = P[X + 1] + Y
  return lerp(
    lerp(g2(P[a],     x,     y), g2(P[b],     x - 1, y),     u),
    lerp(g2(P[a + 1], x,     y - 1), g2(P[b + 1], x - 1, y - 1), u),
    v
  )
}

// fractional Brownian motion — 4 octaves
function fbm(x: number, y: number): number {
  return (
    pnoise(x,       y)       * 0.500 +
    pnoise(x * 2.1, y * 2.1) * 0.250 +
    pnoise(x * 4.3, y * 4.3) * 0.125 +
    pnoise(x * 8.7, y * 8.7) * 0.063
  ) / 0.938
}

// domain‑warped noise — fbm(p + fbm(p + fbm(p)))
// creates flowing, fluid-like organic shapes
function warp(x: number, y: number): number {
  const q0 = fbm(x + 0.0, y + 0.0)
  const q1 = fbm(x + 5.2, y + 1.3)
  const r0 = fbm(x + 4 * q0 + 1.7, y + 4 * q1 + 9.2)
  const r1 = fbm(x + 4 * q0 + 8.3, y + 4 * q1 + 2.8)
  return fbm(x + 4 * r0, y + 4 * r1)
}

// ── Color mapping ────────────────────────────────────────────────────────────
// bg: #080808  accent: #e8ff00 = (232,255,0)
function noiseToRGB(n: number): [number, number, number] {
  // n is ~[-0.6, 0.6] after domain warp, remap to [0,1]
  const t = Math.max(0, Math.min(1, (n + 0.6) / 1.2))

  if (t < 0.35) {
    // deep dark — near #080808
    const s = t / 0.35
    return [8 + s * 7, 8 + s * 7, 8 + s * 7]
  }
  if (t < 0.60) {
    // mid — dark grey with a warm whisper
    const s = (t - 0.35) / 0.25
    return [15 + s * 12, 15 + s * 14, 15 + s * 8]
  }
  if (t < 0.80) {
    // bright band — start bleeding the accent
    const s = (t - 0.60) / 0.20
    return [27 + s * 30, 29 + s * 38, 23 + s * 5]
  }
  // peak — vivid accent glow (still dark-ish)
  const s = (t - 0.80) / 0.20
  return [
    Math.min(255, 57 + s * 50),
    Math.min(255, 67 + s * 70),
    Math.min(255, 28 + s * 10),
  ]
}

// ── Component ────────────────────────────────────────────────────────────────
const SCALE = 4          // canvas pixels → screen pixels (lower = finer detail, heavier)
const FPS   = 22
const SPEED = 0.0018     // how fast noise drifts

export default function BgTexture() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx    = canvas.getContext('2d')!
    let   t      = 0
    let   timer  : ReturnType<typeof setTimeout>

    const resize = () => {
      canvas.width  = Math.ceil(window.innerWidth  / SCALE)
      canvas.height = Math.ceil(window.innerHeight / SCALE)
    }

    const frame = () => {
      const W = canvas.width, H = canvas.height
      const img = ctx.createImageData(W, H)
      const d   = img.data

      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const nx = x / W * 2.8 + t
          const ny = y / H * 2.8 + t * 0.7
          const n  = warp(nx, ny)
          const [r, g, b] = noiseToRGB(n)
          const i = (y * W + x) * 4
          d[i]     = r
          d[i + 1] = g
          d[i + 2] = b
          d[i + 3] = 255
        }
      }

      ctx.putImageData(img, 0, 0)
      t += SPEED
      timer = setTimeout(frame, 1000 / FPS)
    }

    resize()
    frame()
    window.addEventListener('resize', resize)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      {/* noise layer — upscaled & slightly blurred to smooth the pixels */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          width:  '100vw',
          height: '100vh',
          imageRendering: 'pixelated',
          filter: 'blur(18px) saturate(1.3)',
          opacity: 0.92,
        }}
      />
      {/* radial vignette — keeps edges dark so content stays legible */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 40%, transparent 30%, #080808 100%),
            radial-gradient(ellipse at 50% 0%, rgba(232,255,0,0.03) 0%, transparent 55%)
          `,
        }}
      />
    </>
  )
}
