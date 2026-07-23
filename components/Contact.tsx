'use client'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Mail, Phone, Github, Linkedin, MapPin, Clock, Copy, Check, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

const CONTACTS = [
  { icon: <Mail     size={19}/>, label:'Personal Email',   value:'m.anamul.dev@gmail.com',     href:'mailto:m.anamul.dev@gmail.com',             color:'var(--ac)',   copy:true  },
  { icon: <Mail     size={19}/>, label:'Work Email',        value:'anamul@udvabok.com',          href:'mailto:anamul@udvabok.com',                 color:'var(--ac2)',  copy:true  },
  { icon: <Phone    size={19}/>, label:'Phone / WhatsApp',  value:'+880 1972-752132',            href:'tel:+8801972752132',                        color:'var(--green)',copy:false },
  { icon: <Phone    size={19}/>, label:'Phone 2',           value:'+880 1622-232228',            href:'tel:+8801622232228',                        color:'var(--green)',copy:false },
  { icon: <Github   size={19}/>, label:'GitHub',            value:'Md-Anamul-Haque',             href:'https://github.com/Md-Anamul-Haque',        color:'var(--t1)',   copy:false },
  { icon: <Linkedin size={19}/>, label:'LinkedIn',          value:'in/anamulhaque32',            href:'https://linkedin.com/in/anamulhaque32',     color:'#0ea5e9',     copy:false },
]

function ContactCard({ c, i }: { c: typeof CONTACTS[0]; i: number }) {
  const { ref, inView } = useInView({ triggerOnce:true })
  const [copied, setCopied] = useState(false)

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText(c.value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:20 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:.6, delay:i*.07 }}>
      <a href={c.href}
         target={c.href.startsWith('http') ? '_blank' : undefined}
         rel="noreferrer"
         className="contact-card group">
        {/* Icon box */}
        <div className="w-11 h-11 rounded-[var(--radius-lg)] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
             style={{ background:`color-mix(in oklch, ${c.color} 13%, transparent)`,
                      border:`1px solid color-mix(in oklch, ${c.color} 28%, transparent)`,
                      color: c.color }}>
          {c.icon}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="font-[family-name:var(--font-family-mono)] text-[10px] mb-0.5"
             style={{ color:'var(--t3)' }}>{c.label}</p>
          <p className="font-medium text-[.9rem] truncate transition-colors duration-300 group-hover:text-[var(--ac)]"
             style={{ color:'var(--t1)' }}>{c.value}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 ml-2 shrink-0">
          {c.copy && (
            <button onClick={handleCopy}
                    className="w-8 h-8 rounded-[var(--radius-md)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                    style={{ background:'var(--surface-h)', color:'var(--t2)' }}>
              {copied
                ? <Check  size={13} style={{ color:'var(--green)' }}/>
                : <Copy   size={13}/>}
            </button>
          )}
          <div className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
               style={{ color:'var(--t3)' }}>
            <ExternalLink size={13}/>
          </div>
        </div>
      </a>
    </motion.div>
  )
}

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce:true, threshold:.05 })

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      {/* Top fade line */}
      <div className="fade-divider absolute top-0 inset-x-0" />
      <div className="dot-grid absolute inset-0 opacity-30" />

      <div className="relative max-w-4xl mx-auto px-5 md:px-8">
        <motion.div ref={ref}
          initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}}
          transition={{duration:.7}} className="mb-14 text-center">
          <p className="eyebrow justify-center">Get in touch</p>
          <h2 className="font-[family-name:var(--font-family-display)] font-extrabold tracking-tight mb-5"
              style={{fontSize:'clamp(2rem,5vw,3rem)', color:'var(--t1)'}}>
            Let&apos;s <span className="grad-text">Connect</span>
          </h2>
          <p className="text-[.97rem] max-w-md mx-auto" style={{color:'var(--t2)'}}>
            Open to full-time roles, remote work, freelance contracts, and startup collaborations.
          </p>
        </motion.div>

        {/* Availability pill */}
        <motion.div initial={{opacity:0,scale:.93}} animate={inView?{opacity:1,scale:1}:{}}
          transition={{delay:.15}} className="flex justify-center mb-10">
          <div className="glass rounded-2xl px-6 py-3.5 flex flex-wrap items-center justify-center gap-4 md:gap-7">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse"/>
              <span className="font-[family-name:var(--font-family-mono)] text-sm" style={{color:'var(--green)'}}>
                Available for work
              </span>
            </div>
            <div className="w-px h-5" style={{background:'var(--glass-b)'}}/>
            <div className="flex items-center gap-2 text-sm" style={{color:'var(--t2)'}}>
              <MapPin size={13}/> Dhaka, Bangladesh
            </div>
            <div className="w-px h-5" style={{background:'var(--glass-b)'}}/>
            <div className="flex items-center gap-2 text-sm" style={{color:'var(--t2)'}}>
              <Clock size={13}/> GMT+6 · BST
            </div>
          </div>
        </motion.div>

        {/* Contact grid */}
        <div className="grid sm:grid-cols-2 gap-3.5 mb-10">
          {CONTACTS.map((c,i) => <ContactCard key={c.value} c={c} i={i}/>)}
        </div>

        {/* CTA banner */}
        <motion.div initial={{opacity:0,y:18}} animate={inView?{opacity:1,y:0}:{}}
          transition={{delay:.45}}
          className="glass-card p-8 md:p-10 text-center relative overflow-hidden noise-overlay">
          {/* Ambient glow */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-32 rounded-full blur-3xl pointer-events-none"
               style={{background:'color-mix(in oklch, var(--ac) 12%, transparent)'}}/>
          <div className="relative z-10">
            <div className="text-4xl mb-4">👋</div>
            <h3 className="font-[family-name:var(--font-family-display)] font-bold text-xl mb-2"
                style={{color:'var(--t1)'}}>Ready to build something great?</h3>
            <p className="text-[.9rem] mb-7 max-w-md mx-auto" style={{color:'var(--t2)'}}>
              Whether it&apos;s a new product, an existing system, or a freelance gig — let&apos;s talk.
            </p>
            <Button asChild size="lg" className="btn-shimmer glow">
              <a href="mailto:m.anamul.dev@gmail.com" className="gap-2">
                <Mail size={16}/> Send me an email
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-16 pt-8 fade-divider"/>
        <div className="mt-6 flex flex-wrap justify-between items-center gap-3">
          <p className="font-[family-name:var(--font-family-mono)] text-xs" style={{color:'var(--t3)'}}>
            © 2026 <span style={{color:'var(--ac)'}}>Anamul Haque</span> ·
          </p>
          <p className="font-[family-name:var(--font-family-mono)] text-xs" style={{color:'var(--t3)'}}>
            🇧🇩 Dhaka, Bangladesh
          </p>
        </div>
      </div>
    </section>
  )
}
