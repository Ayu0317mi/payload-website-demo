'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, LogOut, LogIn, User, Home, ChevronRight } from 'lucide-react'
import { cn } from '@/utilities/ui'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'

import { Logo } from '@/components/Logo/Logo'

interface SidebarProps {
  className?: string
  children?: React.ReactNode
  links?: Array<{
    label: string
    url: string
  }>
  title?: string
}

type User = {
  id: string
  email: string
  name?: string
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  className, 
  children,
  links = [],
  title = 'Navigation'
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  // Fetch user data
  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        setIsLoading(true)
        const res = await fetch('/api/users/me', {
          credentials: 'include',
        })
        
        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkUserAuth()
  }, [])

  // Default navigation links if none provided
  const navigationLinks = links.length > 0 ? links : [
    { label: 'Home', url: '/' },
    { label: 'Blog', url: '/posts' },
    { label: 'About', url: '/about' }
  ]

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  // Close the sidebar when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false)
  }

  // Handle logout
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      })
      
      if (res.ok) {
        setUser(null)
        // Optionally redirect to home page
        window.location.href = '/'
      }
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <>
      {/* Toggle button - only visible when sidebar is closed */}
      {!isOpen && (
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="fixed z-50 top-24 left-4 lg:left-6 p-2 rounded-full shadow-md"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          'fixed left-0 top-0 h-full z-40 w-[280px] sm:w-[320px] bg-background border-r border-border transform transition-transform duration-300 ease-in-out flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          className
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header with Logo and Close Button */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <Link href="/" onClick={handleLinkClick} className="flex items-center">
              <Logo className="invert dark:invert-0" />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="rounded-full"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Sidebar Content */}
          <div className="flex-1 overflow-auto p-4">
            {title && <h3 className="text-xl font-bold mb-4">{title}</h3>}
            
            <div className="space-y-1">
              {navigationLinks.map((link, i) => (
                <Link 
                  key={i} 
                  href={link.url}
                  onClick={handleLinkClick}
                  className={cn(
                    "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors",
                    pathname === link.url 
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  {link.label === "Home" && <Home className="mr-2 h-4 w-4" />}
                  {link.label !== "Home" && <ChevronRight className="mr-2 h-4 w-4" />}
                  {link.label }
                </Link>
              ))}
            </div>
            
            {children}
          </div>
          
          {/* User Section at Bottom */}
          <div className="p-4 border-t border-border mt-auto">
            {isLoading ? (
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-muted animate-pulse mr-3"></div>
                <div className="h-4 w-32 bg-muted animate-pulse"></div>
              </div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full flex items-center justify-start p-2 hover:bg-muted">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage src="" alt={user.name || user.email} />
                      <AvatarFallback>{user.name?.[0]?.toUpperCase() || user.email[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start text-sm">
                      <span className="font-medium">{user.name || user.email.split('@')[0]}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/admin">
                <Button variant="outline" className="w-full">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
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