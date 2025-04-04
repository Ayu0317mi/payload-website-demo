// This is a server component
import React from 'react'
import { SidebarLayout } from '@/components/SidebarLayout'
import { getPageLinks } from '@/utilities/getPageLinks'

interface SidebarWrapperProps {
  children: React.ReactNode
}

export async function SidebarWrapper({ children }: SidebarWrapperProps) {
  // Fetch page links using the server-side utility
  const navigationLinks = (await getPageLinks()).filter(
    (link): link is { label: string; url: string } => link !== undefined
  )
  
  // Standard navigation links that should always be available
  const standardLinks = [
    { label: 'Home', url: '/' },
    { label: 'Posts', url: '/posts' }
  ]
  
  // Combine standard links with page links, avoiding duplicates
  const allLinks = [...standardLinks]
  
  // Add dynamic page links, but avoid duplicating standard ones
  navigationLinks.forEach(link => {
    if (!allLinks.some(existingLink => existingLink.url === link.url)) {
      allLinks.push(link)
    }
  })
  
  // Pass the links as props to the client component
  return (
    <SidebarLayout navigationLinks={allLinks}>
      {children}
    </SidebarLayout>
  )
}