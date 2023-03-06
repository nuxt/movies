<script setup lang="ts">
import type { Person } from '~/types'
import { formatDate } from '~/composables/utils'

const props = defineProps<{
  item: Person
}>()

const externalIds = computed(() => ({ ...props.item.external_ids, homepage: props.item.homepage }))
</script>

<template>
  <div p4 grid="~ md:cols-[max-content_1fr]" gap-8 items-center ma max-w-300>
    <NuxtImg
      v-if="props.item.profile_path"
      width="400"
      height="600"
      format="webp"
      :src="`/tmdb${props.item.profile_path}`"
      :alt="props.item.name"
      block border="4 gray4/10" w-70 md:90 self-start mt-5 mx-auto
      transition duration-400 object-cover aspect="3/4"
    />
    <div p4 gap8>
      <div>
        <h2 text-3xl mb4>
          {{ props.item.name }}
        </h2>

        <div v-if="props.item.biography" font-sans ws-pre-wrap op80 leading-relaxed v-text="props.item.biography" />
        <div v-else op50 italic>
          {{ $t('(no biography)') }}
        </div>
      </div>

      <div text-sm op80>
        <ul grid="~ cols-[max-content_1fr] gap3" items-center>
          <template v-if="props.item.known_for_department">
            <div op60>
              {{ $t('Known for') }}
            </div>
            <div>
              {{ props.item.known_for_department }}
            </div>
          </template>
          <template v-if="props.item.place_of_birth">
            <div op60>
              {{ $t('Place of birth') }}
            </div>
            <div>
              {{ props.item.place_of_birth }}
            </div>
          </template>

          <template v-if="props.item.birthday">
            <div op60>
              {{ $t('Birthday') }}
            </div>
            <div>
              {{ formatDate(props.item.birthday) }}
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
