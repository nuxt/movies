<script setup lang="ts">
import type { Genre, Item } from '~/types'
import { formatDate, formatLang, formatTime, numberWithCommas } from '~/composables/utils'

const { item } = defineProps<{
  item: Item
}>()

const directors = $computed(() => getDirectors(item))
</script>

<template>
  <div p4 gap6>
    <div v-if="item.overview">
      <h2 text-3xl mb4>
        Storyline
      </h2>

      <div op80 v-text="item.overview" />
    </div>

    <div text-sm op80>
      <ul grid="~ cols-[max-content_1fr] lg:cols-[max-content_1fr_max-content_1fr] gap3" items-center>
        <template v-if="item.release_date">
          <div>
            Released
          </div>
          <div>
            {{ formatDate(item.release_date) }}
          </div>
        </template>
        <template v-if="item.runtime">
          <div>
            Runtime
          </div>

          <div>
            {{ formatTime(item.runtime) }}
          </div>
        </template>
        <template v-if="directors">
          <div>
            Director
          </div>

          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="directors" />
        </template>
        <template v-if="item.budget">
          <div>
            Budget
          </div>

          <div>
            ${{ numberWithCommas(item.budget) }}
          </div>
        </template>
        <template v-if="item.revenue">
          <div>
            Revenue
          </div>

          <div>
            ${{ numberWithCommas(item.revenue) }}
          </div>
        </template>
        <template v-if="item.genres && item.genres.length">
          <div>
            Genre
          </div>

          <div flex="~ row wrap gap1">
            <NuxtLink
              v-for="genre of item.genres" :key="genre.id"
              :to="`/genre/${genre.id}/movie`"
              bg="gray/10 hover:gray/20" p="x2 y1"
              rounded text-xs
            >
              {{ genre.name }}
            </NuxtLink>
          </div>
        </template>
        <template v-if="item.status">
          <div>
            Status
          </div>

          <div>
            {{ item.status }}
          </div>
        </template>
        <template v-if="item.original_language">
          <div>
            Language
          </div>

          <div>
            {{ formatLang(item.original_language) }}
          </div>
        </template>
        <template v-if="item.production_companies && item.production_companies.length">
          <div>
            Production
          </div>

          <div>
            {{ item.production_companies.map(i => i.name).join(', ') }}
          </div>
        </template>
      </ul>
    </div>

    <div v-if="item.external_ids">
      <ExternalLinks :links="item.external_ids" />
    </div>
  </div>
</template>
