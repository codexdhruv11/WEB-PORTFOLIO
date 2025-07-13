import { useEffect, useRef } from 'react'
import { useTheme } from '@/components/theme-provider'

type Point = {
  x: number
  y: number
  vx: number
  vy: number
}

export function MagnetLinesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const pointsRef = useRef<Point[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const frameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initPoints = () => {
      const points: Point[] = []
      const numPoints = Math.min(50, Math.floor((canvas.width * canvas.height) / 25000))
      
      for (let i = 0; i < numPoints; i++) {
        points.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5
        })
      }
      
      pointsRef.current = points
    }

    const drawLines = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const points = pointsRef.current
      const mouse = mouseRef.current
      
      ctx.strokeStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
      ctx.lineWidth = 1

      for (let i = 0; i < points.length; i++) {
        const point = points[i]
        
        // Update position
        point.x += point.vx
        point.y += point.vy
        
        // Bounce off walls
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1
        
        // Mouse interaction
        const dx = mouse.x - point.x
        const dy = mouse.y - point.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist < 200) {
          point.x -= (dx / dist) * 0.5
          point.y -= (dy / dist) * 0.5
        }
        
        // Draw connections
        for (let j = i + 1; j < points.length; j++) {
          const otherPoint = points[j]
          const dx = otherPoint.x - point.x
          const dy = otherPoint.y - point.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(point.x, point.y)
            ctx.lineTo(otherPoint.x, otherPoint.y)
            ctx.stroke()
          }
        }
      }
      
      frameRef.current = requestAnimationFrame(drawLines)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      }
    }

    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)
    
    resizeCanvas()
    initPoints()
    drawLines()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-screen w-screen bg-background"
    />
  )
} 