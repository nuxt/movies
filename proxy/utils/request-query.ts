export function getRequestQuery(searchParams: URLSearchParams) {
  const query: Record<string, string | string[]> = {}

  for (const [key, value] of searchParams) {
    const current = query[key]
    query[key] = current === undefined
      ? value
      : Array.isArray(current) ? [...current, value] : [current, value]
  }

  return query
}
