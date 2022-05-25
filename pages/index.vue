<script setup lang="ts">
import Page from './[type]/index.vue'

definePageMeta({
  key: route => route.fullPath,
})
</script>

<template>
  <Page />
</template>
