<template>
  <svg
    class="learn-footer-icon"
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <!-- Stacked path cards — tracks catalog -->
    <template v-if="name === 'tracks'">
      <path d="M4 6.5h16" />
      <path d="M4 12h16" />
      <path d="M4 17.5h10" />
      <circle cx="18.5" cy="17.5" r="1.25" fill="currentColor" stroke="none" />
    </template>
    <!-- Hamburger — open lesson list -->
    <template v-else-if="name === 'lessons'">
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </template>
    <!-- Magnifier — search -->
    <template v-else-if="name === 'search'">
      <circle cx="10.5" cy="10.5" r="5.5" />
      <path d="M15 15l4.5 4.5" />
    </template>
    <!-- Rising bars — progress -->
    <template v-else-if="name === 'progress'">
      <path d="M5 19V11" />
      <path d="M12 19V5" />
      <path d="M19 19v-7" />
    </template>
    <!-- Person — account / login -->
    <template v-else-if="name === 'account'">
      <circle cx="12" cy="8" r="3.25" />
      <path d="M5.5 19.5c1.4-3.2 3.7-4.75 6.5-4.75s5.1 1.55 6.5 4.75" />
    </template>
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  name: 'tracks' | 'lessons' | 'search' | 'progress' | 'account'
}>()
</script>
