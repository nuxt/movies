// We cannot leverage vue-router scrollBehavior since the scroll is not on window
export default defineNuxtPlugin(() => {
  const nuxtApp = useNuxtApp()

  nuxtApp.hooks.hook('page:transition:finish', async () => {
    document.querySelector('[data-scroll]')?.scrollTo({ top: 9 })
  })
})
