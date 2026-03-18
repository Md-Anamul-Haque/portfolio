'use client'
import { useState, useCallback } from 'react'
import Splash          from '@/components/Splash'
import Navbar          from '@/components/Navbar'
import Hero            from '@/components/Hero'
import Projects        from '@/components/Projects'
import Skills          from '@/components/Skills'
import Experience      from '@/components/Experience'
import GitHubGraph     from '@/components/GitHubGraph'
import Contact         from '@/components/Contact'
import BottomNav       from '@/components/BottomNav'
import FloatingContact from '@/components/FloatingContact'

export default function Page() {
  const [ready, setReady] = useState(false)
  const done = useCallback(() => setReady(true), [])

  return (
    <>
      <Splash onDone={done} />
      {ready && (
        <main className="relative">
          <Navbar />
          <Hero />
          <Projects />
          <Skills />
          <Experience />
          <GitHubGraph />
          <Contact />
          <BottomNav />
          <FloatingContact />
        </main>
      )}
    </>
  )
}
