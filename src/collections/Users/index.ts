import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { isAdmin } from '../../access/isAdmin'
import { isAdminOrSelf } from '../../access/isAdminOrSelf'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    // Only admins can create users
    create: isAdmin,
    // Admins can read all, but any other logged in user can only read themselves
    read: isAdminOrSelf,
    delete: isAdminOrSelf,
    update: isAdminOrSelf,
  },
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'user',
      options: [
        { label: 'User', value: 'user' },
        { label: 'Author', value: 'author' },
        { label: 'Admin', value: 'admin' },
      ],
      access: {
        // Only admins can update the role field
        update: ({ req }) => req?.user?.role === 'admin',
      },
      hooks: {
        beforeValidate: [
          ({ value, req, operation, originalDoc }) => {
            // For update operations, check role changes
            if (operation === 'update' && req?.user) {
              // Non-admins cannot change roles
              if (req.user.role !== 'admin' && originalDoc && value !== originalDoc.role) {
                // Return a validation error
                throw new Error('No permission to change role.');
              }
            }
            return value;
          },
        ],
      },
    },
  ],
  timestamps: true,
}