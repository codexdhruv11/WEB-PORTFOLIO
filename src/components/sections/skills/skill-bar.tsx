import { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { Minus, Plus } from 'lucide-react'
import type { Skill } from '@/data/skills'

interface SkillBarProps {
  skill: Skill
}

export function SkillBar({ skill }: SkillBarProps) {
  const [value, setValue] = useState(skill.percentage)

  const handleIncrement = () => {
    setValue((prev) => Math.min(prev + 5, 100))
  }

  const handleDecrement = () => {
    setValue((prev) => Math.max(prev - 5, 0))
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{skill.name}</span>
        <span className="text-sm text-muted-foreground">{value}%</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrement}
          className="rounded-md p-1 hover:bg-accent"
          aria-label="Decrease skill level"
        >
          <Minus className="h-4 w-4" />
        </button>
        <Slider
          value={[value]}
          onValueChange={([newValue]) => setValue(newValue)}
          max={100}
          step={5}
          className="flex-1"
        />
        <button
          onClick={handleIncrement}
          className="rounded-md p-1 hover:bg-accent"
          aria-label="Increase skill level"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
} 