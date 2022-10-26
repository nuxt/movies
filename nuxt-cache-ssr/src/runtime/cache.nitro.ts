// import InMemoryCache  from '../../InMemory'
import InMemoryCache from './cache.inmemory'
import { options } from '#cache-ssr-options'
import {isUrlCacheable} from './cache.utils'


export default defineNitroPlugin( async (nitroApp) => {
 await InMemoryCache.init()
  nitroApp.hooks.hook('render:response', async (response, {event}) => {
      const isCacheable = isUrlCacheable(event.req,options.pages)
      event.res.setHeader("x-bgv-url",`${event.req.url}`)
      event.res.setHeader("x-bgv-Cacheable",`${isCacheable}`)
      event.res.setHeader("x-bgv-statusCode1",`${response?.statusCode}`)

      if(isCacheable && response.statusCode === 200){
        event.res.setHeader("x-bgv-statusCode","true")
        const key = event.req.url
    const preStoredKeys = await InMemoryCache.cached?.store?.keys()

       await InMemoryCache.set(key,response)
    const postStoredKeys = await InMemoryCache.cached?.store?.keys()
    event.res.setHeader("x-pre-stored-key",`${preStoredKeys}`)
    event.res.setHeader("x-post-stored-key",`${postStoredKeys}`)

      }
      
  })
})