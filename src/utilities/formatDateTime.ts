export const formatDateTime = (timestamp: string): string => {
  const now = new Date()
  let date = now
  if (timestamp) date = new Date(timestamp)

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const monthName = months[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()

  return `${monthName} ${day}, ${year}`
}
