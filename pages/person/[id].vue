<script setup lang="ts">
const id = $(useRouteParam<string>('id'))
const person = await useServerFunctions().getPerson(id)
</script>

<template>
  <div>
    <PersonDetails :item="person" />
    <pre>
      {{ person }}
    </pre>
  </div>
</template>
