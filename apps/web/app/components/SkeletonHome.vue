<template>
  <div class="skeleton-home" role="status" :aria-label="t('shell.loading')">
    <section class="skeleton-home-hero">
      <div class="skeleton-home-copy">
        <UiSkeleton width="7rem" height="0.75rem" />
        <UiSkeleton width="70%" height="4.5rem" radius="16px" />
        <UiSkeleton width="52%" height="1rem" />
        <div class="skeleton-home-actions">
          <UiSkeleton width="8.5rem" height="2.6rem" radius="999px" />
          <UiSkeleton width="6rem" height="2.6rem" radius="999px" />
        </div>
      </div>
      <div class="skeleton-home-visual" aria-hidden="true">
        <UiSkeleton width="100%" height="100%" radius="999px" />
      </div>
    </section>

    <div class="skeleton-home-domains">
      <UiSkeleton width="10rem" height="1.5rem" />
      <div class="skeleton-domain-grid">
        <div v-for="n in 2" :key="`domain-${n}`" class="skeleton-home-card skeleton-domain-card">
          <div class="skeleton-card-row">
            <UiSkeleton width="2.65rem" height="2.65rem" radius="12px" />
            <UiSkeleton width="45%" height="0.7rem" />
          </div>
          <UiSkeleton width="42%" height="1.75rem" />
          <UiSkeleton width="70%" height="1.65rem" radius="999px" />
          <UiSkeleton width="7rem" height="2.4rem" radius="999px" />
        </div>
      </div>
    </div>

    <div class="skeleton-home-featured">
      <UiSkeleton width="11rem" height="1.5rem" />
      <div class="skeleton-home-grid">
        <div v-for="n in 3" :key="n" class="skeleton-home-card">
          <UiSkeleton width="35%" height="0.7rem" />
          <UiSkeleton width="70%" height="1.35rem" />
          <UiSkeleton width="100%" height="0.4rem" radius="999px" />
          <UiSkeleton width="6.5rem" height="2.35rem" radius="999px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<style scoped>
.skeleton-home {
  padding: clamp(0.75rem, 2vw, 1.5rem) 0 var(--space-8);
}

.skeleton-home-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: center;
  gap: var(--space-6);
  width: min(72rem, calc(100% - 1.5rem));
  margin: 0 auto var(--space-8);
  padding: clamp(2rem, 6vw, 4.5rem);
  border: 1px solid var(--color-hairline);
  border-radius: clamp(1.25rem, 3vw, 2rem);
  background: var(--color-surface);
}

.skeleton-home-copy {
  display: grid;
  gap: 0.9rem;
  max-width: 36rem;
}

.skeleton-home-actions,
.skeleton-card-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.skeleton-home-visual {
  width: min(100%, 20rem);
  aspect-ratio: 1;
  justify-self: center;
}

.skeleton-home-domains,
.skeleton-home-featured {
  width: min(72rem, calc(100% - 1.5rem));
  margin: 0 auto var(--space-6);
  display: grid;
  gap: var(--space-4);
}

.skeleton-domain-grid,
.skeleton-home-grid {
  display: grid;
  gap: var(--space-4);
}

.skeleton-home-card {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  min-height: 11rem;
  padding: var(--space-5);
  background: var(--color-surface);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-card);
}

.skeleton-domain-card {
  min-height: 14rem;
}

.skeleton-card-row {
  justify-content: space-between;
}

@media (min-width: 760px) {
  .skeleton-home-hero {
    grid-template-columns: minmax(0, 1.08fr) minmax(18rem, 0.92fr);
  }

  .skeleton-domain-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .skeleton-home-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
