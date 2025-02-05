<script setup lang="ts">
import type {MediaType} from "~/types";

definePageMeta({
  key: route => route.fullPath,
  validate: ({params}) => {
    return ["movie", "tv"].includes(params.type as MediaType);
  }
});

const loadingIndicator = useLoadingIndicator();
const route = useRoute();
const type = computed(() => (route.params.type as MediaType) || "movie");
const id = computed(() => route.params.id as string);

const [item, recommendations] = await Promise.all([getMedia(type.value, id.value), getRecommendations(type.value, id.value)]);
const $img = useImage();

useHead({
  title: item.name || item.title,
  meta: [
    {name: "description", content: item.overview},
    {property: "og:image", content: $img(`/tmdb${item.poster_path}`, {width: 1200, height: 630})}
  ]
});
</script>

<template>
  <div>
    <div v-if="loadingIndicator.isLoading.value" class="fixed inset-0 z-[1000] flex items-center justify-center">
      <div class="z-0 fixed inset-0 bg-blur bg-[rgba(#8a2a0a,0.25)]" />
      <div class="z-1 bg-black px-6 py-2 rounded-lg">
        <img class="w-12 loader" src="/movies.webp" width="25" height="25" alt="Logo" />
      </div>
    </div>
    <MediaHero :item="item" />
    <MediaDetails :item="item" :type="type" />
    <CarouselBase v-if="recommendations?.results?.length">
      <template #title>
        {{ $t("More like this") }}
      </template>
      <MediaCard v-for="i of recommendations.results" :key="i.id" :item="i" :type="type" flex-1 w-40 md:w-60 />
    </CarouselBase>
    <TheFooter />
  </div>
</template>

<style>
.bg-blur {
  backdrop-filter: saturate(180%) blur(20px);
}
.loader {
  aspect-ratio: 1;
  animation:
    l3-1 2s infinite linear,
    l3-2 3s infinite steps(1) -0.5s;
}
@keyframes l3-1 {
  0% {
    transform: perspective(150px) rotateX(0deg) rotateY(0deg);
  }
  50% {
    transform: perspective(150px) rotateX(180deg) rotateY(0deg);
  }
  100% {
    transform: perspective(150px) rotateX(180deg) rotateY(180deg);
  }
}
</style>
