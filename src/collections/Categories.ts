import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { isAdmin } from '../access/isAdmin'
import { isAdminOrAuthor } from '../access/isAdminOrAuthor'
import { slugField } from '@/fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: isAdminOrAuthor,
    delete: isAdminOrAuthor,
    read: anyone,
    update: isAdminOrAuthor,
  },
  admin: {
    useAsTitle: 'title',
    // Hide the Categories collection from users who aren't admin or author
    hidden: ({ user }) => {
      if (user && (user.role === 'admin' || user.role === 'author')) {
        return false; // Show to admins and authors
      }
      return true; // Hide from everyone else
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField(),
  ],
}
