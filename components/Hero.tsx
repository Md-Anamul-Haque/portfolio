'use client'
import { useEffect, useRef } from 'react'
import { motion, Transition } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail, ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

const ROLES = ['Full Stack Developer','Backend Engineer','Startup Co-founder','Open Source Author']

export default function Hero() {
  const roleRef   = useRef<HTMLSpanElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ri=0, ci=0, del=false
    const el = roleRef.current; if (!el) return
    const tick = () => {
      const w = ROLES[ri]
      if (!del) { el.textContent = w.slice(0,++ci); if(ci===w.length){del=true;return setTimeout(tick,2200)} }
      else       { el.textContent = w.slice(0,--ci); if(ci===0){del=false;ri=(ri+1)%ROLES.length} }
      setTimeout(tick, del?42:82)
    }
    tick()
  }, [])

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if(cursorRef.current){
        cursorRef.current.style.left = e.clientX+'px'
        cursorRef.current.style.top  = e.clientY+'px'
      }
    }
    window.addEventListener('mousemove', fn, {passive:true})
    return () => window.removeEventListener('mousemove', fn)
  }, [])

  const up = (d=0) => ({
    initial:    {opacity:0, y:24},
    animate:    {opacity:1, y:0},
    transition: {duration:.8, delay:d, ease:[.16,1,.3,1]} as Transition,
  })

  return (
    <section id="hero"
      className="relative min-h-screen flex items-center overflow-hidden dot-grid"
    >
      {/* Cursor */}
      <div ref={cursorRef} className="cursor hidden lg:block" />

      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 right-0 w-[700px] h-[700px] rounded-full blur-[140px]"
             style={{background:'radial-gradient(circle, rgba(79,142,255,.09) 0%, transparent 65%)'}} />
        <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full blur-[120px]"
             style={{background:'radial-gradient(circle, rgba(139,92,246,.07) 0%, transparent 65%)'}} />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 md:px-8 pt-28 pb-24 w-full">
        <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-center">

          {/* ── TEXT ── */}
          <div className="space-y-6 order-2 lg:order-1">
            <motion.div {...up(.1)} className="flex flex-wrap gap-2">
              {/* <Badge variant="available">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                Available for hire
              </Badge>
              <Badge variant="outline">4+ years · Full Stack</Badge> */}
              <Badge variant="available">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse" />
                Open to Work
              </Badge>
              <Badge variant="default">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--ac)] animate-pulse" />
                Accepting Clients
              </Badge>
              <Badge variant="outline">4+ years · Full Stack</Badge>
            </motion.div>

            <motion.div {...up(.2)}>
              <h1 className="font-[family-name:var(--font-family-display)] font-extrabold leading-[1.02] tracking-tight"
                  style={{ fontSize:'clamp(3rem,7vw,5rem)', color:'var(--text-1)' }}>
                Hi, I&apos;m<br />
                <span className="grad-text text-glow">Anamul Haque</span>
              </h1>
            </motion.div>

            <motion.div {...up(.3)}
              className="flex items-center gap-2 font-[family-name:var(--font-family-mono)] text-base"
              style={{ color:'var(--accent)' }}>
              <span className="opacity-50">//</span>
              <span ref={roleRef} />
              <span className="w-[2px] h-5 rounded-full animate-pulse align-middle inline-block"
                    style={{background:'var(--accent)'}} />
            </motion.div>

            <motion.p {...up(.4)}
              className="text-[1rem] leading-[1.75] max-w-[500px]"
              style={{ color:'var(--text-2)' }}>
              Building scalable, production-ready applications with{' '}
              <strong style={{color:'var(--text-1)'}}>TypeScript</strong>,{' '}
              <strong style={{color:'var(--text-1)'}}>Node.js</strong> &amp;{' '}
              <strong style={{color:'var(--text-1)'}}>React</strong>.
              Co-founder of <strong style={{color:'var(--accent)'}}>Udvabok</strong> — delivering SaaS solutions for Bangladeshi institutions since 2021.
            </motion.p>

            <motion.div {...up(.5)} className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href="#projects" className="gap-2">
                  View Projects <ArrowRight size={15}/>
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#contact">Get in Touch</a>
              </Button>
            </motion.div>

            <motion.div {...up(.6)} className="flex items-center gap-2.5 pt-1">
              {[
                {href:'https://github.com/Md-Anamul-Haque', icon:<Github size={15}/>,   label:'GitHub'},
                {href:'https://linkedin.com/in/anamulhaque32', icon:<Linkedin size={15}/>, label:'LinkedIn'},
                {href:'mailto:m.anamul.dev@gmail.com',        icon:<Mail size={15}/>,     label:'Email'},
              ].map(s => (
                <Button key={s.href} asChild variant="glass" size="icon">
                  <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>{s.icon}</a>
                </Button>
              ))}
              <span className="font-[family-name:var(--font-family-mono)] text-[11px] ml-1.5"
                    style={{color:'var(--text-3)'}}>
                🇧🇩 Dhaka, Bangladesh
              </span>
            </motion.div>
          </div>

          {/* ── PHOTO ── */}
          <motion.div
            initial={{opacity:0, scale:.9}}
            animate={{opacity:1, scale:1}}
            transition={{duration:1.1, delay:.2, ease:[.16,1,.3,1]}}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Spinning orbit */}
              <div className="absolute inset-[-20px] rounded-full border border-[var(--border)]"
                   style={{animation:'spin 28s linear infinite'}} />
              <div className="absolute inset-[-40px] rounded-full border border-dashed border-[var(--border)]"
                   style={{animation:'spin 40s linear infinite reverse'}} />

              {/* Photo */}
              <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] float">
                {/* Glow */}
                <div className="absolute inset-0 rounded-[28px] blur-2xl scale-110"
                     style={{background:'linear-gradient(135deg,rgba(79,142,255,.2),rgba(139,92,246,.15))'}} />

                <div className="relative w-full h-full rounded-[28px] overflow-hidden glow-accent noise"
                     style={{border:'1.5px solid rgba(79,142,255,.35)'}}>
                  {/*
                    ── TO ADD PHOTO ──
                    Replace this div with:
                    <img src="/photo.jpg" alt="Anamul Haque"
                         className="w-full h-full object-cover object-top" />
                  */}
                  <Image src="/anamul.png" alt="Anamul Haque" className='w-full h-full object-cover object-top' width={320} height={320} />
                  <div className="w-full h-full flex items-center justify-center"
                       style={{background:'linear-gradient(145deg,#0c1120,#151f38)'}}>
                    <span className="font-[family-name:var(--font-family-display)] text-[7rem] font-extrabold"
                          style={{color:'var(--accent)',textShadow:'0 0 60px rgba(79,142,255,.4)'}}>
                      A
                    </span>
                  </div>
                </div>

                {/* Status badge */}
                <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:1.1}}
                  className="absolute -bottom-5 left-1/2 -translate-x-1/2 glass rounded-2xl px-4 py-2.5 flex items-center gap-2.5 whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                  <span className="font-[family-name:var(--font-family-mono)] text-xs"
                        style={{color:'var(--text-1)'}}>Open to work</span>
                </motion.div>
              </div>

              {/* Stat pills — desktop only */}
              {[
                {pos:'-left-14 top-1/3',  val:'4+',  label:'Years', color:'var(--accent)'},
                {pos:'-right-14 top-1/4', val:'5+',  label:'Apps',  color:'#f59e0b'},
                {pos:'-left-12 bottom-1/4',val:'90%',label:'Solo',  color:'#8b5cf6'},
              ].map(s => (
                <motion.div key={s.label}
                  initial={{opacity:0,scale:.8}} animate={{opacity:1,scale:1}}
                  transition={{delay:1.2}}
                  className={`absolute ${s.pos} glass rounded-2xl px-3.5 py-2.5 text-center hidden lg:block`}>
                  <div className="font-[family-name:var(--font-family-display)] text-xl font-bold"
                       style={{color:s.color}}>{s.val}</div>
                  <div className="text-[10px] mt-0.5" style={{color:'var(--text-3)'}}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats row — mobile friendly */}
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.8}}
          className="mt-16 pt-10 border-t border-[var(--border)] grid grid-cols-3 gap-4 md:gap-8 lg:grid-cols-3">
          {[
            {n:'4+',  l:'Years of experience'},
            {n:'5+',  l:'Live deployed products'},
            {n:'90%', l:'Ultrasnap written solo'},
          ].map(s => (
            <div key={s.l} className="text-center">
              <div className="font-[family-name:var(--font-family-display)] text-2xl sm:text-3xl font-extrabold grad-text">{s.n}</div>
              <div className="text-[.75rem] mt-1" style={{color:'var(--text-3)'}}>{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5}}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 hidden sm:flex"
        style={{color:'var(--text-3)'}}>
        <span className="font-[family-name:var(--font-family-mono)] text-[9px] tracking-widest uppercase">scroll</span>
        <ArrowDown size={12} className="animate-bounce" />
      </motion.div>
    </section>
  )
}
