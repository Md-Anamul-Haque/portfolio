'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINES = [
  { code: 'const dev = {',              c: 'var(--text-1)',  d: 0 },
  { code: '  name:      "Anamul Haque",', c: '#4f8eff',       d: .28 },
  { code: '  stack:     ["TS","Node","React"],', c: '#4f8eff', d: .56 },
  { code: '  startup:   "Udvabok",',     c: '#f59e0b',       d: .84 },
  { code: '  available: true,',          c: '#22c55e',       d: 1.12 },
  { code: '}',                           c: 'var(--text-1)',  d: 1.4  },
]

export default function Splash({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => { setShow(false); setTimeout(onDone, 500) }, 3000)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: .5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: 'var(--bg)' }}
        >
          {/* Ambient blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-[120px]"
                 style={{ background: 'rgba(79,142,255,.08)' }} />
            <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full blur-[100px]"
                 style={{ background: 'rgba(139,92,246,.06)' }} />
          </div>

          <div className="relative w-full max-w-[360px] mx-6">
            <div className="glass rounded-2xl overflow-hidden">
              {/* Window bar */}
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[var(--border)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-auto font-[family-name:var(--font-family-mono)] text-[10px]"
                      style={{ color: 'var(--text-3)' }}>portfolio.ts</span>
              </div>

              {/* Code lines */}
              <div className="p-6 font-[family-name:var(--font-family-mono)] text-[.82rem] leading-[1.9] min-h-[196px]">
                {LINES.map((l, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: l.d, duration: .25 }}
                    style={{ color: l.c }}>
                    {l.code}
                    {i === LINES.length - 1 && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: .7 }}
                        className="inline-block w-[7px] h-[14px] ml-0.5 align-middle rounded-sm"
                        style={{ background: '#4f8eff' }} />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Progress */}
              <div className="px-6 pb-5">
                <div className="h-[2px] rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                  <motion.div className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #4f8eff, #8b5cf6)' }}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2.8, ease: [.16,1,.3,1] }} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
