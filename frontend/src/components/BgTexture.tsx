import { useEffect, useRef } from 'react'
import { animate } from 'animejs'

const ACCENT = '232,255,0'
const WHITE  = '255,255,255'

interface WaveLine {
  yBase: number
  amp: number
  freq: number
  phase: number
  speed: number
  alpha: number
  color: string
}

const LINES = 22

// ── Orb config ─────────────────────────────────────────────────────────────────
const ORBS = [
  { top: '-6%',  left: '60%', w: 520, h: 420, color: 'rgba(232,255,0,0.07)', blur: 80,  speed: 0.22, dur: 12000 },
  { top: '30%',  left: '-5%', w: 360, h: 360, color: 'rgba(255,255,255,0.035)', blur: 65, speed: 0.09, dur: 9000 },
  { top: '62%',  left: '44%', w: 440, h: 300, color: 'rgba(232,255,0,0.05)', blur: 90,  speed: 0.30, dur: 15000 },
]

export default function BgTexture() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef  = useRef({ x: 0.5, y: 0.5, v: 0 })
  const wrapRefs  = useRef<(HTMLDivElement | null)[]>([])
  const floatRefs = useRef<(HTMLDivElement | null)[]>([])

  // ── Wave canvas ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let animId: number
    let lines: WaveLine[] = []
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initLines()
    }

    function initLines() {
      const spacing = canvas.height / (LINES + 1)
      lines = Array.from({ length: LINES }, (_, i) => ({
        yBase: spacing * (i + 1),
        amp:  6 + Math.random() * 10,
        freq: 0.5 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
        speed: 0.12 + Math.random() * 0.2,
        alpha: 0.12 + Math.random() * 0.18,
        color: Math.random() < 0.4 ? ACCENT : WHITE,
      }))
    }

    let prevX = 0.5

    const onMouse = (e: MouseEvent) => {
      const nx = e.clientX / canvas.width
      mouseRef.current = {
        x: nx,
        y: e.clientY / canvas.height,
        v: Math.abs(nx - prevX) * 5,
      }
      prevX = nx
    }

    const draw = () => {
      time += 0.008
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const vel = mouseRef.current.v
      mouseRef.current.v *= 0.92

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // ── Lines ────────────────────────────────────────────────────
      for (const l of lines) {
        ctx.beginPath()
        for (let x = 0; x <= canvas.width; x += 2) {
          const progress = Math.pow(x / canvas.width, 0.3)
          const boost = 1 + vel * 2
          const wave = l.amp * boost * progress * Math.sin(x * l.freq * 0.008 + l.phase + time * l.speed + (mx - 0.5) * 5)
          const y = l.yBase + wave + (l.yBase - canvas.height * 0.5) * (my - 0.5) * 0.25
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        const alpha = l.alpha * (0.85 + 0.15 * Math.sin(time * 0.5 + l.phase))
        ctx.strokeStyle = `rgba(${l.color},${alpha})`
        ctx.lineWidth = 1.2
        ctx.stroke()
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouse, { passive: true })

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  // ── Orb float + scroll parallax ─────────────────────────────────────────────
  useEffect(() => {
    const anims = floatRefs.current.map((el, i) => {
      if (!el) return null
      const { dur } = ORBS[i]
      return animate(el, {
        keyframes: [
          { translateX: -30, translateY: -22 },
          { translateX:  22, translateY:  14 },
          { translateX: -14, translateY:  26 },
          { translateX:  28, translateY: -12 },
        ],
        duration:  dur,
        loop:      true,
        ease:      'inOutSine',
      })
    })

    let current = 0
    let target  = 0
    let raf: number

    const onScroll = () => { target = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })

    const tick = () => {
      const velocity = target - current
      current += velocity * 0.07

      wrapRefs.current.forEach((el, i) => {
        if (!el) return
        el.style.transform = `translateY(${-(current * ORBS[i].speed).toFixed(2)}px)`
      })

      const glow = Math.min(1, 0.78 + Math.abs(velocity) * 0.018)
      floatRefs.current.forEach(el => { if (el) el.style.opacity = String(glow) })

      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
      anims.forEach(a => a?.revert())
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none -z-10" />

      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {ORBS.map((orb, i) => (
          <div
            key={i}
            ref={el => { wrapRefs.current[i] = el }}
            style={{ position: 'absolute', top: orb.top, left: orb.left }}
          >
            <div
              ref={el => { floatRefs.current[i] = el }}
              style={{
                width: orb.w, height: orb.h,
                background: `radial-gradient(circle, ${orb.color} 0%, transparent 68%)`,
                borderRadius: '50%',
                filter: `blur(${orb.blur}px)`,
                willChange: 'transform, opacity',
              }}
            />
          </div>
        ))}

        <div
          style={{
            position: 'absolute', inset: 0,
            background: `
              radial-gradient(ellipse 85% 55% at 50% 38%, transparent 25%, rgba(8,8,8,.85) 100%),
              radial-gradient(ellipse at 50% 0%, rgba(232,255,0,.015) 0%, transparent 50%)
            `,
          }}
        />
      </div>
    </>
  )
}
