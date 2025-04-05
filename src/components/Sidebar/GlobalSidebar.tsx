'use client'

import React, { useEffect, useState } from 'react'
import { Sidebar } from '@/components/Sidebar'

export const GlobalSidebar: React.FC = () => {
  const [links, setLinks] = useState([
    { label: 'Home', url: '/' },
    { label: 'Posts', url: '/posts' },
    { label: 'Contact', url: '/contact' },
  ])
  
  // Fetch all pages to get dynamic links - only pages, no posts
  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch('/api/pages?limit=20&sort=title', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
        
        if (response.ok) {
          const data = await response.json()
          const pageLinks = data.docs
            .filter((page: any) => page.slug !== 'home')
            .map((page: any) => ({
              label: page.title,
              url: `/${page.slug}`,
            }))
          
          // Add standard links
          const allLinks = [
            { label: 'Home', url: '/' },
            { label: 'Posts', url: '/posts' },
            ...pageLinks
          ]
          
          setLinks(allLinks)
        }
      } catch (error) {
        console.error('Error fetching pages:', error)
      }
    }

    fetchPages()
  }, [])

  return (
    <Sidebar links={links} title="Navigation" />
  )
}