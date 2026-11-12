<script setup lang="ts">
import { cn } from '@/lib/utils';
import { CheckIcon, MinusIcon } from '@lucide/vue';
import type { CheckboxRootProps } from 'reka-ui';
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui';
import { type HTMLAttributes, computed } from 'vue';
import type { CheckedState } from './types';

const props = defineProps<CheckboxRootProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<{ 'update:modelValue': [value: CheckedState] }>();

const model = computed({
  get: () => props.modelValue,
  set: (val: CheckedState) => emits('update:modelValue', val),
});
</script>

<template>
  <CheckboxRoot
    v-model="model"
    :disabled="props.disabled"
    :name="props.name"
    :value="props.value"
    :id="props.id"
    :class="
      cn(
        'border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground peer size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
  >
    <CheckboxIndicator class="flex h-full w-full items-center justify-center text-current">
      <slot>
        <MinusIcon v-if="model === 'indeterminate'" class="size-3.5" />
        <CheckIcon v-else class="size-3.5" />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
