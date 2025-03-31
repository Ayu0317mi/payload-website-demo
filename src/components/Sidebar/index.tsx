import React from 'react'
import { cn } from '@/utilities/ui'

interface SidebarProps {
  className?: string
  children: React.ReactNode
}

export const Sidebar: React.FC<SidebarProps> = ({ className, children }) => {
  return (
    <aside className={cn('w-full lg:w-[250px] xl:w-[300px] p-4 border border-border rounded-[0.8rem]', className)}>
      {children}
    </aside>
  )
}