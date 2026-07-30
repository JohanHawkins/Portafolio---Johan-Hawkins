import { useSkills } from '../../hooks/useSkills'
import SectionTitle from '../ui/SectionTitle'

export default function SkillsSection() {
  const { data: skills, isLoading, isError } = useSkills()

  return (
    <section id="skills">
      <SectionTitle title="Habilidades" subtitle="Tecnologías con las que trabajo" />
      {isLoading && <p>Cargando...</p>}
      {isError && <p>Error al cargar habilidades</p>}
      <div>
        {skills?.map((skill) => (
          <span key={skill.id}>{skill.name}</span>
        ))}
      </div>
    </section>
  )
}
