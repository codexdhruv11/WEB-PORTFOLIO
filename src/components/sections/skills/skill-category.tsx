import { BentoItem } from '@/components/bento-grid/bento-item'
import { SkillBar } from './skill-bar'
import type { SkillCategory as SkillCategoryType } from '@/data/skills'

interface SkillCategoryProps {
  category: SkillCategoryType
}

export function SkillCategory({ category }: SkillCategoryProps) {
  return (
    <BentoItem>
      <div className="space-y-4">
        <h3 className="font-semibold">{category.title}</h3>
        <div className="space-y-4">
          {category.skills.map((skill) => (
            <SkillBar key={skill.id} skill={skill} />
          ))}
        </div>
      </div>
    </BentoItem>
  )
} 