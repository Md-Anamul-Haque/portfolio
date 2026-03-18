'use client'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Github, GitCommit, ExternalLink } from 'lucide-react'

type Day  = { contributionCount:number; date:string }
type Week = { contributionDays?: Day[] }

const LEVELS_DARK  = ['#111827','#1e3a5f','#1d4ed8','#2563eb','#4f8eff']
const LEVELS_LIGHT = ['#e5e7eb','#bfdbfe','#93c5fd','#3b82f6','#1d4ed8']

function level(n:number) {
  if(n===0) return 0; if(n<3) return 1; if(n<6) return 2; if(n<10) return 3; return 4
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export default function GitHubGraph() {
  const { ref, inView } = useInView({ triggerOnce:true, threshold:.05 })
  const [weeks,   setWeeks]   = useState<Week[]>([])
  const [total,   setTotal]   = useState(0)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(false)
  const [dark,    setDark]    = useState(true)

  useEffect(() => {
    const update = () => setDark(!document.documentElement.classList.contains('light'))
    update()
    const ob = new MutationObserver(update)
    ob.observe(document.documentElement, {attributes:true, attributeFilter:['class']})
    return () => ob.disconnect()
  }, [])

  useEffect(() => {
    fetch('https://github-contributions-api.jogruber.de/v4/Md-Anamul-Haque?y=last')
      .then(r => r.json())
      .then(d => {
        setWeeks(d.contributions ?? [])
        setTotal(d.total?.lastYear ?? 0)
        setLoading(false)
      })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  const pal = dark ? LEVELS_DARK : LEVELS_LIGHT

  return (
    <section id="github" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <motion.div ref={ref}
          initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.7}}
          className="mb-12">
          <p className="section-eyebrow">Open Source</p>
          <h2 className="font-[family-name:var(--font-family-display)] font-extrabold tracking-tight mb-4"
              style={{fontSize:'clamp(2rem,5vw,3rem)', color:'var(--text-1)'}}>
            GitHub <span className="grad-text">Activity</span>
          </h2>
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex items-center gap-2">
              <GitCommit size={14} style={{color:'var(--accent)'}}/>
              <span className="font-[family-name:var(--font-family-mono)] text-sm" style={{color:'var(--text-2)'}}>
                {total > 0 ? `${total} contributions in the last year` : 'Contribution activity'}
              </span>
            </div>
            <a href="https://github.com/Md-Anamul-Haque" target="_blank" rel="noreferrer"
               className="flex items-center gap-1.5 font-[family-name:var(--font-family-mono)] text-xs"
               style={{color:'var(--accent)'}}>
              <ExternalLink size={12}/> View Profile
            </a>
          </div>
        </motion.div>

        <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:.2}}>
          <div className="glass-card p-6 md:p-8 overflow-x-auto">
            {loading && (
              <div className="flex items-center justify-center py-14 gap-3">
                <div className="w-5 h-5 border-2 rounded-full border-t-transparent animate-spin"
                     style={{borderColor:'var(--accent) var(--border) var(--border)'}}/>
                <span className="font-[family-name:var(--font-family-mono)] text-sm" style={{color:'var(--text-3)'}}>
                  Loading contributions...
                </span>
              </div>
            )}
            {error && (
              <div className="flex flex-col items-center py-14 gap-3">
                <Github size={28} style={{color:'var(--text-3)'}}/>
                <p className="font-[family-name:var(--font-family-mono)] text-sm" style={{color:'var(--text-3)'}}>
                  Could not load — visit GitHub directly
                </p>
                <a href="https://github.com/Md-Anamul-Haque" target="_blank" rel="noreferrer"
                   style={{color:'var(--accent)'}} className="text-xs">
                  github.com/Md-Anamul-Haque ↗
                </a>
              </div>
            )}
            {!loading && !error && weeks.length > 0 && (
              <div>
                {/* Month labels */}
                <div className="flex ml-7 mb-1.5">
                  {weeks.filter((_,i)=>i%4===0).map((w,i) => {
                    const m = new Date(w.contributionDays?.[0]?.date || new Date()).getMonth()
                    return (
                      <div key={i} className="flex-1 font-[family-name:var(--font-family-mono)] text-[9px]"
                           style={{color:'var(--text-3)', minWidth:'28px'}}>
                        {i%2===0 ? MONTHS[m] : ''}
                      </div>
                    )
                  })}
                </div>
                <div className="flex gap-1">
                  {/* Day labels */}
                  <div className="flex flex-col gap-[3px] mr-1 pt-0.5">
                    {['','M','','W','','F',''].map((d,i) => (
                      <div key={i} className="h-[11px] w-5 font-[family-name:var(--font-family-mono)] text-[9px] flex items-center"
                           style={{color:'var(--text-3)'}}>{d}</div>
                    ))}
                  </div>
                  {/* Cells */}
                  <div className="flex gap-[3px]">
                    {weeks.map((w,wi) => (
                      <div key={wi} className="flex flex-col gap-[3px]">
                        {w.contributionDays?.map((d,di) => (
                          <motion.div key={di}
                            initial={{opacity:0,scale:0}}
                            animate={inView?{opacity:1,scale:1}:{}}
                            transition={{delay:wi*.004+di*.002}}
                            className="w-[11px] h-[11px] rounded-sm cursor-pointer transition-opacity duration-150 hover:opacity-80"
                            style={{background: pal[level(d.contributionCount)]}}
                            title={`${d.date}: ${d.contributionCount} contributions`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Legend */}
                <div className="flex items-center gap-1.5 mt-4 justify-end">
                  <span className="font-[family-name:var(--font-family-mono)] text-[9px]" style={{color:'var(--text-3)'}}>Less</span>
                  {[0,1,2,3,4].map(l => (
                    <div key={l} className="w-3 h-3 rounded-sm" style={{background:pal[l]}}/>
                  ))}
                  <span className="font-[family-name:var(--font-family-mono)] text-[9px]" style={{color:'var(--text-3)'}}>More</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5">
            {[
              {icon:<Github size={16}/>, label:'GitHub Profile', val:'Md-Anamul-Haque', href:'https://github.com/Md-Anamul-Haque'},
              {icon:<span className="text-base">📦</span>, label:'npm Package', val:'rg-express', href:'https://npmjs.com/package/rg-express'},
              {icon:<span className="text-base">💼</span>, label:'LinkedIn', val:'anamulhaque32', href:'https://linkedin.com/in/anamulhaque32'},
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                 className="glass-card p-4 flex flex-col items-center gap-2 text-center group">
                <div className="transition-colors" style={{color:'var(--text-2)'}}>{s.icon}</div>
                <div className="font-[family-name:var(--font-family-display)] font-bold text-sm"
                     style={{color:'var(--text-1)'}}>{s.val}</div>
                <div className="font-[family-name:var(--font-family-mono)] text-[10px]" style={{color:'var(--text-3)'}}>{s.label}</div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
