export function parseISOString(s: string | Date) {
  if (typeof s !== 'string') return
  const b: string[] = s.split(/\D+/)
  const year = parseInt(b[0])
  const month = parseInt(b[1]) - 1
  const day = parseInt(b[2])
  const hour = parseInt(b[3] || '0')
  const minute = parseInt(b[4] || '0')
  const second = parseInt(b[5] || '0')
  const millisecond = parseInt(b[6] || '0')

  // Return the correctly parsed UTC date
  return new Date(Date.UTC(year, month, day, hour, minute, second, millisecond))
}
