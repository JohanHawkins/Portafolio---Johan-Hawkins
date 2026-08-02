import { useSelection } from '../../context/SelectionContext'
import { useSEO } from '../../hooks/useSEO'

const BASE_TITLE = 'Johan Hawkins — Ingeniero de Software'
const BASE_DESCRIPTION =
  'Portafolio de Johan Hawkins, Ingeniero de Software. Proyectos web full-stack con React, TypeScript, Node.js y PostgreSQL.'

export default function SeoManager() {
  const { selectedSkills } = useSelection()

  const hasFilter = selectedSkills.length > 0
  const title = hasFilter
    ? `Proyectos con ${selectedSkills.join(', ')} — Johan Hawkins`
    : BASE_TITLE
  const description = hasFilter
    ? `Explora los proyectos de Johan Hawkins desarrollados con ${selectedSkills.join(', ')}.`
    : BASE_DESCRIPTION

  useSEO({ title, description })

  return null
}
