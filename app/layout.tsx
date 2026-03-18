import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: 'Anamul Haque — Full Stack Developer',
  description: 'Full Stack Developer with 4+ years building scalable SaaS. TypeScript, Node.js, React, WebRTC. Co-founder of Udvabok.',
  keywords: ['Full Stack Developer','TypeScript','Node.js','React','Bangladesh','WebRTC','Next.js','PostgreSQL'],
  authors: [{ name:'Anamul Haque', url:'https://github.com/Md-Anamul-Haque' }],
  openGraph: {
    title: 'Anamul Haque — Full Stack Developer',
    description: 'Building scalable, production-ready applications.',
    type: 'website',
  },
}
export const viewport: Viewport = {
  themeColor: [
    { media:'(prefers-color-scheme: dark)',  color:'#05070f' },
    { media:'(prefers-color-scheme: light)', color:'#f5f7ff' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem themes={['dark','light']}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
