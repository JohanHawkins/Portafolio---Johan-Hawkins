import { useSkills } from '../../hooks/useSkills'
import SectionTitle from '../ui/SectionTitle'
import TechIcon3D from '../ui/TechIcon3D'
import { techIcons } from '../../data/techIcons'

const categoryLabels: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Base de datos',
  tools: 'Herramientas',
}

export default function SkillsSection() {
  const { data: skills, isLoading, isError } = useSkills()

  const grouped = skills?.reduce<Record<string, typeof skills>>((acc, skill) => {
    const cat = skill.category
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(skill)
    return acc
  }, {})

  return (
    <section id="skills" className="py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title="Habilidades"
          subtitle="Tecnologías con las que trabajo"
        />

        {isLoading && (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-2 border-surface-100 border-t-primary-400 rounded-full animate-spin" />
          </div>
        )}

        {isError && (
          <p className="text-center text-red-400 py-12">
            Error al cargar las habilidades.
          </p>
        )}

        {grouped && Object.keys(grouped).length === 0 && (
          <p className="text-center text-slate-500 py-12">
            No hay habilidades registradas.
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-10">
          {grouped &&
            Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                  {categoryLabels[category] ?? category}
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
                  {items.map((skill) => {
                    const info = techIcons[skill.icon ?? '']
                    if (info) {
                      return <TechIcon3D key={skill.id} tech={info} />
                    }
                    return (
                      <span
                        key={skill.id}
                        className="px-4 py-2 bg-surface-50 rounded-lg border border-surface-100 text-sm font-medium text-slate-200 shadow-card"
                      >
                        {skill.name}
                      </span>
                    )
                  })}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
