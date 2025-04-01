'use client'
import React, { useEffect, useState } from 'react'
import { HomeSidebar } from './HomeSidebar'

interface DynamicSidebarProps {
  title?: string
  _newsletterSignup?: boolean
  initialLinks?: Array<{
    label: string
    url: string
  }>
}

export function DynamicSidebar({ 
  title = 'Navigation',
  _newsletterSignup = true,
  initialLinks = []
}: DynamicSidebarProps) {
  // Use the initial links provided as props, or fallback to Home
  const [links, setLinks] = useState(
    initialLinks.length > 0 
      ? initialLinks 
      : [{ label: 'Home', url: '/' }]
  )
  
  return (
    <HomeSidebar 
      title={title}
      links={links}
    />
  )
}