'use client'
import React, { useState } from 'react'
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
  const [links] = useState(
    initialLinks.length > 0 
      ? initialLinks 
      : [{ label: 'Home', url: '/' }]
  )
  
  // Use the simple HomeSidebar which just displays the links
  return (
    <HomeSidebar 
      title={title}
      links={links}
    />
  )
}