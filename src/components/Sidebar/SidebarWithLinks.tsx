import React from 'react'
import { DynamicSidebar } from '@/components/Sidebar/DynamicSidebar'
import { getPageLinks } from '@/utilities/getPageLinks'

interface SidebarWithLinksProps {
  title?: string
}

export async function SidebarWithLinks({ title = 'Pages' }: SidebarWithLinksProps) {
  // Fetch page links using the server-side utility
  const links = await getPageLinks()
  
  return <DynamicSidebar title={title} initialLinks={links} />
}