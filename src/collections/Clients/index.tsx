import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { isAdmin } from '../../access/isAdmin'
import { isAdminOrSelf } from '../../access/isAdminOrSelf'

const ClientsCollection: CollectionConfig = {
  slug: 'clients',
  access: {
    admin: authenticated,
    create: isAdmin,
    read: isAdminOrSelf,
    delete: isAdminOrSelf,
    update: isAdminOrSelf,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
    group: 'Admin',
  },
  auth: {
    tokenExpiration: 7200, // 2 hours
    verify: true,
    maxLoginAttempts: 5,
    lockTime: 600000, // 10 minutes
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'lastLoginDate',
      type: 'date',
      admin: {
        readOnly: true,
      },
    }
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data._status === 'published') {
          return {
            ...data,
            lastLoginDate: new Date().toISOString(),
          }
        }
        return data;
      }
    ],
  },
  timestamps: true,
}

export default ClientsCollection;