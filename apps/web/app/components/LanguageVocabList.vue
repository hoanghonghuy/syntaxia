<template>
  <section class="lang-vocab" :aria-label="t('lesson.vocab')">
    <p class="lang-vocab-label">{{ t('lesson.vocab') }}</p>
    <ul class="lang-vocab-list">
      <li v-for="item in items" :key="item.hanzi" class="lang-vocab-row">
        <span class="lang-hanzi" lang="zh-Hans">{{ item.hanzi }}</span>
        <span class="lang-pinyin">{{ item.pinyin }}</span>
        <span class="lang-gloss">{{ item.gloss }}</span>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { LanguageVocabItem } from '~/utils/languageLesson'

defineProps<{
  items: LanguageVocabItem[]
}>()

const { t } = useI18n()
</script>

<style scoped>
.lang-vocab {
  margin: 1.5rem 0;
  padding: 0;
}
.lang-vocab-label {
  margin: 0 0 0.5rem;
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-muted, #5b6b63);
}
.lang-vocab-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.55rem;
}
.lang-vocab-row {
  display: grid;
  grid-template-columns: minmax(3.5rem, auto) minmax(4rem, 1fr) 1.4fr;
  gap: 0.75rem;
  align-items: baseline;
  padding: 0.35rem 0;
  border-bottom: 1px solid var(--color-border, rgba(20, 40, 30, 0.12));
}
.lang-hanzi {
  font-size: 1.35rem;
  font-weight: 600;
  line-height: 1.2;
}
.lang-pinyin {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 0.95rem;
  color: var(--color-muted, #5b6b63);
}
.lang-gloss {
  font-size: 0.95rem;
}
@media (max-width: 520px) {
  .lang-vocab-row {
    grid-template-columns: 1fr;
    gap: 0.15rem;
  }
}
</style>
