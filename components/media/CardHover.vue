<script setup lang="ts">
import type {Media} from "~/types";

defineProps<{
  item: Media;
}>();
</script>

<template>
  <div absolute inset-0 class="z-[1000] bg-[#1F2021] rounded-md w-[calc(200%+8px)]" transition-all left-0>
    <div flex p-2 gap-2 items-center size-full class="*:h-full">
      <div class="w-[50%] h-full">
        <NuxtImg
          v-if="item.poster_path"
          width="400"
          height="600"
          format="webp"
          :src="`/tmdb${item.backdrop_path}`"
          :alt="item.title || item.name"
          w-full
          h-full
          object-cover
          :style="{'view-transition-name': `item-${item.id}${query?.query ? `-${query.query}` : ''}`}"
          placeholder="/tmdb.svg" />
        <div v-else h-full op10 flex>
          <div i-ph:question ma text-4xl />
        </div>
      </div>
      <div class="w-1/2" flex gap-2 flex-col h-full>
        <p text-2xl font-bold>
          {{ item.title || item.name }}
        </p>
        <p line-clamp-9 class="leading-[28px]">
          {{ item.overview }}
        </p>
        <p>
          Released
          {{ new Date(item.release_date).toLocaleDateString() }}
        </p>
        <div class="flex gap-1 flex-col">
          <div class="flex gap-1 items-center">
            <StarsRate w-20 :value="item.vote_average" />
            <span class="op50 text-sm">
              {{ formatVote(item.vote_average) }}
            </span>
          </div>
          <div class="op50 text-sm">
            {{ $t("{numberOfReviews} Reviews", {numberOfReviews: formatVote(item.vote_count)}) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
