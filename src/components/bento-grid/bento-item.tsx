import { cn } from '@/lib/utils'
import { TiltCard } from '@/components/ui/tilt-card'

interface BentoItemProps {
  children: React.ReactNode
  className?: string
  colSpan?: number
  rowSpan?: number
}

export function BentoItem({ 
  children, 
  className,
  colSpan = 1,
  rowSpan = 1
}: BentoItemProps) {
  return (
    <TiltCard
      className={cn(
        'rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-lg',
        `col-span-${colSpan}`,
        `row-span-${rowSpan}`,
        'perspective-800',
        className
      )}
    >
      {children}
    </TiltCard>
  )
} 