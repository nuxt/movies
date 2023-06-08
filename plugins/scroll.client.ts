import { createRouterScroller } from 'vue-router-better-scroller'

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(createRouterScroller({
    selectors: {
      '#app-scroller': true,
    },
  }))
})
