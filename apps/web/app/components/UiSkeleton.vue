<template>
  <span
    class="ui-skeleton"
    :class="[`ui-skeleton--${variant}`, { 'ui-skeleton--block': block }]"
    :style="styleVars"
    :aria-hidden="true"
  />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    variant?: 'text' | 'title' | 'avatar' | 'rect'
    block?: boolean
    radius?: string
  }>(),
  {
    width: '100%',
    height: '0.9rem',
    variant: 'text',
    block: true,
    radius: '',
  },
)

const styleVars = computed(() => ({
  width: props.width,
  height: props.height,
  ...(props.radius ? { borderRadius: props.radius } : {}),
}))
</script>
