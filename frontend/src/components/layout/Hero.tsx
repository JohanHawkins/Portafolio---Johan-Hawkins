export default function Hero() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 pt-16">
      <div className="text-center max-w-2xl">
        <p className="text-primary-400 font-medium text-sm tracking-wide uppercase mb-4">
          Ingeniero de Sistemas Junior
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-100 leading-tight mb-6">
          Hola, soy{' '}
          <span className="text-primary-400">Johan Hawkins</span>
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed mb-8">
          Desarrollo soluciones web eficientes y funcionales.
          Apasionado por la tecnología, el aprendizaje continuo
          y crear experiencias digitales limpias.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-500 transition-colors"
          >
            Ver proyectos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-surface-100 text-slate-300 text-sm font-medium rounded-lg hover:border-surface-200 hover:text-slate-100 transition-colors"
          >
            Contactar
          </a>
        </div>
      </div>
    </section>
  )
}
