import Card from '../ui/Card'
import Tag from '../ui/Tag'
import ImageCarousel from '../ui/ImageCarousel'
import type { Project } from '../../types/project'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const images =
    project.images.length > 0
      ? project.images
      : project.image
        ? [project.image]
        : []

  return (
    <Card className="p-6 flex flex-col group">
      {images.length > 0 && (
        <div className="-mx-6 -mt-6 mb-4 rounded-t-xl overflow-hidden">
          <ImageCarousel images={images} alt={project.title} />
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
  )
}

interface ProjectMiniCardProps {
  project: Project
  className?: string
}

export function ProjectMiniCard({ project, className }: ProjectMiniCardProps) {
  return (
    <div className={className}>
      <div className="overflow-hidden rounded-lg border border-surface-100">
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="h-14 w-full object-cover"
            loading="lazy"
          />
        )}
      </div>
      <p className="mt-1.5 truncate text-center text-[11px] font-medium text-slate-400">
        {project.title}
      </p>
    </div>
  )
}
