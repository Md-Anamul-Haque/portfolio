// 'use client'
// import { useState, useEffect } from 'react'
// import { useTheme } from 'next-themes'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Sun, Moon, Menu, X, Download } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { cn } from '@/lib/utils'
// import Link from 'next/link'

// const NAV = [
//   { href:'#hero',       label:'Home'       },
//   { href:'#projects',   label:'Projects'   },
//   { href:'#skills',     label:'Skills'     },
//   { href:'#experience', label:'Experience' },
//   { href:'#github',     label:'Activity'   },
//   { href:'#contact',    label:'Contact'    },
// ]

// function ThemeBtn() {
//   const { resolvedTheme, setTheme } = useTheme()
//   const [m, setM] = useState(false)
//   useEffect(() => setM(true), [])
//   if (!m) return <div className="w-10 h-10" />
//   return (
//     <Button variant="glass" size="icon"
//       onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
//       <AnimatePresence mode="wait">
//         {resolvedTheme === 'dark'
//           ? <motion.span key="s" initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}} transition={{duration:.18}}><Sun size={15}/></motion.span>
//           : <motion.span key="m" initial={{rotate:90,opacity:0}}  animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}} transition={{duration:.18}}><Moon size={15}/></motion.span>}
//       </AnimatePresence>
//     </Button>
//   )
// }

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false)
//   const [open,     setOpen]     = useState(false)
//   const [active,   setActive]   = useState('#hero')

//   useEffect(() => {
//     const fn = () => {
//       setScrolled(window.scrollY > 60)
//       NAV.forEach(l => {
//         const el = document.querySelector(l.href)
//         if (!el) return
//         const r = el.getBoundingClientRect()
//         if (r.top <= 110 && r.bottom > 110) setActive(l.href)
//       })
//     }
//     window.addEventListener('scroll', fn, { passive:true })
//     return () => window.removeEventListener('scroll', fn)
//   }, [])

//   return (
//     <>
//       <motion.header
//         initial={{ y:-52, opacity:0 }}
//         animate={{ y:0,   opacity:1 }}
//         transition={{ duration:.7, ease:[.16,1,.3,1] }}
//         className={cn(
//           'fixed top-0 inset-x-0 z-50 transition-all bg-background duration-500',
//           scrolled && 'bg-background/90 border-b border-[var(--border)]'
//         )}
//       >
//         <div className="max-w-6xl mx-auto px-5 md:px-8 h-12 flex items-center justify-between">
//           {/* Logo */}
//           <Link href="#hero"
//              className="font-[family-name:var(--font-family-display)] font-bold text-[1.15rem]"
//              style={{ color: 'var(--text-1)' }}>
//             <span style={{ color:'var(--accent)' }}>A</span>namul
//             <span style={{ color:'var(--accent)' }}>.</span>
//           </Link>

//           {/* Desktop links */}
//           <nav className="hidden md:flex items-center gap-7">
//             {NAV.map(l => (
//               <Link key={l.href} href={l.href}
//                  className={cn(
//                    'text-[13px] font-medium relative transition-colors duration-200 group',
//                    active === l.href ? '' : 'hover:text-[var(--text-1)]'
//                  )}
//                  style={{ color: active === l.href ? 'var(--accent)' : 'var(--text-2)' }}>
//                 {l.label}
//                 <span className={cn(
//                   'absolute -bottom-0.5 left-0 h-px bg-[var(--accent)] transition-all duration-300',
//                   active === l.href ? 'w-full' : 'w-0 group-hover:w-full'
//                 )}/>
//               </Link>
//             ))}
//           </nav>

//           <div className="flex items-center gap-2">
//             <ThemeBtn />
//             <Button variant="outline" size="sm" asChild className="hidden md:flex gap-1.5">
//               <Link href="/Anamul_Haque_Fullstack_Developer.pdf" download>
//                 <Download size={12}/> Resume
//               </Link>
//             </Button>
//             <Button variant="ghost" size="icon" className="md:hidden"
//                     onClick={() => setOpen(!open)}>
//               {open ? <X size={18}/> : <Menu size={18}/>}
//             </Button>
//           </div>
//         </div>
//       </motion.header>

