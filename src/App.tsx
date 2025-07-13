import { type FC } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import Squares from '@/components/ui/squares-background'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { BentoGrid } from '@/components/bento-grid/bento-grid'
import { Hero } from '@/components/sections/hero'
import { ProjectsSection } from '@/components/sections/projects/projects-section'
import { SkillsSection } from '@/components/sections/skills/skills-section'
import { Contact } from '@/components/sections/contact'

const App: FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <div className="min-h-screen bg-background font-mono antialiased relative">
        <div className="absolute inset-0 overflow-hidden">
          <Squares 
            direction="diagonal"
            speed={0.5}
            borderColor="rgb(var(--foreground) / 0.4)"
            hoverFillColor="rgb(var(--foreground) / 0.3)"
            squareSize={50}
          />
        </div>
        <div className="relative z-10">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <BentoGrid>
              <Hero />
              <ProjectsSection />
              <SkillsSection />
              <Contact />
            </BentoGrid>
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App 