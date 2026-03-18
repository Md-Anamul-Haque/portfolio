'use client'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { ExternalLink, Lock, Github, ChevronLeft, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const PROJECTS = [
  {
    name:'Ultrasnap',  emoji:'⚡',
    tagline:'Enterprise team productivity platform',
    desc:'All-in-one remote work SaaS — ClickUp-style task boards, Apploye-style time tracking with auto-screenshots, and Discord-style WebRTC video conferencing. Wrote 90%+ of the codebase solo.',
    tech:['React','Node.js','TypeScript','WebRTC','mediasoup','PostgreSQL','Electron','Tauri'],
    live:'https://itbeechat.com',
    demo:'anamul.itbeellc@gmail.com  /  Anamul$1122',
    tag:'live' as const, accent:'#22c55e',
  },
  {
    name:'LocalBangla', emoji:'🛒',
    tagline:'Bangladeshi e-commerce marketplace',
    desc:'Full-featured marketplace with electronics & accessories, product listings, shopping cart, and cash-on-delivery. Independently built and launched in early 2026.',
    tech:['Next.js 16','PostgreSQL','Tailwind CSS','TypeScript'],
    live:'https://localbangla.com',
    demo:'', tag:'live' as const, accent:'#22c55e',
  },
  {
    name:'CalcPOS', emoji:'🏪',
    tagline:'Point of sale for Bangladeshi SMEs',
    desc:'Full-stack POS system with inventory management, billing engine, and detailed sales analytics. Part of the Udvabok SaaS suite.',
    tech:['React','Node.js','PostgreSQL','Tailwind CSS'],
    live:'https://pos.udvabok.com',
    demo:'m.anamul.dev@gmail.com  /  12345678',
    tag:'live' as const, accent:'#22c55e',
  },
  {
    name:'rg-express', emoji:'📦',
    tagline:'Open-source npm routing library',
    desc:'Published npm package that streamlines Express.js routing and reduces server-side boilerplate for Node.js backend developers.',
    tech:['Node.js','TypeScript','npm'],
    live:'https://npmjs.com/package/rg-express',
    demo:'', tag:'oss' as const, accent:'#8b5cf6',
  },
]

function Card({ p, i }: { p: typeof PROJECTS[0]; i: number }) {
  const { ref, inView } = useInView({ triggerOnce:true, threshold:.08 })
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:32 }} animate={inView?{opacity:1,y:0}:{}}
      transition={{ duration:.7, delay:i*.1, ease:[.16,1,.3,1] }}
      className="glass-card overflow-hidden flex flex-col h-full"
    >
      {/* Color top bar */}
      <div className="h-[2px] shrink-0"
           style={{background:`linear-gradient(90deg, ${p.accent}, transparent)`}} />

      <div className="p-6 flex flex-col flex-1 gap-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
              <span className="text-xl">{p.emoji}</span>
              <h3 className="font-[family-name:var(--font-family-display)] font-bold text-[1.1rem]"
                  style={{color:'var(--text-1)'}}>{p.name}</h3>
              <Badge variant={p.tag}>{p.tag.toUpperCase()}</Badge>
            </div>
            <p className="font-[family-name:var(--font-family-mono)] text-[.76rem]"
               style={{color:p.accent}}>{p.tagline}</p>
          </div>
          <Button asChild variant="ghost" size="icon" className="shrink-0 -mt-1">
            <a href={p.live} target="_blank" rel="noreferrer">
              <ExternalLink size={15}/>
            </a>
          </Button>
        </div>

        {/* Description */}
        <p className="text-[.86rem] leading-relaxed flex-1" style={{color:'var(--text-2)'}}>
          {p.desc}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {p.tech.map(t => <Badge key={t} variant="tech">{t}</Badge>)}
        </div>

        {/* Demo creds */}
        {p.demo && (
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl"
               style={{background:'var(--surface)', border:'1px solid var(--border)'}}>
            <Lock size={11} className="shrink-0 mt-0.5" style={{color:'#f59e0b'}}/>
            <div>
              <p className="font-[family-name:var(--font-family-mono)] text-[.66rem] mb-1" style={{color:'#f59e0b'}}>
                Demo credentials
              </p>
              <p className="font-[family-name:var(--font-family-mono)] text-[.7rem]" style={{color:'var(--text-3)'}}>
                {p.demo}
              </p>
            </div>
          </div>
        )}

        {/* Link */}
        <Button asChild variant="link" className="p-0 h-auto justify-start font-[family-name:var(--font-family-mono)] text-xs">
          <a href={p.live} target="_blank" rel="noreferrer" className="flex items-center gap-1.5">
            <ExternalLink size={11}/> {p.live.replace('https://','')}
          </a>
        </Button>
      </div>
    </motion.div>
  )
}

