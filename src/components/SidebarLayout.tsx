import React from 'react'
import { DynamicSidebar } from '@/components/Sidebar/DynamicSidebar'

interface SidebarLayoutProps {
  children: React.ReactNode
  sidebarContent?: React.ReactNode
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children, sidebarContent }) => {
  return (
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">{children}</div>
        <div className="w-full lg:w-auto">
          {sidebarContent || <DynamicSidebar title="Pages" />}
        </div>
      </div>
    </div>
  )
}