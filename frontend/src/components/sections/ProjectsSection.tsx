import { motion } from 'framer-motion'
import { useProjects } from '../../hooks/useProjects'
import SectionTitle from '../ui/SectionTitle'
import StackedPile from '../ui/StackedPile'
import { ProjectCard, ProjectMiniCard } from './ProjectCard'
import { useSelection } from '../../context/SelectionContext'
import { getProjectsForSkills } from '../../data/skillProjectRelations'

export default function ProjectsSection() {
  const { data: projects, isLoading, isError } = useProjects()
  const { selectedSkills } = useSelection()

  const hasSelection = selectedSkills.length > 0
  const all = projects ?? []
  const related = hasSelection ? getProjectsForSkills(all, selectedSkills) : []
  const relatedIds = new Set(related.map((project) => project.id))
  const stackedProjects = hasSelection
    ? all.filter((project) => !relatedIds.has(project.id))
    : []

  return (
    <section id="projects" className="py-20 sm:py-28 bg-[#0e1527]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title="Proyectos"
          subtitle={
            hasSelection
              ? 'Proyectos asociados a las habilidades seleccionadas'
              : 'Algunos trabajos que he realizado'
          }
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

        {!isLoading && !isError && all.length === 0 && (
          <p className="text-center text-slate-500 py-12">
            No hay proyectos disponibles por el momento.
          </p>
        )}

        {!isLoading && !isError && all.length > 0 && (
          <>
            {hasSelection ? (
              <>
                {related.length === 0 ? (
                  <p className="text-center text-slate-500 py-12">
                    No hay proyectos asociados a las habilidades seleccionadas.
                  </p>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-6">
                    {related.map((project) => (
                      <motion.div
                        layoutId={`project-${project.id}`}
                        key={project.id}
                        className="h-full group rounded-xl ring-1 ring-primary-400/50"
                      >
                        <ProjectCard project={project} />
                      </motion.div>
                    ))}
                  </div>
                )}

                <StackedPile
                  count={stackedProjects.length}
                  cardWidth={7}
                  overlap={40}
                  heightClass="h-28"
                >
                  {stackedProjects.map((project) => (
                    <motion.div
                      layoutId={`project-${project.id}`}
                      key={project.id}
                    >
                      <ProjectMiniCard project={project} className="opacity-50" />
                    </motion.div>
                  ))}
                </StackedPile>
              </>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-6">
                {all.map((project, index) => (
                  <motion.div
                    layoutId={`project-${project.id}`}
                    key={project.id}
                    className="h-full group"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
