interface CardProps {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={`bg-surface-50 rounded-xl border border-surface-100 shadow-card hover:shadow-card-hover hover:border-slate-600 transition-all ${className ?? ''}`}
    >
      {children}
    </div>
  )
}
