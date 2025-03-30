import type { Access, FieldAccess } from 'payload'

export const isAdmin: Access = ({ req }) => {
  // Check the role field as defined in your Users collection
  return Boolean(req.user?.role === 'admin')
}

export const isAdminFieldLevel: FieldAccess = ({ req }) => {
  // Check the role field as defined in your Users collection
  return Boolean(req.user?.role === 'admin')
}