import { AnimatePresence, motion } from 'framer-motion'
import { techIcons } from '../../data/techIcons'
import type { Project } from '../../types/project'

interface SkillFlowSelection {
  skillName: string
  projects: Project[]
}

interface SkillFlowProps {
  selections: SkillFlowSelection[]
  onClear: () => void
}

const spring = { type: 'spring', stiffness: 220, damping: 26 } as const

export default function SkillFlow({ selections, onClear }: SkillFlowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 28 }}
      transition={spring}
      className="mt-10 rounded-2xl border border-surface-100 bg-surface-50/60 p-5 sm:p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Habilidades seleccionadas
        </p>
        <button
          type="button"
          onClick={onClear}
          className="text-xs font-medium text-slate-400 transition-colors hover:text-slate-100"
        >
          Limpiar filtro
        </button>
      </div>

      <div className="space-y-5">
        <AnimatePresence mode="popLayout" initial={false}>
          {selections.map(({ skillName, projects }) => {
            const info = Object.values(techIcons).find(
              (t) => t.name.toLowerCase() === skillName.toLowerCase(),
            )
            const Icon = info?.Icon

            return (
              <motion.div
                key={skillName}
                layout
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={spring}
                className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5"
              >
                <div className="flex shrink-0 items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-primary-400/40 bg-surface-50 shadow-card">
                    {Icon && <Icon style={{ color: info?.color }} className="text-3xl" />}
                  </div>
                  <p className="text-sm font-semibold text-slate-100">{skillName}</p>
                </div>

                <svg
                  className="hidden shrink-0 text-slate-600 sm:block"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>

                <div className="min-w-0 flex-1">
                  {projects.length > 0 ? (
                    <div className="flex items-stretch gap-4 overflow-x-auto pb-2">
                      {projects.map((project) => (
                        <div
                          key={project.id}
                          className="flex w-56 shrink-0 items-center gap-4 rounded-xl border border-surface-100 bg-surface-50 p-3 shadow-card"
                        >
                          {project.image && (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="h-14 w-14 shrink-0 rounded-lg object-cover"
                              loading="lazy"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-100">
                              {project.title}
                            </p>
                            <div className="mt-1.5 flex flex-wrap gap-1">
                              {project.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full bg-primary-900/40 px-2 py-0.5 text-[10px] font-medium text-primary-300"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-400">
                      No hay proyectos asociados a {skillName} por el momento.
                    </p>
                  )}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
