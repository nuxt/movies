<template>
  <div class="fixed inset-0 z-[1000] flex items-center justify-center">
    <div class="z-0 fixed inset-0 bg-blur bg-[rgba(#8a2a0a,0.25)]" />
    <div class="z-1 bg-black px-6 py-2 rounded-lg">
      <img class="w-12 loader" src="/movies.webp" width="25" height="25" alt="Logo">
    </div>
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
