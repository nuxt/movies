<script setup lang="ts">
import type { Media, MediaType } from '~/types'

defineProps<{
  item: Media
  type: MediaType
}>()

const tab = $ref<'overview' | 'videos' | 'photos'>('overview')
</script>

<template>
  <div flex items-center justify-center gap8 py6>
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
  <MediaOverview v-if="tab === 'overview'" :item="item" :type="type" />
  <MediaVideos v-if="tab === 'videos'" :item="item" />
  <MediaPhotos v-if="tab === 'photos'" :item="item" />
</template>
