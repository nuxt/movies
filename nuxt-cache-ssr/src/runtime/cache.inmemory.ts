// import LRU from 'lru-cache';
import { caching } from 'cache-manager'

import { options } from '#cache-ssr-options'

const DefaultOptionsLRU = {
    max: 500,
    ttl: 1000 * 60,
}
interface InMemory {
    initialized:boolean
}
class InMemoryCache {
    cached:any;

    constructor(options = {}) {
        // this.cache = new LRU({ ...DefaultOptionsLRU, ...options })
        this.cached = {}
    }

   async get(key) {
     
        // return this.cache.get(key)
        const result = await this.cached.get(key)
        console.log(this.cached.store.keys())
        return result
    }

   async set(key, value) {

        // this.cache.set(key, value)
        await this.cached.set(key, value)
    }

    async init () {
        this.cached = await caching('memory', {
          max: 500,
          ttl: 1000 * 60 * 180 // 3 hours
        })
      }

    // has(key) {
    //     return this.cache.has(key)
    // }

}

let lruOptions = {};
if(options.LRU){
    lruOptions = {...options.LRU}
}

export default new InMemoryCache()