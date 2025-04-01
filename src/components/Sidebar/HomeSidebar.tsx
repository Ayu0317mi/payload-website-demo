'use client'
import React from 'react'
import { Sidebar } from '@/components/Sidebar'

interface SidebarContentProps {
  title?: string
  links?: Array<{
    label: string
    url: string
  }>
}

export const HomeSidebar: React.FC<SidebarContentProps> = ({ 
  title = 'Navigation', 
  links = [], 
}) => {
  return (
    <Sidebar 
      title={title}
      links={links}
    />
  )
}