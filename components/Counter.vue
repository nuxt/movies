<script setup lang='ts'>
const { count, inc, dec } = useCount()
</script>

<template>
  <div inline-flex m="y-3">
    <button btn p-2 rounded-full @click="dec()">
      <div i-carbon-subtract />
    </button>
    <div font="mono" w="15" m-auto inline-block>
      {{ count }}
    </div>
    <button btn p-2 rounded-full @click="inc()">
      <div i-carbon-add />
    </button>
  </div>
</template>
