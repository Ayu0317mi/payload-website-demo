'use client'
import React from 'react'
import { Sidebar } from '@/components/Sidebar'

interface SidebarWithLinksProps {
  title?: string
  initialLinks?: Array<{
    label: string
    url: string
  }>
}

export const SidebarWithLinks: React.FC<SidebarWithLinksProps> = ({ 
  title = "Navigation",
  initialLinks = []
}) => {
  // Ensure we have at least some basic links
  const links = initialLinks.length > 0 
    ? initialLinks 
    : [
        { label: 'Home', url: '/' },
        { label: 'Posts', url: '/posts' }
      ]
  
  return (
    <Sidebar 
      title={title}
      links={links}
    />
  )
}