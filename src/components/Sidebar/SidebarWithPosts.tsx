'use client'
import React, { useEffect, useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { usePathname } from 'next/navigation'

type Post = {
  id: string
  title: string
  slug: string
}

interface SidebarWithPostsProps {
  initialPosts?: Post[]
  title?: string
}

export const SidebarWithPosts: React.FC<SidebarWithPostsProps> = ({ 
  initialPosts = [],
  title = 'Recent Posts'
}) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const pathname = usePathname()
  
  useEffect(() => {
    // If no initial posts were provided, fetch recent posts
    const fetchRecentPosts = async () => {
      if (initialPosts.length > 0) return

      try {
        const response = await fetch('/api/posts?limit=5&sort=-createdAt', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
        
        if (response.ok) {
          const data = await response.json()
          setPosts(data.docs.map((post: any) => ({
            id: post.id,
            title: post.title,
            slug: post.slug
          })))
        }
      } catch (error) {
        console.error('Error fetching recent posts:', error)
      }
    }

    fetchRecentPosts()
  }, [initialPosts])

  // Create links array for the sidebar
  const postsLinks = posts.map(post => ({
    label: post.title,
    url: `/posts/${post.slug}`
  }))

  // Add additional links
  const links = [
    { label: 'All Posts', url: '/posts' },
    ...postsLinks
  ]

  return (
    <Sidebar title={title} links={links}>
      {posts.length === 0 && (
        <div className="py-4 text-sm text-muted-foreground">
          Loading recent posts...
        </div>
      )}
    </Sidebar>
  )
}