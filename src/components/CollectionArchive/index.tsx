import { cn } from '@/utilities/ui'
import React from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { CalendarDays } from 'lucide-react'

import type { Post } from '@/payload-types'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'createdAt' | 'authors'>

export type Props = {
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className={cn('container')}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post, index) => {
          if (typeof post === 'object' && post !== null) {
            const { slug, title, meta, createdAt, authors } = post
            const { description, image } = meta || {}
            const href = `/posts/${slug}`
            
            // Format date
            const formattedDate = createdAt 
              ? format(new Date(createdAt), 'MMM d, yyyy') 
              : 'No date'
            
            // Get image URL
            let imageUrl = ''
            if (image && typeof image === 'object' && 'url' in image && image.url) {
              imageUrl = image.url as string
            }
            
            // Get author info
            let authorName = 'Unknown'
            const authorRole = 'Author'
            let authorInitial = 'U'
            const authorImage = ''
            
            // Check if there's at least one author
            if (authors && authors.length > 0) {
              const firstAuthor = authors[0]
              
              if (typeof firstAuthor === 'object' && firstAuthor !== null) {
                if ('name' in firstAuthor && firstAuthor.name) {
                  authorName = firstAuthor.name as string
                  authorInitial = authorName.charAt(0)
                }
              }
            }

            return (
              <Card key={index} className="overflow-hidden flex flex-col h-full bg-white dark:bg-card rounded-xl">
                {imageUrl && (
                  <Link href={href}>
                    <div 
                      className="h-48 bg-cover bg-center hover:opacity-90 transition-opacity"
                      style={{ backgroundImage: `url(${imageUrl})` }}
                    />
                  </Link>
                )}
                <CardHeader>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <CalendarDays className="mr-1 h-4 w-4" />
                    {formattedDate}
                  </div>
                  <CardTitle className="line-clamp-2">
                    <Link href={href}>{title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  {description && (
                    <p className="text-muted-foreground line-clamp-3">{description}</p>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between items-center pt-4">
                  <div className="w-full px-3 py-3 border-t flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        {authorImage ? (
                          <AvatarImage src={authorImage} />
                        ) : null}
                        <AvatarFallback>{authorInitial}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{authorName}</p>
                      </div>
                    </div>
                    <Link href={href}>
                      <Button variant="default" size="sm">
                        Read
                      </Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            )
          }

          return null
        })}
      </div>
    </div>
  )
}
