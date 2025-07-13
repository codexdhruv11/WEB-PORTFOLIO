import { useTheme } from '@/components/theme-provider'
import { Moon, Sun } from 'lucide-react'
import { scrollToSection } from '@/lib/utils'
import { motion, useAnimate, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'

const navItems = [
  { name: 'Projects', section: 'projects' },
  { name: 'Skills', section: 'skills' },
  { name: 'Contact', section: 'contact' },
]

function NavItem({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  const [scope, animate] = useAnimate()
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseX = useSpring(0, { stiffness: 500, damping: 50 })
  const mouseY = useSpring(0, { stiffness: 500, damping: 50 })

  function handleMouseMove(event: React.MouseEvent<HTMLButtonElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    
    const centerX = rect.x + rect.width / 2
    const centerY = rect.y + rect.height / 2
    
    const distance = Math.sqrt(
      Math.pow(event.clientX - centerX, 2) +
      Math.pow(event.clientY - centerY, 2)
    )
    
    const maxDistance = 30
    const magneticPull = Math.min(distance / maxDistance, 1)
    
    mouseX.set((event.clientX - centerX) * magneticPull * 0.2)
    mouseY.set((event.clientY - centerY) * magneticPull * 0.2)
  }
  
  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    
    // Ripple effect
    const ripple = document.createElement('div')
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    await animate(scope.current, { scale: 0.95 }, { duration: 0.1 })
    await animate(scope.current, { scale: 1 }, { duration: 0.1 })
    
    onClick()
  }

  return (
    <motion.button
      ref={ref}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY }}
      className="relative text-sm group"
      whileTap={{ scale: 0.95 }}
    >
      <span ref={scope} className="relative block px-2 py-1">
        {children}
        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary transform scale-x-0 transition-transform duration-200 origin-left group-hover:scale-x-100" />
      </span>
    </motion.button>
  )
}

export function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur"
    >
      <div className="container flex h-16 items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg font-bold"
        >
          <a 
            href="#" 
            className="relative group block px-2"
          >
            <span className="relative z-10">Dhruv</span>
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary transform scale-x-0 transition-transform duration-200 origin-left group-hover:scale-x-100" />
          </a>
        </motion.div>
        
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item, i) => (
            <motion.div
              key={item.section}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
            >
              <NavItem onClick={() => scrollToSection(item.section)}>
                {item.name}
              </NavItem>
            </motion.div>
          ))}
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-md p-2.5 hover:bg-accent transition-all duration-200 hover:scale-110"
            whileHover={{ rotate: 12 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ rotate: theme === 'dark' ? 0 : 180 }}
              transition={{ 
                duration: 0.5, 
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </motion.div>
            <span className="sr-only">Toggle theme</span>
          </motion.button>
        </nav>

        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="md:hidden rounded-md p-2.5 hover:bg-accent transition-all duration-200"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          whileHover={{ rotate: 12 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ rotate: theme === 'dark' ? 0 : 180 }}
            transition={{ 
              duration: 0.5, 
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </motion.div>
          <span className="sr-only">Toggle theme</span>
        </motion.button>
      </div>
    </motion.header>
  )
} 