//       {/* Mobile drawer */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity:0, y:-8 }}
//             animate={{ opacity:1, y:0  }}
//             exit={{    opacity:0, y:-8 }}
//             className="fixed top-10 inset-x-0 z-40 bg-background border-b border-[var(--border)] px-6 pt-3 pb-5 flex flex-col gap-1 md:hidden"
//           >
//             {NAV.map(l => (
//               <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
//                  className="py-3 border-b border-[var(--border)] last:border-0 text-[15px] transition-colors"
//                  style={{ color: active===l.href ? 'var(--accent)' : 'var(--text-1)' }}>
//                 {l.label}
//               </Link>
//             ))}
//             <Link href="/Anamul_Haque_Fullstack_Developer.pdf" download
//                className="mt-2 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm"
//                style={{ borderColor:'var(--border)', color:'var(--text-2)' }}>
//               <Download size={13}/> Download Resume
//             </Link>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   )
// }
'use client'
import { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X, Download, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const NAV = [
  { href: '#hero',       label: 'Home'       },
  { href: '#projects',   label: 'Projects'   },
  { href: '#skills',     label: 'Skills'     },
  { href: '#experience', label: 'Experience' },
  { href: '#github',     label: 'Activity'   },
  { href: '#contact',    label: 'Contact'    },
]

/* ── Theme toggle ─────────────────────────────────────────── */
function ThemeBtn() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-9 h-9" />

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className={cn(
        'relative w-9 h-9 rounded-xl flex items-center justify-center',
        'border border-[var(--border)] bg-[var(--surface-1)]',
        'transition-all duration-200 hover:border-[var(--accent)]/40',
        'hover:bg-[var(--accent)]/5 active:scale-95',
      )}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        {resolvedTheme === 'dark' ? (
          <motion.span
            key="sun"
            initial={{ rotate: -45, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0,   opacity: 1, scale: 1   }}
            exit={{    rotate:  45, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Sun size={14} className="text-[var(--text-2)]" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate:  45, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0,   opacity: 1, scale: 1   }}
            exit={{    rotate: -45, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Moon size={14} className="text-[var(--text-2)]" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

/* ── Navbar ───────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [active,      setActive]      = useState('#hero')
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const navRef  = useRef<HTMLElement>(null)
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})

  /* ── scroll spy ──────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      for (const { href } of NAV) {
        const el = document.querySelector(href)
        if (!el) continue
        const { top, bottom } = el.getBoundingClientRect()
        if (top <= 100 && bottom > 100) { setActive(href); break }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── sliding indicator ───────────────────────────────────── */
  useEffect(() => {
    const el = linkRefs.current[active]
    if (!el || !navRef.current) return
    const navRect  = navRef.current.getBoundingClientRect()
    const linkRect = el.getBoundingClientRect()
    setIndicatorStyle({
      left:  linkRect.left - navRect.left,
      width: linkRect.width,
    })
  }, [active])

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-[var(--border)]/70 shadow-[0_1px_24px_0_rgba(0,0,0,.06)]'
            : 'bg-transparent',
        )}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-10 h-14 flex items-center justify-between">

          {/* ── Logo ─────────────────────────────────────────── */}
          <Link
            href="#hero"
            className="font-[family-name:var(--font-family-display)] font-bold text-[1.1rem] tracking-tight select-none"
            style={{ color: 'var(--text-1)' }}
          >
            <span style={{ color: 'var(--accent)' }}>A</span>
            <span>namul</span>
            <span
              style={{ color: 'var(--accent)' }}
              className="ml-[1px] opacity-70"
            >.</span>
          </Link>

          {/* ── Desktop nav ──────────────────────────────────── */}
          <nav ref={navRef} className="hidden md:flex items-center gap-1 relative">
            {/* sliding background pill */}
            <motion.span
              className="absolute top-0 bottom-0 rounded-lg bg-[var(--accent)]/8 pointer-events-none"
              animate={indicatorStyle}
              transition={{ type: 'spring', stiffness: 420, damping: 34, mass: 0.7 }}
            />

            {NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                ref={el => { linkRefs.current[href] = el }}
                className={cn(
                  'relative z-10 px-3.5 py-1.5 rounded-lg text-[13px] font-medium',
                  'transition-colors duration-200 select-none',
                )}
                style={{
                  color: active === href ? 'var(--accent)' : 'var(--text-2)',
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* ── Right actions ─────────────────────────────────── */}
          <div className="flex items-center gap-2">
            <ThemeBtn />

            <Link
              href="/Anamul_Haque_Fullstack_Developer.pdf"
              download
              className={cn(
                'hidden md:inline-flex items-center gap-1.5',
                'h-9 px-3.5 rounded-xl text-[13px] font-semibold',
                'border border-[var(--accent)]/30 text-[var(--accent)]',
                'bg-[var(--accent)]/6 hover:bg-[var(--accent)]/12',
                'transition-all duration-200 active:scale-95 select-none',
              )}
            >
              <Download size={11} strokeWidth={2.5} />
              Resume
            </Link>

            {/* mobile hamburger */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              className={cn(
                'md:hidden w-9 h-9 rounded-xl flex items-center justify-center',
                'border border-[var(--border)] bg-[var(--surface-1)]',
                'transition-all duration-200 hover:border-[var(--accent)]/40 active:scale-95',
              )}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.span key="x"
                    initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{    rotate:  45, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X size={15} className="text-[var(--text-1)]" />
                  </motion.span>
                ) : (
                  <motion.span key="menu"
                    initial={{ rotate:  45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{    rotate: -45, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu size={15} className="text-[var(--text-1)]" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile drawer ─────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{    opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* panel */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0,   scale: 1    }}
              exit={{    opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                'fixed top-[3.75rem] inset-x-4 z-40 md:hidden',
                'rounded-2xl border border-[var(--border)]',
                'bg-background/95 backdrop-blur-xl shadow-xl',
                'overflow-hidden',
              )}
            >
              <div className="p-3 flex flex-col gap-0.5">
                {NAV.map(({ href, label }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0  }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                  >
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        'flex items-center justify-between px-4 py-3 rounded-xl',
                        'text-[15px] font-medium transition-all duration-150',
                        active === href
                          ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
                          : 'text-[var(--text-1)] hover:bg-[var(--surface-1)]',
                      )}
                    >
                      {label}
                      {active === href && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                      )}
                    </Link>
                  </motion.div>
                ))}

                {/* divider */}
                <div className="my-1 mx-2 h-px bg-[var(--border)]" />

                {/* Resume row */}
                <Link
                  href="/Anamul_Haque_Fullstack_Developer.pdf"
                  download
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-xl',
                    'text-[15px] font-semibold transition-all duration-150',
                    'text-[var(--accent)] hover:bg-[var(--accent)]/8',
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <Download size={14} strokeWidth={2.5} />
                    Download Resume
                  </span>
                  <ArrowUpRight size={14} className="opacity-50" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}