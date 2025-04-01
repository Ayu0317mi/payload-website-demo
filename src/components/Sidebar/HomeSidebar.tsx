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
  title = 'Sidebar Navigation', 
  links = [], 
}) => {
  return (
    <Sidebar>
      {title && <h3 className="text-xl font-bold mb-4">Page Navi</h3>}
      
      {links.length > 0 && (
        <div className="space-y-2 mb-6">
          {links.map((link, i) => (
            <div key={i} className="py-2 border-b border-border last:border-0">
              <a 
                href={link.url} 
                className="text-primary hover:text-primary/90 transition-colors"
              >
                {link.label}
              </a>
            </div>
          ))}
        </div>
      )}
    </Sidebar>
  )
}