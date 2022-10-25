import LRU from 'lru-cache';
import { options } from '#cache-ssr-options'

const DefaultOptionsLRU = {
    max: 500,
    ttl: 1000 * 60,
}
interface InMemory {
    initialized:boolean
}
class InMemoryCache {
    cache:any;

    constructor(options = {}) {
        this.cache = new LRU({ ...DefaultOptionsLRU, ...options })
    }

    get(key) {
     
        return this.cache.get(key)
    }

    set(key, value) {

        this.cache.set(key, value)
    }

    has(key) {
        return this.cache.has(key)
    }

}

let lruOptions = {};
if(options.LRU){
    lruOptions = {...options.LRU}
}

export default new InMemoryCache(lruOptions)