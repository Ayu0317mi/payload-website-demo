import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { SidebarProvider } from './SidebarContext'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}
