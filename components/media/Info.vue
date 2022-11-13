<script setup lang="ts">
import type { Media, MediaType } from '~/types'
import { formatDate, formatLang, formatTime, numberWithCommas } from '~/composables/utils'
import { TMDB_IMAGE_BASE_THUMBNAIL } from '~/constants/images'

const { item } = defineProps<{
  item: Media
  type: MediaType
}>()

const externalIds = $computed(() => ({ ...item.external_ids, homepage: item.homepage }))
const directors = $computed(() => item.credits?.crew.filter(person => person.job === 'Director'))
</script>

<template>
  <div p4 grid="~ cols-[max-content_1fr]" gap-8 items-center ma max-w-300>
    <NuxtImg
      width="400"
      height="600"
      format="webp"
      :src="`/tmdb${item.poster_path}`"
      :alt="item.title || item.name"
      block border="4 gray4/10" w-79 lt-md:hidden
      transition duration-400 object-cover aspect="10/16"
    />
    <div lt-md:w="[calc(100vw-2rem)]" flex="~ col" md:p4 gap6>
      <div v-if="item.overview">
        <h2 text-3xl mb4>
          {{ $t('Storyline') }}
        </h2>
        <div op80 v-text="item.overview" />
      </div>

      <div text-sm op80>
        <ul grid="~ cols-[max-content_1fr] lg:cols-[max-content_1fr_max-content_1fr] gap3" items-center>
          <template v-if="item.release_date">
            <div>
              {{ $t('Release Date') }}
            </div>
            <div>
              {{ formatDate(item.release_date) }}
            </div>
          </template>
          <template v-if="item.runtime">
            <div>
              {{ $t('Runtime') }}
            </div>

            <div>
              {{ formatTime(item.runtime) }}
            </div>
          </template>
          <template v-if="directors?.length">
            <div>
              {{ $t('Director') }}
            </div>

            <div flex="~ row wrap gap1">
              <NuxtLink
                v-for="person of directors"
                :key="person.id"
                :to="`/person/${person.id}`"
                bg="gray/10 hover:gray/20" p="x2 y1"
                rounded text-xs
              >
                {{ person.name }}
              </NuxtLink>
            </div>
          </template>
          <template v-if="item.budget">
            <div>
              {{ $t('Budget') }}
            </div>

            <div>
              ${{ numberWithCommas(item.budget) }}
            </div>
          </template>
          <template v-if="item.revenue">
            <div>
              {{ $t('Revenue') }}
            </div>

            <div>
              ${{ numberWithCommas(item.revenue) }}
            </div>
          </template>
          <template v-if="item.genres && item.genres.length">
            <div>
              {{ $t('Genre') }}
            </div>

            <div flex="~ row wrap gap1">
              <NuxtLink
                v-for="genre of item.genres" :key="genre.id"
                :to="`/genre/${genre.id}/${type}`"
                bg="gray/10 hover:gray/20" p="x2 y1"
                rounded text-xs
              >
                {{ genre.name }}
              </NuxtLink>
            </div>
          </template>
          <template v-if="item.status">
            <div>
              {{ $t('Status') }}
            </div>

            <div>
              {{ item.status }}
            </div>
          </template>
          <template v-if="item.original_language">
            <div>
              {{ $t('Language') }}
            </div>

            <div>
              {{ formatLang(item.original_language) }}
            </div>
          </template>
          <template v-if="item.production_companies && item.production_companies.length">
            <div>
              {{ $t('Production') }}
            </div>

            <div>
              {{ item.production_companies.map(i => i.name).join(', ') }}
            </div>
          </template>
        </ul>
      </div>

      <div>
        <ExternalLinks :links="externalIds" />
      </div>
    </div>
  </div>
</template>
