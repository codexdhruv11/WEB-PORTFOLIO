import { BentoItem } from '@/components/bento-grid/bento-item'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Github, Linkedin, Mail } from 'lucide-react'

export function Contact() {
  return (
    <section id="contact" className="col-span-full">
      <BentoItem>
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Contact</h2>
            <p className="mt-2 text-muted-foreground">
              Get in touch with me for collaborations or opportunities.
            </p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-2">
            <form
              action="https://formsubmit.co/your.email@example.com"
              method="POST"
              className="space-y-4"
            >
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message"
                  required
                  rows={5}
                />
              </div>
              
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Send Message
              </button>
            </form>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Connect with me</h3>
              <div className="flex flex-col gap-4">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <Github className="h-5 w-5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <Linkedin className="h-5 w-5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="mailto:your.email@example.com"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <Mail className="h-5 w-5" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </BentoItem>
    </section>
  )
} 