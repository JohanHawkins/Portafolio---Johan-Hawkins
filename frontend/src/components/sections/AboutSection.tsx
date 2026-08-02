import SectionTitle from '../ui/SectionTitle'
import Reveal from '../ui/Reveal'

export default function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#0e1527]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title="Sobre mí"
          subtitle="Conoce un poco más sobre mi trayectoria"
        />

        <div className="max-w-3xl mx-auto space-y-5 text-slate-400 leading-relaxed">
          <Reveal>
            <p>
              Soy Ingeniero de Sistemas egresado de la Universidad del
              Magdalena (2025), con enfoque en el desarrollo full-stack
              con JavaScript, Angular, bases de datos y control de
              versiones. Me apasiona crear aplicaciones funcionales,
              bien estructuradas y con buenas prácticas de código.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              Disfruto tanto del frontend —donde cuido la experiencia
              de usuario— como del backend, asegurando APIs REST limpias
              y eficientes. Destaco por mi sólida lógica de programación,
              capacidad de debugging y resolución de problemas.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p>
              Busco integrarme a un equipo para aportar valor en todo
              el ciclo de desarrollo y seguir creciendo profesionalmente.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
