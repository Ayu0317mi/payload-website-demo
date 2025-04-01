import React from 'react'
import { HomeSidebar } from './HomeSidebar'
import { getPageLinks } from '@/utilities/getPageLinks'

interface DynamicSidebarProps {
  title?: string
  newsletterSignup?: boolean
}

export async function DynamicSidebar({ 
  title = 'Navigation', 
  newsletterSignup = true 
}: DynamicSidebarProps) {
  // Fetch links from Pages collection
  const links = await getPageLinks()
  
  // Default links if no pages are configured for navigation
  const defaultLinks = [
    { label: 'Home', url: '/' },
  ]
  
  return (
    <HomeSidebar 
      title={title}
      links={links.length > 0 ? links : defaultLinks}
    />
  )
}