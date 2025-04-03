import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { PostSearch } from './PostSearch'

type Args = {
  searchParams: Promise<{
    q?: string
    page?: string
    category?: string
  }>
}

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query, page, category } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    page: page ? parseInt(page) : 1,
    where: {
      and: [
        ...(query
          ? [{
              or: [
                {
                  title: {
                    like: query,
                  },
                },
                {
                  'meta.description': {
                    like: query,
                  },
                },
                {
                  'meta.title': {
                    like: query,
                  },
                },
                {
                  'content.root.children.children.text': {
                    like: query,
                  },
                },
              ],
            }]
          : []),
        ...(category
          ? [{
              categories: {
                in: [category],
              },
            }]
          : []),
      ],
    },
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      createdAt: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Posts</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PostSearch />
      </div>

      {posts.totalDocs > 0 ? (
        <>
          <div className="container mb-8">
            <PageRange
              collection="posts"
              currentPage={posts.page}
              limit={12}
              totalDocs={posts.totalDocs}
            />
          </div>

          <CollectionArchive posts={posts.docs} />
        </>
      ) : (
        <div className="container">
          <p className="text-center text-gray-500 dark:text-gray-400">
            No posts found.
          </p>
        </div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Posts`,
  }
}
