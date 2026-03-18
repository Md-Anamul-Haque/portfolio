'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const GROUPS = [
  { icon:'⚙️', label:'Backend',
    items:[{n:'TypeScript',p:92},{n:'Node.js',p:90},{n:'Express.js',p:88},{n:'Socket.IO',p:85},{n:'WebRTC / mediasoup',p:80}] },
  { icon:'🖥', label:'Frontend',
    items:[{n:'React',p:90},{n:'Next.js',p:87},{n:'Tailwind CSS',p:93},{n:'Redux',p:82},{n:'React Native',p:70}] },
  { icon:'🛢', label:'Database',
    items:[{n:'PostgreSQL + plpgsql',p:88},{n:'MongoDB',p:75},{n:'Redis',p:62}] },
  { icon:'🛠', label:'DevOps & Tools',
    items:[{n:'AWS EC2',p:78},{n:'Ubuntu / Linux',p:84},{n:'Docker',p:62},{n:'pm2',p:86},{n:'Git & GitHub',p:93}] },
]

const TECH = ['TypeScript','Node.js','React','Next.js 16','PostgreSQL','MongoDB','Redis','WebRTC','mediasoup','Socket.IO','Electron','Tauri','Tailwind CSS','Redux','Express','AWS EC2','Docker','pm2','Shadcn/UI','React Native','npm','Git','REST API','Framer Motion']

function Bar({ n, p, delay }: { n:string; p:number; delay:number }) {
  const { ref, inView } = useInView({ triggerOnce:true })
  return (
    <div ref={ref} className="mb-4 last:mb-0">
      <div className="flex justify-between mb-2">
        <span className="text-[.83rem]" style={{color:'var(--text-1)'}}>{n}</span>
        <span className="font-[family-name:var(--font-family-mono)] text-[.72rem]" style={{color:'var(--text-3)'}}>{p}%</span>
      </div>
      <div className="skill-track">
        <div className={`skill-fill${inView?' go':''}`}
             style={{transitionDelay:`${delay}s`}}/>
      </div>
    </div>
  )
}

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce:true, threshold:.05 })
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <motion.div ref={ref}
          initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.7}}
          className="mb-14">
          <p className="section-eyebrow">What I know</p>
          <h2 className="font-[family-name:var(--font-family-display)] font-extrabold tracking-tight mb-4"
              style={{fontSize:'clamp(2rem,5vw,3rem)', color:'var(--text-1)'}}>
            Technical <span className="grad-text">Skills</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 mb-14">
          {GROUPS.map((g,gi) => (
            <motion.div key={g.label}
              initial={{opacity:0,y:28}} animate={inView?{opacity:1,y:0}:{}}
              transition={{duration:.7, delay:gi*.1}}>
              <div className="glass-card p-6 h-full">
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                       style={{background:'var(--surface-h)', border:'1px solid var(--border)'}}>
                    {g.icon}
                  </div>
                  <h3 className="font-[family-name:var(--font-family-display)] font-bold"
                      style={{color:'var(--text-1)'}}>{g.label}</h3>
                </div>
                {g.items.map((s,si) => <Bar key={s.n} n={s.n} p={s.p} delay={gi*.1+si*.07}/>)}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:.4}}>
          <p className="font-[family-name:var(--font-family-mono)] text-[.72rem] text-center mb-5"
             style={{color:'var(--text-3)'}}>// Full Tech Stack</p>
          <div className="flex flex-wrap justify-center gap-2">
            {TECH.map((t,i) => (
              <motion.span key={t}
                initial={{opacity:0,scale:.85}} animate={inView?{opacity:1,scale:1}:{}}
                transition={{delay:.4+i*.03}}
                whileHover={{scale:1.08,y:-2}}
                className="font-[family-name:var(--font-family-mono)] text-[.72rem] px-3 py-1.5 rounded-full cursor-default transition-all duration-200 glass"
                style={{color:'var(--text-2)', border:'1px solid var(--border)'}}>
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
