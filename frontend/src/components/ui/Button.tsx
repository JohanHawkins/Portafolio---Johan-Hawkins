interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  children: React.ReactNode
}

const variants = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-500 focus-visible:ring-primary-400',
  secondary:
    'bg-surface-50 text-slate-200 hover:bg-surface-100 focus-visible:ring-slate-400',
  outline:
    'border border-surface-100 text-slate-300 hover:border-surface-200 hover:text-slate-100 focus-visible:ring-slate-400',
}

export default function Button({ variant = 'primary', children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${className ?? ''}`}
      {...props}
    >
      {children}
    </button>
  )
}
