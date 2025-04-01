'use client'
import React, { useEffect, useState } from 'react'
import { HomeSidebar } from './HomeSidebar'

interface DynamicSidebarProps {
  title?: string
  _newsletterSignup?: boolean
}

export function DynamicSidebar({ 
  title = 'Navigation',
  _newsletterSignup = true 
}: DynamicSidebarProps) {
  // Use client-side state instead of server-side data fetching
  const [links, setLinks] = useState([
    { label: 'Home', url: '/' },
  ])
  
  // In a real implementation, you would fetch these links client-side
  // using an API endpoint instead of the direct server function
  
  return (
    <HomeSidebar 
      title={title}
      links={links}
    />
  )
}