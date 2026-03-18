'use client'
import { ThemeProvider as NextThemes } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'
export function ThemeProvider({ children, ...p }: ThemeProviderProps) {
  return <NextThemes {...p}>{children}</NextThemes>
}
