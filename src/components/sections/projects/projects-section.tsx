import { BentoItem } from '@/components/bento-grid/bento-item'
import { ProjectCard } from './project-card'
import { projects } from '@/data/projects'

export function ProjectsSection() {
  return (
    <section id="projects" className="col-span-full">
      <BentoItem>
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
            <p className="mt-2 text-muted-foreground">
              A selection of my recent work and side projects.
            </p>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </BentoItem>
    </section>
  )
} 