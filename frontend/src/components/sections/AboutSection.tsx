import SectionTitle from '../ui/SectionTitle'

export default function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#0e1527]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title="Sobre mí"
          subtitle="Conoce un poco más sobre mi trayectoria"
        />

        <div className="max-w-3xl mx-auto space-y-5 text-slate-400 leading-relaxed">
          <p>
            Soy Ingeniero de Sistemas egresado de la Universidad XXX,
            con enfoque en el desarrollo web full-stack. Me apasiona
            crear aplicaciones funcionales, bien estructuradas y con
            buenas prácticas de código.
          </p>
          <p>
            Mi stack principal incluye TypeScript, React, Node.js y
            PostgreSQL. Disfruto tanto del frontend —donde cuido la
            experiencia de usuario— como del backend, asegurando APIs
            limpias y eficientes.
          </p>
          <p>
            Estoy en búsqueda de mi primera oportunidad profesional
            donde pueda aportar, seguir aprendiendo y crecer junto
            al equipo.
          </p>
        </div>
      </div>
    </section>
  )
}
