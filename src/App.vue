<script setup lang="ts">
import { RouterView } from 'vue-router'

import { useHead } from '@vueuse/head'

useHead({
  title: 'Aplikasi Deteksi GERD',
  meta: [
    {
      name: 'description',
      content: 'Aplikasi Deteksi GERD',
    },
  ],
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
