import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

export const getPageLinks = cache(async () => {
  const payload = await getPayload({ config: configPromise })
  
  try {
    // First try to get pages with navigation setting
    const pages = await payload.find({
      collection: 'pages',
      limit: 50,
      depth: 1,
      draft: false,
      pagination: false,
      where: {
        and: [
          {
            _status: {
              equals: 'published',
            },
          },
        ],
      },
      sort: 'title',
    })

    // Filter pages that should be shown in navigation
    const navPages = pages.docs.filter(page => {
      return page.settings?.showInNav === true;
    });

    // Create links from pages that should be shown in navigation
    let links = navPages.length > 0 
      ? navPages.map(page => ({
          label: page.title || 'Untitled Page',
          url: page.slug === 'home' ? '/' : `/${page.slug}`,
        }))
      // Fallback to all pages if no nav pages found
      : pages.docs.map(page => ({
          label: page.title || 'Untitled Page',
          url: page.slug === 'home' ? '/' : `/${page.slug}`,
        }));

    // Add a link to the Posts collection
    links.push({
      label: 'Posts',
      url: '/posts',
    });

    // Sort the links alphabetically by label
    return links.sort((a, b) => a.label.localeCompare(b.label));
  } catch (error) {
    console.error('Error fetching page links:', error);
    // Return default links if there's an error
    return [
      { label: 'Home', url: '/' },
      { label: 'Posts', url: '/posts' },
    ];
  }
})