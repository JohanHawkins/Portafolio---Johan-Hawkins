import type { Project } from '../types/project'

export function normalizeTag(value: string): string {
  return value.trim().toLowerCase()
}

export function getProjectsForSkill(
  projects: Project[],
  skillName: string,
): Project[] {
  const name = normalizeTag(skillName)
  return projects.filter((project) =>
    project.tags.some((tag) => normalizeTag(tag) === name),
  )
}

export function getProjectsForSkills(
  projects: Project[],
  skillNames: string[],
): Project[] {
  const seen = new Set<number>()
  const result: Project[] = []
  for (const name of skillNames) {
    for (const project of getProjectsForSkill(projects, name)) {
      if (!seen.has(project.id)) {
        seen.add(project.id)
        result.push(project)
      }
    }
  }
  return result
}
