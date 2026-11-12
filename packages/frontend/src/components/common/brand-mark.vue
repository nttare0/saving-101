<script setup lang="ts">
// The MoneyMatter "M" mark (the same glyph as the favicon), drawn in the current text colour
// on a neutral tile so it sits in the shadcn/ui sidebar the way a team/brand tile does.
import { cn } from '@/lib/utils';

defineProps<{ class?: string }>();
</script>

<template>
  <span
    :class="
      cn(
        'bg-primary text-primary-foreground flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg',
        $props.class,
      )
    "
    aria-hidden="true"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="150 150 724 724" class="size-[62%]" fill="currentColor">
      <path
        d="M236.0 248.9A22 22 0 0 1 268.5 229.5L501.5 355.4A22 22 0 0 0 522.5 355.4L755.5 229.5A22 22 0 0 1 788.0 248.9L788.0 790.0A22 22 0 0 1 766.0 812.0L674.0 812.0A22 22 0 0 1 652.0 790.0L652.0 440.0L514.9 514.1A6 6 0 0 1 509.1 514.1L247.5 372.8A22 22 0 0 1 236.0 353.4ZM236.0 473.9A22 22 0 0 1 268.5 454.5L360.5 504.2A22 22 0 0 1 372.0 523.6L372.0 790.0A22 22 0 0 1 350.0 812.0L258.0 812.0A22 22 0 0 1 236.0 790.0ZM444.0 559.4A6 6 0 0 1 452.9 554.1L512.0 586.1L571.1 554.1A6 6 0 0 1 580.0 559.4L580.0 790.0A22 22 0 0 1 558.0 812.0L466.0 812.0A22 22 0 0 1 444.0 790.0Z"
      />
    </svg>
  </span>
</template>
