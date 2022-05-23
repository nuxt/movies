<script setup lang="ts">
import type { Media } from '~/types'

defineProps<{
  item: Media
}>()

const tab = $ref<'overview' | 'videos' | 'photos'>('overview')
</script>

<template>
  <div row items-center justify-center gap8 py6>
    <button n-tab :class="{ 'n-tab-active': tab === 'overview' }" @click="tab = 'overview'">
      Overview
    </button>
    <button n-tab :class="{ 'n-tab-active': tab === 'videos' }" @click="tab = 'videos'">
      Videos
    </button>
    <button n-tab :class="{ 'n-tab-active': tab === 'photos' }" @click="tab = 'photos'">
      Photos
    </button>
  </div>
  <MediaOverview v-if="tab === 'overview'" :item="item" />
</template>
