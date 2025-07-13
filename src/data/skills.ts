export interface Skill {
  id: string
  name: string
  percentage: number
}

export interface SkillCategory {
  id: string
  title: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'backend',
    title: 'Backend Development',
    skills: [
      {
        id: 'nodejs',
        name: 'Node.js',
        percentage: 90
      },
      {
        id: 'api-design',
        name: 'API Design',
        percentage: 85
      },
      {
        id: 'express',
        name: 'Express.js',
        percentage: 88
      }
    ]
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    skills: [
      {
        id: 'n8n',
        name: 'n8n Workflows',
        percentage: 82
      },
      {
        id: 'oauth',
        name: 'GitHub OAuth/Passport.js',
        percentage: 78
      },
      {
        id: 'api-integration',
        name: 'API Integration',
        percentage: 92
      }
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    skills: [
      {
        id: 'react',
        name: 'React',
        percentage: 95
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        percentage: 88
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        percentage: 85
      }
    ]
  }
] 