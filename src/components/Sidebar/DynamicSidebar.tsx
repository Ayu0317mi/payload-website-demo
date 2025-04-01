import React from 'react'
import { HomeSidebar } from './HomeSidebar'
import { getPageLinks } from '@/utilities/getPageLinks'

interface DynamicSidebarProps {
  title?: string
  // Keep the property but mark it with an underscore since we're not using it
  // but it might be needed in the future
  _newsletterSignup?: boolean
}

export async function DynamicSidebar({ 
  title = 'Navigation',
  // Renamed to follow ESLint naming convention for unused variables
  _newsletterSignup = true 
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