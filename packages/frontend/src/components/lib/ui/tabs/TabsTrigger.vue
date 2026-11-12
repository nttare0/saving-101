<script setup lang="ts">
import { cn } from '@/lib/utils';
import { TabsTrigger, type TabsTriggerProps } from 'reka-ui';
import { computed, inject } from 'vue';

import { TabsVariantKey, type TabsVariant } from './shared';

const props = defineProps<TabsTriggerProps & { class?: string; variant?: TabsVariant }>();

const injectedVariant = inject(TabsVariantKey, undefined);
const variant = computed<TabsVariant>(() => props.variant ?? injectedVariant?.value ?? 'default');
</script>

<template>
  <TabsTrigger
    v-bind="props"
    :class="
      cn(
        variant === 'underline'
          ? 'text-muted-foreground hover:text-foreground focus-visible:text-foreground data-[state=active]:text-foreground relative inline-flex items-center gap-2 border-b-2 border-transparent px-1 py-3 text-sm font-medium whitespace-nowrap transition-colors outline-none disabled:pointer-events-none disabled:opacity-50'
          : 'text-foreground dark:text-muted-foreground focus-visible:ring-ring/50 data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 dark:data-[state=active]:text-foreground inline-flex h-full items-center justify-center gap-1.5 rounded-md border border-transparent px-3 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm',
        props.class,
      )
    "
  >
    <slot />
  </TabsTrigger>
</template>
