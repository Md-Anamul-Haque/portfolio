'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Home, Briefcase, Code2, User, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

const TABS = [
  { href:'#hero',       icon:<Home      size={19}/>, label:'Home'    },
  { href:'#projects',   icon:<Briefcase size={19}/>, label:'Work'    },
  { href:'#skills',     icon:<Code2     size={19}/>, label:'Skills'  },
  { href:'#experience', icon:<User      size={19}/>, label:'Career'  },
  { href:'#contact',    icon:<Mail      size={19}/>, label:'Contact' },
]

export default function BottomNav() {
  const [active, setActive] = useState('#hero')

  useEffect(() => {
    const fn = () => TABS.forEach(t => {
      const el = document.querySelector(t.href)
      if (!el) return
      const r = el.getBoundingClientRect()
      if (r.top <= 90 && r.bottom > 90) setActive(t.href)
    })
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.nav
      initial={{ y:100, opacity:0 }}
      animate={{ y:0,   opacity:1 }}
      transition={{ delay:.6, duration:.7, ease:[.16,1,.3,1] }}
      className="fixed bottom-0 inset-x-0 z-50 md:hidden px-3 pb-3"
      style={{ paddingBottom:'calc(12px + env(safe-area-inset-bottom))' }}
    >
      <div className="glass rounded-2xl flex items-center justify-around px-1 py-1.5">
        {TABS.map(t => {
          const on = active === t.href
          return (
            <a key={t.href} href={t.href}
               className={cn('bottom-nav-item', on && 'active')}
               style={{ color: on ? 'var(--ac)' : 'var(--t3)' }}>
              {on && (
                <motion.div layoutId="nav-pill"
                  className="absolute inset-0 rounded-[var(--radius-lg)]"
                  style={{ background:'color-mix(in oklch, var(--ac) 12%, transparent)' }}
                  transition={{ type:'spring', stiffness:460, damping:30 }}/>
              )}
              <span className="relative z-10">{t.icon}</span>
              <span className="relative z-10">{t.label}</span>
            </a>
          )
        })}
      </div>
    </motion.nav>
  )
}
