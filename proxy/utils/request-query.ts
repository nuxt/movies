import type { H3Event } from 'h3'

export function getRequestQuery(event: H3Event) {
  const rawUrl = event.node.req.originalUrl || event.node.req.url || ''
  const searchParams = new URL(rawUrl, 'http://localhost').searchParams
  const query: Record<string, string | string[]> = {}

  for (const [key, value] of searchParams) {
    const current = query[key]
    query[key] = current === undefined
      ? value
      : Array.isArray(current) ? [...current, value] : [current, value]
  }

  return query
}
