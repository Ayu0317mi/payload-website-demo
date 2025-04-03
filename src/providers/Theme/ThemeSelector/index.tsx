'use client'

import { Sun, Moon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

import type { Theme } from './types'
import { useTheme } from '..'
import { themeLocalStorageKey } from './types'

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState<Theme | 'auto'>('auto')

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    setCurrentTheme(newTheme)
    window.localStorage.setItem(themeLocalStorageKey, newTheme)
  }

  useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    setCurrentTheme(preference as Theme ?? 'auto')
  }, [])

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="w-9 h-9 bg-transparent"
    >
      {currentTheme === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  )
}
