'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Mail, Phone, Github, Linkedin } from 'lucide-react'

const ACTIONS = [
  { icon:<Mail     size={17}/>, href:'mailto:m.anamul.dev@gmail.com',         label:'Email',    c:'var(--ac)'   },
  { icon:<Phone    size={17}/>, href:'tel:+8801972752132',                     label:'Call',     c:'var(--green)'},
  { icon:<Github   size={17}/>, href:'https://github.com/Md-Anamul-Haque',    label:'GitHub',   c:'var(--t1)'  },
  { icon:<Linkedin size={17}/>, href:'https://linkedin.com/in/anamulhaque32', label:'LinkedIn', c:'#0ea5e9'    },
]

export default function FloatingContact() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-24 right-4 z-40 md:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, scale:.8, y:8 }}
            animate={{ opacity:1, scale:1,  y:0 }}
            exit={{    opacity:0, scale:.8, y:8 }}
            className="absolute bottom-16 right-0 flex flex-col gap-2.5 items-end">
            {ACTIONS.map((a,i) => (
              <motion.div key={a.label}
                initial={{ opacity:0, x:16 }}
                animate={{ opacity:1, x:0  }}
                exit={{    opacity:0, x:16 }}
                transition={{ delay:i*.05 }}
                className="flex items-center gap-2.5">
                <span className="glass text-xs font-[family-name:var(--font-family-mono)] px-2.5 py-1 rounded-xl"
                      style={{ color:'var(--t2)' }}>{a.label}</span>
                <a href={a.href}
                   target={a.href.startsWith('http') ? '_blank' : undefined}
                   rel="noreferrer"
                   className="w-11 h-11 rounded-[var(--radius-xl)] flex items-center justify-center transition-transform active:scale-90"
                   style={{
                     background: `color-mix(in oklch, ${a.c} 14%, transparent)`,
                     border:`1.5px solid color-mix(in oklch, ${a.c} 38%, transparent)`,
                     color: a.c,
                   }}>
                  {a.icon}
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileTap={{ scale:.9 }}
        className="w-[52px] h-[52px] rounded-[var(--radius-xl)] flex items-center justify-center glow"
        style={{ background:'linear-gradient(135deg, var(--ac), var(--ac2))' }}>
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration:.25 }}>
          {open ? <X size={19} color="white"/> : <MessageCircle size={19} color="white"/>}
        </motion.div>
      </motion.button>
    </div>
  )
}
