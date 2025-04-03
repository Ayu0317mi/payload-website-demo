import type { Metadata } from 'next'
import { Clock } from 'lucide-react'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { Media } from '@/components/Media'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import { CalendarDaysIcon } from 'lucide-react'

import type { Post } from '@/payload-types'

import { formatDateTime } from '@/utilities/formatDateTime'
import { formatAuthors } from '@/utilities/formatAuthors'
import { generateMeta } from '@/utilities/generateMeta'
import { calculateReadTime } from '@/utilities/calculateReadTime'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/posts/' + slug
  const post = await queryPostBySlug({ slug })

  if (!post) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      <main>
        <div className="container mx-auto px-4 py-8">
          <article className="max-w-3xl mx-auto">
            <header className="mb-8">
              {post.categories && post.categories.length > 0 && (
                <div className="categories">
                  {post.categories.map((category, index) => {
                    if (typeof category === 'object' && category !== null) {
                      return (
                        <React.Fragment key={category.id}>
                          {category.title}
                          {index < (post.categories?.length || 0) - 1 ? ', ' : ''}
                        </React.Fragment>
                      )
                    }
                    return null
                  })}
                </div>
              )}
              <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{post.title}</h1>
              
              <div className="flex gap-8 text-sm text-muted-foreground">
                <div className="flex flex-col gap-4">
                  {post.populatedAuthors && post.populatedAuthors.length > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="rounded-full w-8 h-8 bg-muted flex items-center justify-center">
                        {post.populatedAuthors[0]?.name?.[0]?.toUpperCase() || '?'}
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {formatAuthors(post.populatedAuthors)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                <div className="rounded-full w-8 h-8 bg-muted flex items-center justify-center">
                    <CalendarDaysIcon className="h-4 w-4" />
                  </div>
                      {post.publishedAt && (
                        
                      <time dateTime={post.publishedAt} className="text-sm font-medium text-foreground">
                        {formatDateTime(post.publishedAt)}
                      </time>
                      )}
                </div>

                <div className="flex items-center gap-2">
                  <div className="rounded-full w-8 h-8 bg-muted flex items-center justify-center">
                    <Clock className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {calculateReadTime(post.content)}
                  </span>
                </div>
              </div>
            </header>
          </article>
        </div>

        {post.heroImage && typeof post.heroImage === 'object' && (
          <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh]">
            <Media
              resource={post.heroImage}
              priority
              fill
              imgClassName="object-cover"
            />
          </div>
        )}

        <div className="container mx-auto px-4 py-8">
          <article className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <RichText data={post.content} enableGutter={false} />
            </div>

            {post.relatedPosts && post.relatedPosts.length > 0 && (
              <footer className="mt-8 pt-6 border-t">
                <RelatedPosts
                  className="mt-12"
                  docs={post.relatedPosts.filter((post) => typeof post === 'object')}
                />
              </footer>
            )}
          </article>
        </div>
      </main>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
