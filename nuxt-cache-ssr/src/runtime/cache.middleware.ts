
import InMemoryCache from './cache.inmemory'
import { options } from '#cache-ssr-options'
import {isUrlCacheable} from './cache.utils'


export default fromNodeMiddleware((req, res,next) => {
  const {url} = req
  
  if(!isUrlCacheable(req,options.pages)){
    next()
  }else{
    const cachedRes = InMemoryCache.get(url)
    res.setHeader("x-cached-nuxt",`${cachedRes?.statusCode?.toString()}` )
    if (!cachedRes) {
      next()
    } else {
      res.writeHead(200, { ...cachedRes.headers, 'x-ssr-cache': 'Hit!!!' });
      res.end(cachedRes.body)
    }
  }
    
  })