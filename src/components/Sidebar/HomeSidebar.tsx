import React from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Button } from '@/components/ui/button'

interface SidebarContentProps {
  title?: string
  links?: Array<{
    label: string
    url: string
  }>
  newsletterSignup?: boolean
}

export const HomeSidebar: React.FC<SidebarContentProps> = ({ 
  title = 'Sidebar Navigation', 
  links = [], 
  newsletterSignup = true 
}) => {
  return (
    <Sidebar className="sticky top-24">
      {title && <h3 className="text-xl font-bold mb-4">Page Navi</h3>}
      
      {links.length > 0 && (
        <div className="space-y-2 mb-6">
          {links.map((link, i) => (
            <div key={i} className="py-2 border-b border-border last:border-0">
              <a 
                href={link.url} 
                className="text-primary hover:text-primary/80 transition-colors"
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