<template>
  <div
    flex="~ row lg:col"
    justify-evenly items-center
    py5 lg:px5
    border="t lg:r base"
    bg-black
  >
    <NuxtLink v-slot="{ isActive }" to="/" title="Home">
      <div
        text-2xl
        :class="isActive ? 'i-ph-house-fill text-primary' : 'i-ph-house'"
      />
    </NuxtLink>
    <NuxtLink v-slot="{ isActive }" to="/movie" title="Movies">
      <div
        text-2xl
        :class="isActive ? 'i-ph-film-strip-fill text-primary' : 'i-ph-film-strip'"
      />
    </NuxtLink>
    <NuxtLink v-slot="{ isActive }" to="/tv" title="TV Shows">
      <div
        text-2xl
        :class="isActive ? 'i-ph-television-simple-fill text-primary' : 'i-ph-television-simple'"
      />
    </NuxtLink>
    <NuxtLink v-slot="{ isActive }" to="/search" title="Search">
      <div
        text-2xl
        :class="isActive ? 'i-ph-magnifying-glass-fill text-primary' : 'i-ph-magnifying-glass'"
      />
    </NuxtLink>
  </div>
</template>
