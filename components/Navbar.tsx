'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NAV = [
  { href:'#hero',       label:'Home'       },
  { href:'#projects',   label:'Projects'   },
  { href:'#skills',     label:'Skills'     },
  { href:'#experience', label:'Experience' },
  { href:'#github',     label:'Activity'   },
  { href:'#contact',    label:'Contact'    },
]

function ThemeBtn() {
  const { resolvedTheme, setTheme } = useTheme()
  const [m, setM] = useState(false)
  useEffect(() => setM(true), [])
  if (!m) return <div className="w-10 h-10" />
  return (
    <Button variant="glass" size="icon"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
      <AnimatePresence mode="wait">
        {resolvedTheme === 'dark'
          ? <motion.span key="s" initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}} transition={{duration:.18}}><Sun size={15}/></motion.span>
          : <motion.span key="m" initial={{rotate:90,opacity:0}}  animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}} transition={{duration:.18}}><Moon size={15}/></motion.span>}
      </AnimatePresence>
    </Button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)
  const [active,   setActive]   = useState('#hero')

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 60)
      NAV.forEach(l => {
        const el = document.querySelector(l.href)
        if (!el) return
        const r = el.getBoundingClientRect()
        if (r.top <= 110 && r.bottom > 110) setActive(l.href)
      })
    }
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y:-72, opacity:0 }}
        animate={{ y:0,   opacity:1 }}
        transition={{ duration:.7, ease:[.16,1,.3,1] }}
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-500',
          scrolled && 'glass border-b border-[var(--border)]'
        )}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero"
             className="font-[family-name:var(--font-family-display)] font-bold text-[1.15rem]"
             style={{ color: 'var(--text-1)' }}>
            <span style={{ color:'var(--accent)' }}>A</span>namul
            <span style={{ color:'var(--accent)' }}>.</span>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV.map(l => (
              <a key={l.href} href={l.href}
                 className={cn(
                   'text-[13px] font-medium relative transition-colors duration-200 group',
                   active === l.href ? '' : 'hover:text-[var(--text-1)]'
                 )}
                 style={{ color: active === l.href ? 'var(--accent)' : 'var(--text-2)' }}>
                {l.label}
                <span className={cn(
                  'absolute -bottom-0.5 left-0 h-px bg-[var(--accent)] transition-all duration-300',
                  active === l.href ? 'w-full' : 'w-0 group-hover:w-full'
                )}/>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeBtn />
            <Button variant="outline" size="sm" asChild className="hidden md:flex gap-1.5">
              <a href="/Anamul_Haque_Fullstack_Developer.pdf" download>
                <Download size={12}/> Resume
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden"
                    onClick={() => setOpen(!open)}>
              {open ? <X size={18}/> : <Menu size={18}/>}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, y:-8 }}
            animate={{ opacity:1, y:0  }}
            exit={{    opacity:0, y:-8 }}
            className="fixed top-16 inset-x-0 z-40 glass border-b border-[var(--border)] px-5 pt-3 pb-5 flex flex-col gap-1 md:hidden"
          >
            {NAV.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                 className="py-3 border-b border-[var(--border)] last:border-0 text-[15px] transition-colors"
                 style={{ color: active===l.href ? 'var(--accent)' : 'var(--text-1)' }}>
                {l.label}
              </a>
            ))}
            <a href="/Anamul_Haque_Fullstack_Developer.pdf" download
               className="mt-2 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm"
               style={{ borderColor:'var(--border)', color:'var(--text-2)' }}>
              <Download size={13}/> Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
