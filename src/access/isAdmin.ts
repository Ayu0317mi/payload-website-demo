export const isAdmin = ({ req: { user } }: any) => {
    // Check the role field as defined in your Users collection
    return Boolean(user?.role === 'admin')
  }
  
  export const isAdminFieldLevel = ({ req: { user } }: any) => {
    // Check the role field as defined in your Users collection
    return Boolean(user?.role === 'admin')
  }