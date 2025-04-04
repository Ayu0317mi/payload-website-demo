import type { Metadata } from 'next'
import { Clock } from 'lucide-react'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { Media } from '@/components/Media'
import { SidebarWrapper } from '@/components/SidebarWrapper'
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
import ResponsiveHero from './ResponsiveHero.client'
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
    <article className="pt-8 pb-16">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <article className="max-w-4xl mx-auto">
            <header className="mb-12 flex flex-col items-center text-center">
              {post.categories && post.categories.length > 0 && (
                <div className="categories mb-4">
                  {post.categories.map((category, index) => {
                    if (typeof category === 'object' && category !== null) {
                      return (
                        <span key={category.id} className="capitalize text-sm text-muted-foreground">
                          {category.title}
                          {index < (post.categories?.length || 0) - 1 ? ' • ' : ''}
                        </span>
                      )
                    }
                    return null
                  })}
                </div>
              )}
              
              <h1 className="mb-8 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">{post.title}</h1>
              
              {post.meta?.description && (
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                  {post.meta.description}
                </p>
              )}

              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center justify-center gap-12 text-base">
                  {post.populatedAuthors && post.populatedAuthors.length > 0 && (
                    post.populatedAuthors.map((author, index) => (
                      <figure key={index} className="flex items-center gap-2">
                        <div className="rounded-full w-11 h-11 bg-muted flex items-center justify-center">
                          {author?.name?.[0]?.toUpperCase() || '?'}
                        </div>
                        <span className="font-medium">{author.name}</span>
                      </figure>
                    ))
                  )}
                </div>

                <div className="flex items-center divide-x divide-border text-sm text-muted-foreground">
                  {post.publishedAt && (
                    <time dateTime={post.publishedAt} className="pr-2">
                      {formatDateTime(post.publishedAt)}
                    </time>
                  )}
                  <div className="pl-2 flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{calculateReadTime(post.content)}</span>
                  </div>
                </div>
              </div>
            </header>
          </article>
        </div>

        {post.heroImage && typeof post.heroImage === 'object' && (
          <ResponsiveHero media={post.heroImage} />
        )}

        <SidebarWrapper>
          <article>
            <div className="prose prose-lg max-w-none [&>p:first-child]:text-2xl [&>p:first-child]:font-light">
              <RichText data={post.content} enableGutter={false} />
            </div>

            {post.relatedPosts && post.relatedPosts.length > 0 && (
              <footer className="mt-16 pt-8 border-t">
                <RelatedPosts
                  className="mt-12"
                  docs={post.relatedPosts.filter((post) => typeof post === 'object')}
                />
              </footer>
            )}
          </article>
        </SidebarWrapper>
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
