import type { Access } from 'payload'

export const isSelfOnly: Access = ({ req }) => {
  // Need to be logged in
  if (req.user) {
    // If user has role of 'user' (not admin or author)
    if (req.user.role === 'user') {
      // Only provide access to themselves
      return {
        id: {
          equals: req.user.id,
        }
      }
    }
  }

  // Reject everyone else
  return false;
}