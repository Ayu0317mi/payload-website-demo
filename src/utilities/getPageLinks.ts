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


    const navPages = pages.docs.filter(page => {
      return page.settings?.showInNav === true;
    });

    // Create links from pages that should be shown in navigation
    const links = navPages.length > 0 
      ? navPages.map(page => ({
          label: page.title || 'Untitled Page',
          url: page.slug === 'home' ? '/' : `/${page.slug}`,
        }))
      // Fallback to all pages if no nav pages found
      : pages.docs.map(page => ({
          label: page.title || 'Untitled Page',
          url: page.slug === 'home' ? '/' : `/${page.slug}`,
        }));

    links.push({
      label: 'Posts',
      url: '/posts',
    });

    // First, find and remove the Home link
    const homeIndex = links.findIndex(link => link.url === '/');
    const homeLink = homeIndex !== -1 ? links.splice(homeIndex, 1)[0] : { label: 'Home', url: '/' };
    
    return [homeLink, ...links];
  } catch (error) {
    console.error('Error fetching page links:', error);

    return [
      { label: 'Home', url: '/' },
      { label: 'Posts', url: '/posts' },
    ];
  }
})