'use client'
import React from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/providers/SidebarContext'

interface SidebarToggleProps {
  className?: string
}

export const SidebarToggle: React.FC<SidebarToggleProps> = ({ className }) => {
  const { setIsOpen } = useSidebar()
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsOpen(true)}
      className={className}
      aria-label="Open sidebar"
    >
      <Menu className="h-5 w-5" />
    </Button>
  )
}