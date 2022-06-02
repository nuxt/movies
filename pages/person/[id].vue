<script setup lang="ts">
const id = $(useRouteParam<string>('id'))
const person = await useServerFunctions().getPerson(id)

useHead({
  title: person.name,
})
</script>

<template>
  <div>
    <PersonDetails :item="person" />
    <TheFooter />
  </div>
</template>
