import { useLayoutEffect, useRef } from 'react'
import './MaiuanLogo.css'

export default function MaiuanLogo() {
  const iRef = useRef<HTMLSpanElement>(null)
  const uRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const i = iRef.current
    const u = uRef.current
    if (!i || !u) return

    const iRect = i.getBoundingClientRect()
    const uRect = u.getBoundingClientRect()
    const letterSpacing = parseFloat(getComputedStyle(i).letterSpacing) || 0

    // U se desplaza exactamente a donde está I (natural gap para "UI")
    const shiftU = uRect.left - iRect.left
    // I se desplaza al lugar que ocupa U + su letter-spacing (para que quede pegada a U)
    const shiftI = uRect.width + letterSpacing

    u.style.setProperty('--shift-u', `${shiftU}px`)
    i.style.setProperty('--shift-i', `${shiftI}px`)
  }, [])

  return (
    <a
      href="#"
      className="inline-flex flex-col items-center gap-[5px] cursor-pointer no-underline"
      style={{ lineHeight: 1 }}
    >
      <div className="ml-mark">
        <svg width="60" height="22" viewBox="20 55 325 120" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(0,207) scale(0.1,-0.1)" fill="#e8ff00" stroke="none">
            <path d="M1520 1400 c113 -142 208 -259 211 -260 3 0 99 117 213 260 114 143 212 260 216 260 5 0 67 -80 137 -177 126 -173 702 -991 738 -1046 l17 -27 -235 0 -236 0 -103 148 c-57 81 -164 237 -238 345 -74 108 -138 197 -141 197 -3 0 -20 -21 -38 -47 -59 -84 -325 -423 -332 -423 -6 0 -281 352 -355 454 l-20 28 -235 -349 -235 -348 -238 -3 c-131 -1 -236 1 -234 6 1 4 70 102 152 217 82 116 203 287 269 380 66 94 183 258 260 365 77 107 154 214 171 238 16 23 35 42 40 42 6 0 103 -117 216 -260z"/>
            <path d="M1553 577 l138 -162 -141 -3 c-77 -1 -203 -1 -279 0 l-139 3 129 163 c72 89 135 162 142 161 7 0 74 -73 150 -162z"/>
            <path d="M2203 577 c70 -87 127 -160 127 -163 0 -2 -124 -4 -276 -4 -165 0 -274 4 -272 9 8 24 273 321 283 319 6 -2 69 -74 138 -161z"/>
          </g>
        </svg>
      </div>

      <div className="ml-word-row">
        <span className="ml-letter ml-m">M</span>
        <span className="ml-letter ml-a1">A</span>
        <span ref={iRef} className="ml-letter ml-i">I</span>
        <span ref={uRef} className="ml-letter ml-u">U</span>
        <span className="ml-letter ml-a2">A</span>
        <span className="ml-letter ml-n">N</span>
      </div>
    </a>
  )
}
