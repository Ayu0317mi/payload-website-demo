'use client'
import React, { useState } from 'react'
import { cn } from '@/utilities/ui'
import { Menu, X } from 'lucide-react'

interface SidebarProps {
  className?: string
  children: React.ReactNode
}

export const Sidebar: React.FC<SidebarProps> = ({ className, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Toggle button - only visible when sidebar is closed */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed z-50 top-24 left-4 lg:left-6 bg-primary text-white p-2 rounded-full shadow-md hover:bg-primary/90 transition-all"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>
      )}
      
      <aside 
        className={cn(
          'fixed left-0 top-0 h-full z-40 w-[280px] lg:w-[300px] p-4 border border-border rounded-tr-[0.8rem] rounded-br-[0.8rem] bg-background shadow-lg transform transition-transform duration-300 ease-in-out pt-16',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          className
        )}
      >
        {/* Close button inside sidebar */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 bg-primary text-white p-2 rounded-full shadow-md hover:bg-primary/90 transition-all"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
        
        {children}
      </aside>
      
      {/* Overlay for both mobile and desktop - only shown when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  )
}