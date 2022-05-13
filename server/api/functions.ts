import { getQuery } from 'ufo'
import * as functions from '../functions'

export default defineEventHandler(async (event) => {
  let name: string | undefined
  let args: any[] = []

  if (event.req.method === 'POST') {
    const body = await useBody(event)
    name = body.name
    args = body.args || []
  }
  else {
    const query = getQuery(event.req.url!) as Record<string, string>
    name = query.name
    args = JSON.parse(query.args || '[]') || []
  }

  if (!name || !(name in functions)) {
    event.res.statusCode = 404
    return
  }
  // @ts-expect-error ignore
  // eslint-disable-next-line import/namespace
  const result = await functions[name](...args)
  return result
})
