<template>
  <footer p="y15 x15" flex="~ col gap1">
    <p op50 text-sm>
      <!-- TODO: should change the copyright name -->
      &copy; {{ new Date().getFullYear() }} The Nuxt Movies authors. All rights reserved.&nbsp;
      <a target="_blank" href="https://jason.codes/cookie-policy" rel="noopener" underline op80 hover:op100>
        Cookie Policy
      </a>
    </p>
    <p op50 text-sm>
      Designed and built by the Nuxt Movies authors, data provided by&nbsp;
      <a target="_blank" href="https://www.themoviedb.org/" rel="noopener" underline op80 hover:op100>
        TMDB
      </a>
    </p>

    <!-- TODO: should change the owner's social links -->
    <div flex="~ row gap5" text-lg mt-5>
      <a
        href="https://twitter.com/jasonujmaalvis"
        target="_blank"
        aria-label="Link to Twitter account"
        rel="noopener"
        op50 hover:op100
      >
        <div i-simple-icons:twitter />
      </a>
      <a
        href="https://github.com/addyosmani/nuxt-movies"
        target="_blank"
        aria-label="Link to GitHub account"
        rel="noopener"
        op50 hover:op100
      >
        <div i-simple-icons:github />
      </a>

      <a
        href="https://www.linkedin.com/in/jason-ujma-alvis"
        target="_blank"
        aria-label="Link to LinkedIn account"
        rel="noopener"
        op50 hover:op100
      >
        <div i-simple-icons:linkedin />
      </a>

      <a
        href="mailto:hello@jason.codes"
        aria-label="Link to Email"
        rel="noopener"
        op50 hover:op100
      >
        <div i-fluent:mail-24-regular />
      </a>
    </div>
  </footer>
</template>
