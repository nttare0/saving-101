<template>
  <!-- shadcn/ui login-block framing: muted page, brand at the top left, the page's card centred -->
  <div class="bg-muted dark:bg-background relative min-h-dvh">
    <div class="absolute top-4 left-4 z-10 flex items-center gap-2 sm:top-6 sm:left-6">
      <BrandMark class="size-7 rounded-md" />
      <span class="text-sm font-semibold tracking-tight">MoneyMatter</span>
    </div>

    <!-- Language Selector -->
    <div class="absolute top-4 right-4 z-10 sm:top-6 sm:right-6">
      <LanguageSelector variant="outline" show-label />
    </div>

    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';
import BrandMark from '@/components/common/brand-mark.vue';
import LanguageSelector from '@/components/common/language-selector.vue';

useHead({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
});
</script>
