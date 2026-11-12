<script setup lang="ts">
import UiButton from '@/components/lib/ui/button/Button.vue';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/lib/ui/collapsible';
import { ROUTES_NAMES } from '@/routes';
import {
  CalendarClockIcon,
  ChartColumnIcon,
  ChevronRightIcon,
  CreditCardIcon,
  LayersIcon,
  LayoutDashboardIcon,
} from '@lucide/vue';
import { watch } from 'vue';

import { SIDEBAR_NAV_CHILDREN, useAccountsNavChildren } from './nav-items';
import { useSidebarNavCollapse } from './use-nav-collapse';
import { useSidebarNavRoutes } from './use-nav-routes';

const props = withDefaults(defineProps<{ bottomNav?: boolean }>(), { bottomNav: false });

// shadcn/ui sidebar menu metrics (h-8 rows, h-7 sub-rows); the mobile bottom bar keeps touch-sized targets.
const navItemBase = props.bottomNav ? 'w-full gap-2 px-3' : 'h-8 w-full gap-2 px-2 font-normal';
const navItemActive = 'bg-sidebar-accent text-sidebar-accent-foreground font-medium';
const navGroupActive = 'text-sidebar-accent-foreground font-medium';
const navSubItemBase = 'h-7 w-full justify-start gap-2 px-2 font-normal';
const navSubList = 'border-sidebar-border mx-3.5 mt-1 grid gap-1 border-l px-2.5 py-0.5';
const navIconBase = 'size-4 shrink-0';
const navIconActive = '';

const { isAccountsOpen, isTransactionsOpen, isPlannedOpen } = useSidebarNavCollapse();
const { isAccountsRoute, isTransactionsRoute, isPlannedRoute, isChildActive } = useSidebarNavRoutes();
const accountsNavChildren = useAccountsNavChildren();

watch(
  isAccountsRoute,
  (val) => {
    if (val) isAccountsOpen.value = true;
  },
  { immediate: true },
);

watch(
  isTransactionsRoute,
  (val) => {
    if (val) isTransactionsOpen.value = true;
  },
  { immediate: true },
);

watch(
  isPlannedRoute,
  (val) => {
    if (val) isPlannedOpen.value = true;
  },
  { immediate: true },
);
</script>

