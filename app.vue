<script setup>
import '@unocss/reset/antfu.css'

useHead({
  title: 'Movies',
  titleTemplate: '%s - Nuxt3 Movies',
  link: [
    {
      rel: 'icon', type: 'image/png', href: '/favicon.png',
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingBar />
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
  background: #111;
  color: white;
  color-scheme: dark;
}
</style>
