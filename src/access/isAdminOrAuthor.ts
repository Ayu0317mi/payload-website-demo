import type { Access } from 'payload'

export const isAdminOrAuthor: Access = ({ req }) => {
  // Need to be logged in
  if (req.user) {
    // If user has role of 'admin' or 'author'
    if (req.user.role === 'admin' || req.user.role === 'author') {
      return true;
    }
  }

  // Reject everyone else
  return false;
}