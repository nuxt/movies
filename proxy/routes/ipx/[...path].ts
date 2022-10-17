import { createIPX, createIPXMiddleware } from 'ipx'

const ipx = createIPX({
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
  event.res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
  event.req.originalUrl = event.req.url = `/${event.context.params.path}`
  return ipxHandler(event)
})
