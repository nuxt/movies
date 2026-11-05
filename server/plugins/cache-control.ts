// The `cache` route rule only turns on payload extraction, which `<NuxtLink>` prefetching needs.
// Pages depend on the locale cookie, so keep them out of shared caches: no-store for HTML, and a
// short browser-only cache for payloads so a prefetched payload is reused when navigating.
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:response', (response) => {
    response.headers ||= {}
    response.headers['cache-control'] = response.headers['content-type']?.startsWith('text/html')
      ? 'private, no-store'
      : 'private, max-age=120'
  })
})
