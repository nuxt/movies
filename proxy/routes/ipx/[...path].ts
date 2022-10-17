import { createIPX, createIPXMiddleware } from 'ipx'

const ipx = createIPX({
  maxAge: 3600,
  alias: {
    '/tmdb': 'https://image.tmdb.org/t/p/original/',
    '/youtube': 'https://img.youtube.com/',
  },
  domains: [
    'image.tmdb.org',
    'img.youtube.com',
  ],
})

const ipxMiddleware = createIPXMiddleware(ipx)
const ipxHandler = fromNodeMiddleware(ipxMiddleware)

export default eventHandler((event) => {
  event.req.originalUrl = event.req.url = `/${event.context.params.path}`
  return ipxHandler(event)
})
