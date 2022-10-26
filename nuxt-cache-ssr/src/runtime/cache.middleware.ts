
import InMemoryCache from './cache.inmemory'
import { options } from '#cache-ssr-options'
import {isUrlCacheable} from './cache.utils'


export default fromNodeMiddleware(async (req, res,next) => {
  const {url} = req
  if(isUrlCacheable(req,options.pages)){
   const cachedRes = await InMemoryCache.get(url);
    // const storedKeys = await InMemoryCache.cached?.store?.keys()
    // res.setHeader("x-cached-nuxt",`${cachedRes?.statusCode?.toString()} storedKeys: ${storedKeys}` )
    if (cachedRes) {
      res.writeHead(200, { ...cachedRes.headers, 'x-ssr-cache': 'Hit!!!' });
      res.end(cachedRes.body)
    } 
  }
    
  })