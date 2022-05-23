<script setup lang="ts">
import type { Person } from '~/types'

defineProps<{
  item: Person
}>()
</script>

<template>
  <div px16 gap6>
    {{ item }}
  </div>
</template>
