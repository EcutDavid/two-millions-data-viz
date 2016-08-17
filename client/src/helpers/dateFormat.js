const monthNames = [
  'January', 'February', 'March',
  'April', 'May', 'June', 'July',
  'August', 'September', 'October',
  'November', 'December'
]

export function formatDate(srcHour) {
  const date = new Date(srcHour * 60 * 60 * 1000)
  const day = date.getDate()
  const monthIndex = date.getMonth()
  const hour = date.getHours()
  return `${day}, ${monthNames[monthIndex]}, ${hour > 12 ? (hour - 12 + 'PM') : (hour + 'AM')}`
}
