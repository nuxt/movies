<script setup lang="ts">
import type { Person } from '~/types'
import { formatDate } from '~/composables/utils'
import { TMDB_IMAGE_BASE_THUMBNAIL } from '~/constants/images'

const { item } = defineProps<{
  item: Person
}>()

const externalIds = $computed(() => ({ ...item.external_ids, homepage: item.homepage }))
</script>

<template>
  <div p4 grid="~ md:cols-[max-content_1fr]" gap-8 items-center ma max-w-300>
    <NuxtImg
      v-if="item.profile_path"
      width="400"
      height="600"
      format="webp"
      :src="`/tmdb${item.profile_path}`"
      :alt="item.name"
      block border="4 gray4/10" w-70 md:90 self-start mt-5 mx-auto
      transition duration-400 object-cover aspect="3/4"
    />
    <div p4 gap8>
      <div>
        <h2 text-3xl mb4>
          {{ item.name }}
        </h2>

        <div v-if="item.biography" font-sans ws-pre-wrap op80 leading-relaxed v-text="item.biography" />
        <div v-else op50 italic>
          {{ $t('(no biography)') }}
        </div>
      </div>

      <div text-sm op80>
        <ul grid="~ cols-[max-content_1fr] gap3" items-center>
          <template v-if="item.known_for_department">
            <div op60>
              {{ $t('Known for') }}
            </div>
            <div>
              {{ item.known_for_department }}
            </div>
          </template>
          <template v-if="item.place_of_birth">
            <div op60>
              {{ $t('Place of birth') }}
            </div>
            <div>
              {{ item.place_of_birth }}
            </div>
          </template>

          <template v-if="item.birthday">
            <div op60>
              {{ $t('Birthday') }}
            </div>
            <div>
              {{ formatDate(item.birthday) }}
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
