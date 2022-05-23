<template>
  <footer p="y15 x15" flex="~ col gap1">
    <p text-true-gray:70 text-sm>
      <!-- TODO: should change the copyright name -->
      &copy; {{ new Date().getFullYear() }} The Nuxt Movies authors. All rights reserved.&nbsp;
      <a target="_blank" href="https://jason.codes/cookie-policy" rel="noopener" n-link-text>
        Cookie Policy
      </a>
    </p>
    <p text-true-gray:70 text-sm>
      Designed and built by the Nuxt Movies authors, data provided by&nbsp;
      <a target="_blank" href="https://www.themoviedb.org/" rel="noopener" n-link-text>
        TMDB
      </a>
    </p>

    <ExternalLinks
      :links="{
        twitter_id: 'nuxt_js',
        github_id: 'nuxt/nuxt3-movies',
        homepage: 'https://v3.nuxtjs.org/',
      }"
    />
  </footer>
</template>
