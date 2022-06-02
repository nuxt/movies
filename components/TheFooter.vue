<template>
  <footer p="y15 x15" flex="~ col gap1">
    <div row items-center gap2 my2>
      <img src="/favicon.png" width="25" height="25" alt="Logo">
      <div text-lg>
        Nuxt Movies
      </div>
      <div op50 ml2 text-sm>
        powered by
      </div>
      <a href="https://v3.nuxtjs.org/" target="_blank" title="Nuxt 3">
        <NuxtIcon h6 />
      </a>
    </div>
    <p text-true-gray:90 text-sm>
      <!-- TODO: should change the copyright name -->
      &copy; {{ new Date().getFullYear() }} The Nuxt Movies authors. All rights reserved.&nbsp;
      <a op100 target="_blank" href="https://jason.codes/cookie-policy" rel="noopener" n-link-text>
        Cookie Policy
      </a>
    </p>
    <p text-true-gray:90 text-sm>
      Designed and built by the Nuxt Movies authors, data provided by&nbsp;
      <a op100 target="_blank" href="https://www.themoviedb.org/" rel="noopener" n-link-text>
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
