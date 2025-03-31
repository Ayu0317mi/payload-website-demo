import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { homeStatic } from '@/endpoints/seed/home-static'
import HomePageClient from './home.client'
import { SidebarLayout } from '@/components/SidebarLayout'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { generateMetadata } from './[slug]/page'


const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()
  const slug = 'home'
  const url = '/'

  let page: any = await queryPageBySlug({
    slug,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      <HomePageClient />
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {/* Hero section is full width, outside the sidebar layout */}
      <RenderHero {...hero} />
      
      {/* Main content wrapped in sidebar layout */}
      <SidebarLayout>
        <RenderBlocks blocks={layout} />
      </SidebarLayout>
    </article>
  )
}

export { generateMetadata }