// Mobile swipe card
function SwipeCard({ p, onLeft, onRight }: { p: typeof PROJECTS[0]; onLeft:()=>void; onRight:()=>void }) {
  const x = useMotionValue(0)
  const rotate   = useTransform(x,[-140,0,140],[-7,0,7])
  const opacity  = useTransform(x,[-140,-70,0,70,140],[0,1,1,1,0])
  return (
    <motion.div style={{x,rotate,opacity}} drag="x" dragConstraints={{left:0,right:0}} dragElastic={.65}
      onDragEnd={(_,i) => { if(i.offset.x < -70) onLeft(); else if(i.offset.x > 70) onRight() }}
      className="absolute inset-0 cursor-grab active:cursor-grabbing touch-pan-y">
      <div className="glass-card overflow-hidden h-full flex flex-col">
        <div className="h-[2px]" style={{background:`linear-gradient(90deg,${p.accent},transparent)`}}/>
        <div className="p-5 flex flex-col gap-3 flex-1">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span>{p.emoji}</span>
                <h3 className="font-[family-name:var(--font-family-display)] font-bold" style={{color:'var(--text-1)'}}>{p.name}</h3>
                <Badge variant={p.tag}>{p.tag.toUpperCase()}</Badge>
              </div>
              <p className="font-[family-name:var(--font-family-mono)] text-xs" style={{color:p.accent}}>{p.tagline}</p>
            </div>
            <a href={p.live} target="_blank" rel="noreferrer" style={{color:'var(--text-3)'}}>
              <ExternalLink size={14}/>
            </a>
          </div>
          <p className="text-sm leading-relaxed flex-1" style={{color:'var(--text-2)'}}>{p.desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {p.tech.slice(0,5).map(t => <Badge key={t} variant="tech">{t}</Badge>)}
          </div>
          {p.demo && (
            <div className="flex items-start gap-2 p-3 rounded-xl text-xs"
                 style={{background:'var(--surface)', border:'1px solid var(--border)'}}>
              <Lock size={10} className="mt-0.5 shrink-0" style={{color:'#f59e0b'}}/>
              <div>
                <p className="font-[family-name:var(--font-family-mono)] mb-0.5" style={{color:'#f59e0b'}}>Demo</p>
                <p className="font-[family-name:var(--font-family-mono)]" style={{color:'var(--text-3)'}}>{p.demo}</p>
              </div>
            </div>
          )}
          <p className="text-center font-[family-name:var(--font-family-mono)] text-[10px]" style={{color:'var(--text-3)'}}>← swipe →</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce:true, threshold:.05 })
  const [cur, setCur] = useState(0)
  const prev = () => setCur(c => (c-1+PROJECTS.length)%PROJECTS.length)
  const next = () => setCur(c => (c+1)%PROJECTS.length)

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <motion.div ref={ref}
          initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.7}}
          className="mb-14">
          <p className="section-eyebrow">My Work</p>
          <h2 className="font-[family-name:var(--font-family-display)] font-extrabold tracking-tight mb-4"
              style={{fontSize:'clamp(2rem,5vw,3rem)', color:'var(--text-1)'}}>
            Featured <span className="grad-text">Projects</span>
          </h2>
          <p className="max-w-lg" style={{color:'var(--text-2)', fontSize:'.97rem'}}>
            Live products with real users. Every project is fully deployed and production-ready.
          </p>
        </motion.div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-5">
          {PROJECTS.map((p,i) => <Card key={p.name} p={p} i={i}/>)}
        </div>

        {/* Mobile swipe */}
        <div className="md:hidden">
          <div className="relative h-[420px]">
            <AnimatePresence mode="wait">
              <SwipeCard key={cur} p={PROJECTS[cur]} onLeft={next} onRight={prev}/>
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="p-2 rounded-xl glass" style={{color:'var(--text-2)'}}>
              <ChevronLeft size={17}/>
            </button>
            <div className="flex gap-1.5">
              {PROJECTS.map((_,i) => (
                <button key={i} onClick={() => setCur(i)}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{width:i===cur?'22px':'6px', background:i===cur?'var(--accent)':'var(--border)'}}/>
              ))}
            </div>
            <button onClick={next} className="p-2 rounded-xl glass" style={{color:'var(--text-2)'}}>
              <ChevronRight size={17}/>
            </button>
          </div>
        </div>

        <motion.div initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:.5}}
          className="mt-10 text-center">
          <Button asChild variant="ghost">
            <a href="https://github.com/Md-Anamul-Haque" target="_blank" rel="noreferrer"
               className="font-[family-name:var(--font-family-mono)] text-sm gap-2">
              <Github size={14}/> More on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
