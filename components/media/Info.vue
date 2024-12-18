<script setup lang="ts">
import type { Media, MediaType } from '~/types'
import { formatDate, formatLang, formatTime, numberWithCommas } from '~/composables/utils'

const props = withDefaults(defineProps<{
  item: Media
  type: MediaType
}>(), {
  item: () => ({} as Media),
  type: 'movie',
})

const externalIds = computed(() => ({ ...props.item.external_ids, homepage: props.item.homepage }))
const directors = computed(() => props.item.credits?.crew.filter(person => person.job === 'Director'))
</script>

<template>
  <div p4 grid="~ cols-[max-content_1fr]" gap-8 items-center ma max-w-300>
    <NuxtImg
      width="400"
      height="600"
      format="webp"
      :src="`/tmdb${props.item.poster_path}`"
      :alt="props.item.title || props.item.name"
      block border="4 gray4/10" w-79 lt-md:hidden
      transition duration-400 object-cover aspect="10/16"
      :style="{ 'view-transition-name': `item-${props.item.id}` }"
    />
    <div lt-md:w="[calc(100vw-2rem)]" flex="~ col" md:p4 gap6>
      <div v-if="props.item.overview">
        <h2 text-3xl mb4>
          {{ $t('Storyline') }}
        </h2>
        <div op80 v-text="props.item.overview" />
      </div>

      <div text-sm op80>
        <ul grid="~ cols-[max-content_1fr] lg:cols-[max-content_1fr_max-content_1fr] gap3" items-center>
          <template v-if="props.item.release_date">
            <div>
              {{ $t('Release Date') }}
            </div>
            <div>
              {{ formatDate(props.item.release_date) }}
            </div>
          </template>
          <template v-if="props.item.runtime">
            <div>
              {{ $t('Runtime') }}
            </div>

            <div>
              {{ formatTime(props.item.runtime) }}
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
          <template v-if="props.item.budget">
            <div>
              {{ $t('Budget') }}
            </div>

            <div>
              ${{ numberWithCommas(props.item.budget) }}
            </div>
          </template>
          <template v-if="props.item.revenue">
            <div>
              {{ $t('Revenue') }}
            </div>

            <div>
              ${{ numberWithCommas(props.item.revenue) }}
            </div>
          </template>
          <template v-if="props.item?.genres?.length">
            <div>
              {{ $t('Genre') }}
            </div>

            <div flex="~ row wrap gap1">
              <NuxtLink
                v-for="genre of props.item.genres" :key="genre.id"
                :to="`/genre/${genre.id}/${type}`"
                bg="gray/10 hover:gray/20" p="x2 y1"
                rounded text-xs
              >
                {{ genre.name }}
              </NuxtLink>
            </div>
          </template>
          <template v-if="props.item.status">
            <div>
              {{ $t('Status') }}
            </div>

            <div>
              {{ props.item.status }}
            </div>
          </template>
          <template v-if="props.item.original_language">
            <div>
              {{ $t('Language') }}
            </div>

            <div>
              {{ formatLang(props.item.original_language) }}
            </div>
          </template>
          <template v-if="props.item?.production_companies?.length">
            <div>
              {{ $t('Production') }}
            </div>

            <div>
              {{ props.item.production_companies.map(i => i.name).join(', ') }}
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
