import Reveal from './Reveal'

interface SectionTitleProps {
  title: string
  subtitle?: string
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <Reveal className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-100">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-slate-500 max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}
