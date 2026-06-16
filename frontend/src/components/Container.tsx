import type { ReactNode, CSSProperties } from 'react'

interface Props {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export default function Container({ children, className = '', style }: Props) {
  return (
    <div
      data-container
      className={`w-full px-6 md:px-12 ${className}`}
      style={{ maxWidth: '72rem', marginLeft: 'auto', marginRight: 'auto', ...style }}
    >
      {children}
    </div>
  )
}
