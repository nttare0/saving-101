<script setup lang="ts">
import BrandMark from '@/components/common/brand-mark.vue';
import FeedbackIcon from '@/components/common/icons/feedback-icon.vue';
import FeedbackDialog from '@/components/dialogs/feedback-dialog.vue';
import UiButton from '@/components/lib/ui/button/Button.vue';
import { useFeedbackAttention } from '@/composable/use-feedback-attention';
import { useSupportButton } from '@/composable/use-support-button';
import { cn } from '@/lib/utils';
import { HeartIcon } from '@lucide/vue';

import AccountsView from './accounts-view/index.vue';
import NavigationLinks from './navigation-links.vue';
import UserMenu from './user-menu.vue';

defineProps<{ mobileView?: boolean }>();

const { isPulsing: isFeedbackPulsing, onClick: onFeedbackClick } = useFeedbackAttention();
const { isSupportButtonVisible, openSupport } = useSupportButton();
</script>

<template>
  <aside :class="cn('text-sidebar-foreground flex h-full flex-col', mobileView ? 'w-auto' : 'w-72')">
    <div class="flex h-14 shrink-0 items-center gap-2 px-4">
      <BrandMark />
      <span class="truncate text-base font-semibold tracking-tight">MoneyMatter</span>
    </div>

    <div class="flex max-h-[calc(100%-56px)] grow flex-col gap-2 px-2 pb-2">
      <nav class="grid gap-1">
        <NavigationLinks />
      </nav>

      <div class="bg-sidebar-border mx-2 h-px" />

      <AccountsView />

      <div v-if="!mobileView" class="bg-sidebar-border mx-2 h-px" />

      <UserMenu :elevated="mobileView">
        <template v-if="mobileView" #trailing>
          <FeedbackDialog>
            <UiButton
              variant="ghost"
              size="icon-sm"
              :class="{ 'feedback-pulse': isFeedbackPulsing }"
              :aria-label="$t('header.feedback')"
              @click="onFeedbackClick"
            >
              <FeedbackIcon class="size-4" />
            </UiButton>
          </FeedbackDialog>
          <UiButton
            v-if="isSupportButtonVisible"
            variant="ghost"
            size="icon-sm"
            :aria-label="$t('header.support')"
            @click="openSupport"
          >
            <HeartIcon class="text-heart size-4 fill-current" />
          </UiButton>
        </template>
      </UserMenu>
    </div>
  </aside>
</template>
