// import InMemoryCache  from '../../InMemory'
import InMemoryCache from './cache.inmemory'
import { options } from '#cache-ssr-options'
import {isUrlCacheable} from './cache.utils'


export default defineNitroPlugin((nitroApp) => {
 
  nitroApp.hooks.hook('render:response', (response, {event}) => {
      const isCacheable = isUrlCacheable(event.req,options.pages)

      if(isCacheable && response.statusCode === 200){
        const key = event.req.url
        InMemoryCache.set(key,response)
      }
      
  })
})