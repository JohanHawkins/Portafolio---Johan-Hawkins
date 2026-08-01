import TechIcon3D from '../ui/TechIcon3D'
import { techIcons } from '../../data/techIcons'
import type { Skill } from '../../types/skill'

interface SkillIconCardProps {
  skill: Skill
  dimmed?: boolean
  className?: string
}

export default function SkillIconCard({
  skill,
  dimmed = false,
  className,
}: SkillIconCardProps) {
  const info = techIcons[skill.icon ?? '']

  const dimClass = dimmed ? 'opacity-50' : ''

  if (!info) {
    return (
      <span
        className={`flex w-full items-center justify-center px-4 py-6 rounded-lg border border-surface-100 bg-surface-50 text-sm font-medium text-slate-200 shadow-card ${dimClass} ${className ?? ''}`}
      >
        {skill.name}
      </span>
    )
  }

  return (
    <div className={`${dimClass} ${className ?? ''}`}>
      <TechIcon3D tech={info} />
    </div>
  )
}
