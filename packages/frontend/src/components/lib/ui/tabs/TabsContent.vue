<script setup lang="ts">
import { cn } from '@/lib/utils';
import { TabsContent, type TabsContentProps } from 'reka-ui';

const props = defineProps<TabsContentProps & { class?: string }>();
</script>

<template>
  <TabsContent
    :class="cn('focus-visible:ring-ring/50 mt-2 focus-visible:ring-[3px] focus-visible:outline-hidden', props.class)"
    v-bind="props"
  >
    <slot />
  </TabsContent>
</template>
