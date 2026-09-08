<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

async function updateLocale(event: Event) {
  const selectedLocale = (event.currentTarget as HTMLSelectElement).value as typeof locale.value
  await setLocale(selectedLocale)
}
</script>

<template>
  <div flex gap2 items-center mt-5>
    {{ $t('Language') }}:
    <select id="langSwitcher" :value="locale" rounded-md text-sm p-1 @change="updateLocale">
      <option v-for="loc in locales" :key="loc.code" :value="loc.code" p-1>
        {{ loc.name }}
      </option>
    </select>
  </div>
</template>
