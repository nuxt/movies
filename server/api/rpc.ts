import * as functions from '../rpc'

export default defineEventHandler(async (event) => {
  const body = await useBody(event)
  const { method = '', args = [] } = body
  if (!(method in functions)) {
    event.res.statusCode = 404
    return
  }
  // @ts-expect-error ignore
  // eslint-disable-next-line import/namespace
  const result = await functions[method](...args)
  return result
})
