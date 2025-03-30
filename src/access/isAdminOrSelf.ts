export const isAdminOrSelf = ({ req: { user } }: any) => {
    // Need to be logged in
    if (user) {
      // If user has role of 'admin'
      if (user.role === 'admin') {  
        return true;
      }
  
      // If any other type of user, only provide access to themselves
      return {
        id: {
          equals: user.id,
        }
      }
    }
  
    // Reject everyone else
    return false;
  }