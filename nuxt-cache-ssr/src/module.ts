import { defineNuxtModule,addPluginTemplate,addPlugin, createResolver, addServerHandler,addTemplate } from '@nuxt/kit'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
export interface ModuleOptions {
  addPlugin: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'my-module',
    configKey: 'myModule'
  },
  setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    nuxt.options.build.transpile.push(resolve('./runtime'))
 
    nuxt.hook('nitro:config', (nitro) => {
     nitro.virtual = nitro.virtual || {}
     nitro.virtual['#cache-ssr-options'] = `export const options = ${JSON.stringify(options, null, 2)}`
      nitro.plugins = nitro.plugins || []
      nitro.plugins.push(resolve('runtime/cache.nitro'))
    })
  
    addServerHandler({
      handler: resolve("runtime/cache.middleware")
    })
  }
})
