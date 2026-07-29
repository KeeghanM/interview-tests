export function formatOpenedAt(value: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(value))
}

export function titleCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
