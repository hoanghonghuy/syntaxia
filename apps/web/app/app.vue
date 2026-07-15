<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <AppSnackbar />
</template>

<script setup lang="ts">
const { locale } = useI18n()

useHead({
  htmlAttrs: {
    lang: locale,
  },
})
</script>
