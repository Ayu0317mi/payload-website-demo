import type { Access } from 'payload'

export const isAdminOrSelf: Access = ({ req }) => {
  // Need to be logged in
  if (req.user) {
    // If user has role of 'admin'
    if (req.user.role === 'admin') {
      return true;
    }

    // If any other type of user, only provide access to themselves
    return {
      id: {
        equals: req.user.id,
      }
    }
  }

  // Reject everyone else
  return false;
}