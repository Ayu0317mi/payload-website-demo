import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import FilterSection from './FilterSection.client'

type Args = {
  searchParams: Promise<{
    q?: string
    page?: string
    category?: string
  }>
}

// Change to 'auto' to allow dynamic rendering based on search params
export const dynamic = 'auto'
export const revalidate = 600

export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query, page, category } = await searchParamsPromise
  // Console log for debugging
  console.log('Category filter param:', category, typeof category)
  const payload = await getPayload({ config: configPromise })

  // Fetch categories for the filter
  const categoriesData = await payload.find({
    collection: 'categories',
    limit: 100,
  })
  
  const categories = categoriesData.docs.map(cat => ({
    id: cat.id,
    title: cat.title,
    slug: cat.slug,
  }))

  // Build the query conditions
  const queryConditions = [];
  
  if (query) {
    queryConditions.push({
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
    });
  }
  
  if (category) {
    console.log('Adding category filter for ID:', category);
    // This is the correct way to filter by relationship field with hasMany:true
    queryConditions.push({
      categories: {
        in: [category],
      },
    });
  }
  
  // Log the final query for debugging
  console.log('Final query conditions:', JSON.stringify(queryConditions));
  
  const posts = await payload.find({
    collection: 'posts',
    depth: 2, // Increase depth to get full category data
    limit: 12,
    page: page ? parseInt(page) : 1,
    where: {
      and: queryConditions,
    },
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      createdAt: true,
      authors: true, // Make sure authors are included for the CollectionArchive component
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
        <FilterSection categories={categories} />
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
