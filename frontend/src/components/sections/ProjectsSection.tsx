import { useProjects } from '../../hooks/useProjects'
import SectionTitle from '../ui/SectionTitle'
import Card from '../ui/Card'
import Tag from '../ui/Tag'

export default function ProjectsSection() {
  const { data: projects, isLoading, isError } = useProjects()

  return (
    <section id="projects" className="py-20 sm:py-28 bg-[#0e1527]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title="Proyectos"
          subtitle="Algunos trabajos que he realizado"
        />

        {isLoading && (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-2 border-surface-100 border-t-primary-400 rounded-full animate-spin" />
          </div>
        )}

        {isError && (
          <p className="text-center text-red-400 py-12">
            Error al cargar los proyectos. Intenta de nuevo más tarde.
          </p>
        )}

        {projects && projects.length === 0 && (
          <p className="text-center text-slate-500 py-12">
            No hay proyectos disponibles por el momento.
          </p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project) => (
            <Card key={project.id} className="p-6 flex flex-col">
              {project.image && (
                <div className="-mx-6 -mt-6 mb-4 overflow-hidden rounded-t-xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

              <h3 className="text-lg font-semibold text-slate-100 mb-2">
                {project.title}
              </h3>

              <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-surface-100">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    Live demo
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
