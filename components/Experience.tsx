'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

const TL = [
  {
    role:'Software Developer', company:'ITBeeSolution',
    period:'Jan 2024 – Feb 2026', type:'Full-time', badge:'live' as const,
    color:'var(--accent)', emoji:'💼',
    pts:[
      'Led end-to-end development of Ultrasnap — enterprise productivity SaaS with task management, video conferencing, and automated time tracking.',
      'Built WebRTC (mediasoup SFU) real-time conferencing supporting one-to-one and multi-person group calls.',
      'Wrote 90%+ of codebase solo — web (React/Redux), desktop (Electron/Tauri), backend (Node.js/TypeScript/PostgreSQL).',
      'Managed AWS EC2 deployments, CI/CD pipelines, and production DevOps.',
    ],
  },
  {
    role:'Co-founder & Lead Developer', company:'Udvabok (formerly Nocrashsoft)',
    period:'2021 – Present', type:'Startup', badge:'startup' as const,
    color:'#f59e0b', emoji:'🚀',
    pts:[
      'Co-founded SaaS startup delivering management systems to Bangladeshi institutions.',
      'Built School Management System — attendance, results, fee management, and reporting.',
      'Built Madrasa Management System tailored for Islamic institution administrative workflows.',
      'Built CalcPOS — full-stack point of sale with inventory and sales analytics.',
      'Hospital Management System currently in active development.',
    ],
  },
  {
    role:'Open Source Author', company:'npm · rg-express',
    period:'2023', type:'OSS', badge:'oss' as const,
    color:'#8b5cf6', emoji:'📦',
    pts:[
      'Published rg-express routing library on npm for the Node.js/Express ecosystem.',
      'Designed to streamline backend routing patterns and eliminate repetitive boilerplate.',
    ],
  },
]

function Item({ t, i }: { t: typeof TL[0]; i: number }) {
  const { ref, inView } = useInView({ triggerOnce:true, threshold:.15 })
  return (
    <motion.div ref={ref}
      initial={{opacity:0,x:-20}} animate={inView?{opacity:1,x:0}:{}}
      transition={{duration:.7, delay:i*.15, ease:[.16,1,.3,1]}}
      className="relative pl-14 pb-12 last:pb-0">
      {i < TL.length-1 && (
        <div className="absolute left-[15px] top-8 bottom-0 w-px" style={{background:'var(--border)'}}/>
      )}
      <div className="tl-pulse absolute left-0 top-1 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm"
           style={{borderColor:t.color, background:`color-mix(in srgb, ${t.color} 12%, transparent)`}}>
        {t.emoji}
      </div>
      <div className="glass-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
          <div>
            <h3 className="font-[family-name:var(--font-family-display)] font-bold text-[1.05rem] mb-1"
                style={{color:'var(--text-1)'}}>{t.role}</h3>
            <p className="font-[family-name:var(--font-family-mono)] text-sm font-semibold"
               style={{color:t.color}}>{t.company}</p>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className="font-[family-name:var(--font-family-mono)] text-xs" style={{color:'var(--text-3)'}}>{t.period}</span>
            <Badge variant={t.badge}>{t.type}</Badge>
          </div>
        </div>
        <ul className="space-y-2.5">
          {t.pts.map((b,bi) => (
            <motion.li key={bi}
              initial={{opacity:0,x:-8}} animate={inView?{opacity:1,x:0}:{}}
              transition={{delay:i*.15+bi*.06}}
              className="flex items-start gap-2.5 text-[.84rem]" style={{color:'var(--text-2)'}}>
              <span className="w-1 h-1 rounded-full mt-[9px] shrink-0" style={{background:t.color}}/>
              {b}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce:true, threshold:.05 })
  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        <motion.div ref={ref}
          initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.7}}
          className="mb-14">
          <p className="section-eyebrow">Career</p>
          <h2 className="font-[family-name:var(--font-family-display)] font-extrabold tracking-tight mb-4"
              style={{fontSize:'clamp(2rem,5vw,3rem)', color:'var(--text-1)'}}>
            Work <span className="grad-text">Experience</span>
          </h2>
          <p style={{color:'var(--text-2)', fontSize:'.97rem'}}>4+ years shipping real products for real users.</p>
        </motion.div>
        {TL.map((t,i) => <Item key={t.company} t={t} i={i}/>)}
      </div>
    </section>
  )
}
