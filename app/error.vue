<script setup>
const props = defineProps({
  error: Object,
})

const message = computed(() => String(props.error?.message || ''))
const is404 = computed(() => props.error?.statusCode === 404 || message.value?.includes('404'))
const isDev = process.dev

function handleError() {
  return clearError({ redirect: '/' })
}
</script>

<template>
  <NuxtLayout>
    <div flex="~ col" h-screen text-center items-center justify-center gap4>
      <div text-3xl>
        {{ is404 ? 'This page could not be found' : 'An error occurred' }}
      </div>
      <div text-xl op50>
        Looks like you've followed a broken link or entered a URL that doesn't exist on this site.
      </div>
      <pre v-if="isDev">{{ error }}</pre>
      <button n-link border px4 py1 rounded @click="handleError">
        Go Back
      </button>
    </div>
  </NuxtLayout>
</template>
