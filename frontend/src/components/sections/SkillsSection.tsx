import { AnimatePresence, motion } from 'framer-motion'
import { useProjects } from '../../hooks/useProjects'
import { useSkills } from '../../hooks/useSkills'
import SectionTitle from '../ui/SectionTitle'
import StackedPile from '../ui/StackedPile'
import SkillIconCard from './SkillIconCard'
import SkillFlow from './SkillFlow'
import { useSelection } from '../../context/SelectionContext'
import {
  getProjectsForSkill,
  isSkillRelatedToAny,
} from '../../data/skillProjectRelations'
import type { Skill } from '../../types/skill'

const categoryLabels: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Base de datos',
  tools: 'Herramientas',
}

export default function SkillsSection() {
  const { data: skills, isLoading, isError } = useSkills()
  const { data: projects } = useProjects()
  const { selectedSkills, toggleSkill, clearSkills } = useSelection()

  const all = skills ?? []
  const projectsList = projects ?? []

  const selections = selectedSkills.map((skillName) => ({
    skillName,
    projects: getProjectsForSkill(projectsList, skillName),
  }))

  const stackedSkills =
    selectedSkills.length > 0
      ? all.filter(
          (skill) =>
            !selectedSkills.includes(skill.name) &&
            !isSkillRelatedToAny(skill, selectedSkills, projectsList),
        )
      : []

  const stackedIds = new Set(stackedSkills.map((skill) => skill.id))
  const activeSkills =
    selectedSkills.length > 0
      ? all.filter((skill) => !stackedIds.has(skill.id))
      : all

  const grouped = activeSkills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const cat = skill.category
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(skill)
    return acc
  }, {})

  const skillButtonClass = (skill: Skill) => {
    const isSelected = selectedSkills.includes(skill.name)
    const isRelated =
      !isSelected && isSkillRelatedToAny(skill, selectedSkills, projectsList)
    if (isSelected) {
      return 'ring-2 ring-primary-400 rounded-2xl shadow-card-hover'
    }
    if (isRelated) {
      return 'ring-1 ring-primary-400/60 rounded-2xl'
    }
    return 'rounded-2xl'
  }

  return (
    <section id="skills" className="py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title="Habilidades"
          subtitle="Haz clic en una o varias tecnologías para explorar sus proyectos"
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

        {!isLoading && !isError && all.length === 0 && (
          <p className="text-center text-slate-500 py-12">
            No hay habilidades registradas.
          </p>
        )}

        {!isLoading && !isError && all.length > 0 && (
          <>
            <div className="grid md:grid-cols-2 gap-10">
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                    {categoryLabels[category] ?? category}
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
                    {items.map((skill) => (
                      <motion.button
                        layoutId={`skill-${skill.id}`}
                        key={skill.id}
                        type="button"
                        onClick={() => toggleSkill(skill.name)}
                        aria-pressed={selectedSkills.includes(skill.name)}
                        className={`block w-full text-left focus:outline-none ${skillButtonClass(skill)}`}
                      >
                        <SkillIconCard skill={skill} />
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <StackedPile
              count={stackedSkills.length}
              cardWidthClass="w-24"
              overlap={30}
              heightClass="h-28"
            >
              {stackedSkills.map((skill) => (
                <motion.button
                  layoutId={`skill-${skill.id}`}
                  key={skill.id}
                  type="button"
                  onClick={() => toggleSkill(skill.name)}
                  className="block w-full text-left focus:outline-none"
                  aria-pressed={false}
                >
                  <SkillIconCard skill={skill} dimmed />
                </motion.button>
              ))}
            </StackedPile>

            <AnimatePresence>
              {selectedSkills.length > 0 && (
                <SkillFlow
                  key="skill-flow"
                  selections={selections}
                  onClear={clearSkills}
                />
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </section>
  )
}
