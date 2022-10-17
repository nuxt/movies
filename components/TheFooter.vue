<template>
  <footer p="y15 x15" flex="~ col gap1">
    <div row items-center gap2 my2>
      <img src="/movies-sm.webp" width="25" height="25" alt="Logo">
      <div text-lg>
        Nuxt Movies
      </div>
    </div>
    <div row items-center gap2 my2>
      <div op50 text-sm>
        Made with
      </div>
      <a href="https://v3.nuxtjs.org/" target="_blank" title="Nuxt 3">
        <IconNuxt3 h6 />
      </a>
    </div>
    <div gap2 my1>
      <p text-true-gray:90 text-sm>
        Data provided by&nbsp;
        <a op100 target="_blank" href="https://www.themoviedb.org/" title="The Movie Database" rel="noopener" n-link-text>
          <IconTMDB inline h4 />
        </a>
      </p>
      <p text-true-gray:90 text-sm>
        This project uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
    </div>
    <div>
      <a href="https://vercel.com" rel="noopener" target="_blank" aria-label="go to vercel">
        <IconVercel alt="Vercel" />
      </a>
    </div>
    <div my3>
      <ExternalLinks
        :links="{
          twitter_id: 'nuxt_js',
          github_id: 'nuxt/movies',
        }"
      />
    </div>
  </footer>
</template>
