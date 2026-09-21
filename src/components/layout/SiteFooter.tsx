import { type FormEvent, useState } from 'react'
import { Send } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { footerLinks, socialLinks } from '@/data/content'

export function SiteFooter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  return (
    <footer className="bg-black py-14 text-white">
      <Container className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img
            src="/images/footer-logo.webp"
            alt="Hydra Curls"
            width={100}
            height={80}
            className="h-auto w-24 object-contain"
          />
          <p className="mt-4 max-w-xs text-sm text-white/70">
            Advanced hair care specially designed for Arab curly, coily &amp;
            wavy hair types 2, 3, and 4.
          </p>
        </div>

        <nav aria-label="Hair care resources">
          <h3 className="text-base font-semibold">Hair care</h3>
          <ul className="mt-4 space-y-3">
            {footerLinks.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  onClick={(event) => event.preventDefault()}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-base font-semibold">Connect</h3>
          <p className="mt-4 text-sm text-white/70">
            Follow us for daily hair care tips and inspiration for your curly
            hair journey.
          </p>
          <ul className="mt-4 flex gap-4">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 opacity-80 transition-opacity hover:opacity-100"
                >
                  <img src={social.icon} alt="" aria-hidden="true" className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold">Newsletter</h3>
          <p className="mt-4 text-sm text-white/70">
            Get expert tips and exclusive offers delivered to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <label htmlFor="newsletter-email" className="sr-only">
              Your email
            </label>
            <Input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                setSubmitted(false)
              }}
              placeholder="Your email"
              className="border-white/20 bg-white/10 text-white placeholder:text-white/50"
              aria-describedby="newsletter-status"
            />
            <Button type="submit" size="icon" aria-label="Subscribe">
              <Send className="size-4" />
            </Button>
          </form>
          <p id="newsletter-status" role="status" className="sr-only">
            {submitted ? 'Thank you for subscribing.' : ''}
          </p>
        </div>
      </Container>

      <Container className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-white/50">
        © {new Date().getFullYear()} Parachute Advanced Hydra Curls. All
        rights reserved.
      </Container>
    </footer>
  )
}
