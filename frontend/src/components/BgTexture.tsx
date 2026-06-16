export default function BgTexture() {
  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10"
      style={{
        backgroundImage: `
          radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          radial-gradient(ellipse at 50% 0%, rgba(232,255,0,0.015) 0%, transparent 60%)
        `,
        backgroundSize: '28px 28px, 100% 100%',
      }}
    />
  )
}
