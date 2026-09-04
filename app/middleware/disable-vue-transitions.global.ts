export default defineNuxtRouteMiddleware((to) => {
  if (typeof document !== 'undefined' && !document.startViewTransition)
    return

  // Disable built-in Vue transitions
  // to.meta.pageTransition = false
  to.meta.layoutTransition = false
})
