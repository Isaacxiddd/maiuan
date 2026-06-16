import Container from './Container'

export default function Footer() {
  return (
    <footer className="py-10 border-t border-[var(--border)]">
      <Container className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="font-['Syne'] text-base font-bold tracking-[-0.03em] text-white">maiuan</span>
        <p className="text-[var(--text-muted)] text-xs">
          © {new Date().getFullYear()} maiuan. Buenos Aires.
        </p>
        <a
          href="https://instagram.com/maiuan.ba"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-200 text-xs"
        >
          @maiuan.ba ↗
        </a>
      </Container>
    </footer>
  )
}
