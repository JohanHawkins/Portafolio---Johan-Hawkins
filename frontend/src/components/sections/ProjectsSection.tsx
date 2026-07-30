import { useProjects } from '../../hooks/useProjects'
import SectionTitle from '../ui/SectionTitle'
import Card from '../ui/Card'
import Tag from '../ui/Tag'

export default function ProjectsSection() {
  const { data: projects, isLoading, isError } = useProjects()

  return (
    <section id="projects">
      <SectionTitle title="Proyectos" subtitle="Algunos trabajos que he realizado" />
      {isLoading && <p>Cargando...</p>}
      {isError && <p>Error al cargar proyectos</p>}
      <div>
        {projects?.map((project) => (
          <Card key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div>
              {project.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
