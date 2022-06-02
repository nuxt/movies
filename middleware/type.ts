export default defineNuxtRouteMiddleware((to) => {
  if (to.params.type && !['movie', 'tv'].includes(to.params.type as string))
    return abortNavigation('404')
})
