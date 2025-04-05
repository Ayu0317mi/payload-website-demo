import React from 'react'
import { DynamicSidebar } from '@/components/Sidebar/DynamicSidebar'

interface SidebarLayoutProps {
  children: React.ReactNode
  sidebarContent?: React.ReactNode
  navigationLinks?: Array<{
    label: string
    url: string
  }>
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({ 
  children, 
  sidebarContent,
  navigationLinks = [
    { label: 'Home', url: '/' },
    { label: 'Posts', url: '/posts' },
    { label: 'Contact', url: '/contact' },
  ] 
}) => {
  return (
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row relative">
        <div className="flex-1 min-w-0">{children}</div>
        <div className="hidden lg:block">
          {sidebarContent || <DynamicSidebar title="Pages" initialLinks={navigationLinks} />}
        </div>
      </div>
    </div>
  )
}