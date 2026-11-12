<script setup lang="ts">
import { cn } from '@/lib/utils';
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    class?: string;
    ariaLabel?: string;
  }>(),
  {
    modelValue: 0,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
  },
);

const emit = defineEmits<{
  'update:modelValue': [value: number];
}>();

const sliderValue = computed({
  get: () => [props.modelValue],
  set: (val: number[]) => {
    emit('update:modelValue', val[0]!);
  },
});
</script>

<template>
  <SliderRoot
    v-model="sliderValue"
    :min="min"
    :max="max"
    :step="step"
    :disabled="disabled"
    :class="
      cn(
        'relative flex w-full touch-none items-center select-none',
        disabled && 'cursor-not-allowed opacity-50',
        props.class,
      )
    "
  >
    <SliderTrack class="bg-muted relative h-1.5 w-full grow overflow-hidden rounded-full">
      <SliderRange class="bg-primary absolute h-full" />
    </SliderTrack>
    <SliderThumb
      :aria-label="ariaLabel"
      class="border-primary ring-ring/50 block size-5 shrink-0 rounded-full border bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
    />
  </SliderRoot>
</template>
