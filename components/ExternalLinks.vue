<script setup lang="ts">
import type { ExternalIds } from '~/types'

defineProps<{
  links: ExternalIds
}>()
</script>

<template>
  <div flex="~ row gap5" text-lg mt-5>
    <a
      v-if="links.twitter_id"
      :href="`https://twitter.com/${links.twitter_id}`"
      target="_blank"
      aria-label="Link to Twitter account"
      rel="noopener"
      op50 hover:op100
    >
      <div i-simple-icons:twitter />
    </a>
    <a
      v-if="links.facebook_id"
      :href="`https://www.facebook.com/${links.facebook_id}`"
      target="_blank"
      aria-label="Link to Facebook account"
      rel="noopener"
      op50 hover:op100
    >
      <div i-simple-icons:facebook />
    </a>
    <a
      v-if="links.instagram_id"
      :href="`https://instagram.com/${links.instagram_id}`"
      target="_blank"
      aria-label="Link to Instagram account"
      rel="noopener"
      op50 hover:op100
    >
      <div i-simple-icons:instagram />
    </a>
    <a
      v-if="links.imdb_id"
      :href="`https://www.imdb.com/movie/${links.imdb_id}`"
      target="_blank"
      aria-label="Link to IMDb account"
      rel="noopener"
      op50 hover:op100
    >
      <div i-cib:imdb />
    </a>
    <a
      v-if="links.github_id"
      :href="`https://github.com/${links.github_id}`"
      target="_blank"
      aria-label="Link to GitHub account"
      rel="noopener"
      op50 hover:op100
    >
      <div i-simple-icons:github />
    </a>
    <a
      v-if="links.linkedin_id"
      :href="`https://www.linkedin.com/in/${links.linkedin_id}`"
      target="_blank"
      aria-label="Link to LinkedIn account"
      rel="noopener"
      op50 hover:op100
    >
      <div i-simple-icons:linkedin />
    </a>
    <a
      v-if="links.email"
      :href="links.email"
      aria-label="Link to Email"
      rel="noopener"
      op50 hover:op100
    >
      <div i-fluent:mail-24-regular />
    </a>
    <a
      v-if="links.homepage"
      :href="links.homepage"
      aria-label="Link to Homepage"
      rel="noopener"
      op50 hover:op100
    >
      <div i-fluent:globe-24-regular />
    </a>
  </div>
</template>
