import { BentoItem } from '@/components/bento-grid/bento-item'
import { SkillCategory } from './skill-category'
import { skillCategories } from '@/data/skills'

export function SkillsSection() {
  return (
    <section id="skills" className="col-span-full">
      <BentoItem>
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Skills</h2>
            <p className="mt-2 text-muted-foreground">
              My technical expertise and proficiency levels.
            </p>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((category) => (
              <SkillCategory key={category.id} category={category} />
            ))}
          </div>
        </div>
      </BentoItem>
    </section>
  )
} 