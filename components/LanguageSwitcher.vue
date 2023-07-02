<script setup>
const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() => {
    return (locales.value)
})

const updateLocale = (event) => {
    setLocale(event.target.value)
    window.location.reload()
}

onMounted(() => {
    const langSwitcher = document.querySelector('#langSwitcher')
    langSwitcher.value = locale.value
})

</script>

<template>
    <div flex gap2 items-center mt-5>
        Language:
        <select id="langSwitcher" @change="updateLocale" rounded-md p-1>
            <option v-for="loc in availableLocales" :key="loc.code" :value="loc.code" p-1>
                {{ loc.name }}
            </option>
        </select>
    </div>
</template>
