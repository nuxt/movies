
import InMemoryCache from './cache.inmemory'
import { options } from '#cache-ssr-options'
import {isUrlCacheable} from './cache.utils'


export default fromNodeMiddleware(async (req, res,next) => {
  const {url} = req
  console.log("BGVVVV")
  if(!isUrlCacheable(req,options.pages)){
    next()
  }else{
    const cachedRes = await InMemoryCache.get(url)
    res.setHeader("x-cached-nuxt",`${cachedRes?.statusCode?.toString()} url: ${url}` )
    if (!cachedRes) {
      next()
    } else {
      res.writeHead(200, { ...cachedRes.headers, 'x-ssr-cache': 'Hit!!!' });
      res.end(cachedRes.body)
    }
  }
    
  })