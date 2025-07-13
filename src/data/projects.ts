export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  date: string
  githubUrl: string
  icon: string
}

export const projects: Project[] = [
  {
    id: 'compound-interest',
    title: 'Compound Interest Calculator',
    description: 'A web application that helps users calculate compound interest with customizable parameters and visual charts.',
    technologies: ['React', 'TypeScript', 'Chart.js', 'Tailwind CSS'],
    date: 'January 2024',
    githubUrl: 'https://github.com/yourusername/compound-interest',
    icon: '📈'
  },
  {
    id: 'nietzsche-chatbot',
    title: 'Nietzsche Chatbot',
    description: 'An AI-powered chatbot that responds to user queries in the style of Friedrich Nietzsche using GPT-3.',
    technologies: ['Python', 'OpenAI API', 'Flask', 'Docker'],
    date: 'December 2023',
    githubUrl: 'https://github.com/yourusername/nietzsche-chatbot',
    icon: '🤖'
  },
  {
    id: 'product-store-api',
    title: 'Product Store API',
    description: 'A RESTful API for managing product inventory with authentication, rate limiting, and caching.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'Redis'],
    date: 'November 2023',
    githubUrl: 'https://github.com/yourusername/product-store-api',
    icon: '🛍️'
  },
  {
    id: 'github-ui-clone',
    title: 'GitHub UI Clone',
    description: 'A pixel-perfect clone of GitHub\'s user interface with dark mode support and responsive design.',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
    date: 'October 2023',
    githubUrl: 'https://github.com/yourusername/github-ui-clone',
    icon: '🐱'
  },
  {
    id: 'face-recognition',
    title: 'Face Recognition System',
    description: 'A real-time face recognition system using computer vision and deep learning techniques.',
    technologies: ['Python', 'OpenCV', 'TensorFlow', 'FastAPI'],
    date: 'September 2023',
    githubUrl: 'https://github.com/yourusername/face-recognition',
    icon: '👤'
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    description: 'A modern analytics dashboard with real-time data visualization and customizable widgets.',
    technologies: ['React', 'D3.js', 'Firebase', 'Material-UI'],
    date: 'August 2023',
    githubUrl: 'https://github.com/yourusername/analytics-dashboard',
    icon: '📊'
  }
] 