import { BentoItem } from '@/components/bento-grid/bento-item'
import { Github } from 'lucide-react'
import type { Project } from '@/data/projects'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <BentoItem>
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-4xl">{project.icon}</span>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 hover:bg-accent"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">View on GitHub</span>
          </a>
        </div>
        
        <div>
          <h3 className="font-semibold">{project.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {project.description}
          </p>
        </div>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            {project.date}
          </div>
        </div>
      </div>
    </BentoItem>
  )
} 