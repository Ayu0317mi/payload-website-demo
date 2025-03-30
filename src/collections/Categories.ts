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