<template>
  <router-link v-slot="{ isActive }" :to="{ name: ROUTES_NAMES.home }">
    <ui-button
      variant="ghost"
      as="span"
      :class="[navItemBase, !bottomNav && 'justify-start', isActive && navItemActive]"
      size="default"
    >
      <LayoutDashboardIcon :class="[navIconBase, isActive && navIconActive]" />
      <span :class="{ 'max-sm:hidden': bottomNav }"> {{ $t('navigation.dashboard') }} </span>
    </ui-button>
  </router-link>

  <template v-if="bottomNav">
    <router-link v-slot="{ isActive }" :to="{ name: ROUTES_NAMES.accounts }">
      <ui-button variant="ghost" as="span" :class="[navItemBase, isActive && navItemActive]" size="default">
        <LayersIcon :class="[navIconBase, isActive && navIconActive]" />
        <span class="max-sm:hidden"> {{ $t('navigation.accounts') }} </span>
      </ui-button>
    </router-link>
  </template>
  <router-link v-else-if="accountsNavChildren.length === 1" :to="{ name: ROUTES_NAMES.accounts }">
    <ui-button
      variant="ghost"
      as="span"
      :class="[navItemBase, 'justify-start', isAccountsRoute && navItemActive]"
      size="default"
    >
      <LayersIcon :class="[navIconBase, isAccountsRoute && navIconActive]" />
      <span> {{ $t('navigation.accounts') }} </span>
    </ui-button>
  </router-link>
  <Collapsible v-else v-model:open="isAccountsOpen">
    <CollapsibleTrigger class="w-full">
      <ui-button
        variant="ghost"
        as="div"
        :class="[navItemBase, 'justify-start', isAccountsRoute && navGroupActive]"
        size="default"
      >
        <LayersIcon :class="[navIconBase, isAccountsRoute && navIconActive]" />
        <span>{{ $t('navigation.accounts') }}</span>
        <ChevronRightIcon
          :class="['ml-auto size-4 shrink-0 transition-transform duration-200', { 'rotate-90': isAccountsOpen }]"
        />
      </ui-button>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <div :class="navSubList">
        <router-link
          v-for="child in accountsNavChildren"
          :key="child.routeName"
          v-slot="{ isActive }"
          :to="{ name: child.routeName }"
        >
          <ui-button
            variant="ghost"
            as="span"
            :class="[navSubItemBase, isChildActive({ child, isActive }) && navItemActive]"
            size="sm"
          >
            <component :is="child.icon" :class="[navIconBase, isChildActive({ child, isActive }) && navIconActive]" />
            <span>{{ $t(child.labelKey) }}</span>
          </ui-button>
        </router-link>
      </div>
    </CollapsibleContent>
  </Collapsible>

  <template v-if="bottomNav">
    <router-link v-slot="{ isActive }" :to="{ name: ROUTES_NAMES.transactions }">
      <ui-button variant="ghost" as="span" :class="[navItemBase, isActive && navItemActive]" size="default">
        <CreditCardIcon :class="[navIconBase, isActive && navIconActive]" />
        <span class="max-sm:hidden"> {{ $t('navigation.transactions') }} </span>
      </ui-button>
    </router-link>
  </template>
  <Collapsible v-else v-model:open="isTransactionsOpen">
    <CollapsibleTrigger class="w-full">
      <ui-button
        variant="ghost"
        as="div"
        :class="[navItemBase, 'justify-start', isTransactionsRoute && navGroupActive]"
        size="default"
      >
        <CreditCardIcon :class="[navIconBase, isTransactionsRoute && navIconActive]" />
        <span>{{ $t('navigation.transactions') }}</span>
        <ChevronRightIcon
          :class="['ml-auto size-4 shrink-0 transition-transform duration-200', { 'rotate-90': isTransactionsOpen }]"
        />
      </ui-button>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <div :class="navSubList">
        <router-link
          v-for="child in SIDEBAR_NAV_CHILDREN.transactions"
          :key="child.routeName"
          v-slot="{ isActive }"
          :to="{ name: child.routeName }"
        >
          <ui-button
            variant="ghost"
            as="span"
            :class="[navSubItemBase, isChildActive({ child, isActive }) && navItemActive]"
            size="sm"
          >
            <component :is="child.icon" :class="[navIconBase, isChildActive({ child, isActive }) && navIconActive]" />
            <span>{{ $t(child.labelKey) }}</span>
          </ui-button>
        </router-link>
      </div>
    </CollapsibleContent>
  </Collapsible>

  <Collapsible v-if="!bottomNav" v-model:open="isPlannedOpen">
    <CollapsibleTrigger class="w-full">
      <ui-button
        variant="ghost"
        as="div"
        :class="[navItemBase, 'justify-start', isPlannedRoute && navGroupActive]"
        size="default"
      >
        <CalendarClockIcon :class="[navIconBase, isPlannedRoute && navIconActive]" />
        <span>{{ $t('navigation.planned.planned') }}</span>
        <ChevronRightIcon
          :class="['ml-auto size-4 shrink-0 transition-transform duration-200', { 'rotate-90': isPlannedOpen }]"
        />
      </ui-button>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <div :class="navSubList">
        <router-link
          v-for="child in SIDEBAR_NAV_CHILDREN.planned"
          :key="child.routeName"
          v-slot="{ isActive }"
          :to="{ name: child.routeName }"
        >
          <ui-button
            variant="ghost"
            as="span"
            :class="[navSubItemBase, isChildActive({ child, isActive }) && navItemActive]"
            size="sm"
          >
            <component :is="child.icon" :class="[navIconBase, isChildActive({ child, isActive }) && navIconActive]" />
            <span>{{ $t(child.labelKey) }}</span>
          </ui-button>
        </router-link>
      </div>
    </CollapsibleContent>
  </Collapsible>

  <router-link v-slot="{ isActive }" :to="{ name: ROUTES_NAMES.analytics }">
    <ui-button
      variant="ghost"
      as="span"
      :class="[navItemBase, !bottomNav && 'justify-start', isActive && navItemActive]"
      size="default"
    >
      <ChartColumnIcon :class="[navIconBase, isActive && navIconActive]" />
      <span :class="{ 'max-sm:hidden': bottomNav }"> {{ $t('navigation.analytics') }} </span>
    </ui-button>
  </router-link>
</template>
