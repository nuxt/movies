export function getRequestQuery(searchParams: URLSearchParams) {
  const query: Record<string, string | string[]> = Object.create(null)

  for (const [key, value] of searchParams) {
    const current = query[key]
    if (current === undefined)
      query[key] = value
    else if (Array.isArray(current))
      current.push(value)
    else
      query[key] = [current, value]
  }

  return query
}
