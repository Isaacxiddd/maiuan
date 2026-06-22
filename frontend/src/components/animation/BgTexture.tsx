import { useEffect, useRef } from 'react'
import { animate } from 'animejs'

interface Particle { x:number; y:number; vx:number; vy:number; r:number; a:number; acc:string }

const ACCENT = '232,255,0'
const WHITE  = '255,255,255'
const COUNT  = 70
const LINK   = 120

const ORBS = [
  { top: '-8%',  left: '62%', w: 660, h: 520, color: 'rgba(232,255,0,0.10)', blur: 85,  speed: 0.22, dur: 12000 },
  { top: '28%',  left: '-7%', w: 430, h: 430, color: 'rgba(255,255,255,0.045)', blur: 70, speed: 0.09, dur: 9000 },
  { top: '65%',  left: '42%', w: 540, h: 370, color: 'rgba(232,255,0,0.07)', blur: 95,  speed: 0.30, dur: 15000 },
]

export default function BgTexture() {
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const wrapRefs    = useRef<(HTMLDivElement | null)[]>([])
  const floatRefs   = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx    = canvas.getContext('2d')!
    let animId: number
    let pts: Particle[] = []

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }

    const spawn = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - .5) * .25,
      vy: (Math.random() - .5) * .25,
      r:  Math.random() * 1.2 + .4,
      a:  Math.random() * .35 + .08,
      acc: Math.random() < .18 ? ACCENT : WHITE,
    })

    const init = () => { resize(); pts = Array.from({ length: COUNT }, spawn) }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width)  p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.acc},${p.a})`
        ctx.fill()
        for (let j = i + 1; j < pts.length; j++) {
          const q  = pts[j]
          const dx = p.x - q.x, dy = p.y - q.y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < LINK) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(${p.acc},${(1 - d / LINK) * .06})`
            ctx.lineWidth = .5; ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }

    init(); draw()
    window.addEventListener('resize', init)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', init) }
  }, [])

  useEffect(() => {
    const anims = floatRefs.current.map((el, i) => {
      if (!el) return null
      const { dur } = ORBS[i]
      return animate(el, {
        keyframes: [
          { translateX: -38, translateY: -28 },
          { translateX:  28, translateY:  18 },
          { translateX: -18, translateY:  32 },
          { translateX:  34, translateY: -16 },
        ],
        duration:  dur,
        loop:      true,
        ease:      'inOutSine',
      })
    })

    let current  = 0
    let target   = 0
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
                width:        orb.w,
                height:       orb.h,
                background:   `radial-gradient(circle, ${orb.color} 0%, transparent 68%)`,
                borderRadius: '50%',
                filter:       `blur(${orb.blur}px)`,
                willChange:   'transform, opacity',
              }}
            />
          </div>
        ))}
        <div
          style={{
            position:   'absolute',
            inset:      0,
            background: `
              radial-gradient(ellipse 85% 55% at 50% 38%, transparent 25%, rgba(8,8,8,.85) 100%),
              radial-gradient(ellipse at 50% 0%, rgba(232,255,0,.018) 0%, transparent 50%)
            `,
          }}
        />
      </div>
    </>
  )
}
