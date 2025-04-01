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
  
  // Pass the links as props to the client component
  return (
    <SidebarLayout navigationLinks={navigationLinks}>
      {children}
    </SidebarLayout>
  )
}