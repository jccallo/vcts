<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';

const props = defineProps<{
  title: string
  badgeTitle?: string
  featherIcon?: string
  go?: RouteLocationRaw
  callback?: (...args: any[]) => void
}>()

const handleClick = (...args: any[]) => {
  if (props.callback) {
    props.callback(...args)
  }
};
</script>

<template>
  <routerLink 
    v-if="go"
    class="nav-link"
    :to="go"
  >
    <div v-if="props.featherIcon" class="nav-link-icon">
      <vue-feather :type="`${props.featherIcon}`" size="16"></vue-feather>
    </div>
    {{ props.title }}
    <span v-if="props.badgeTitle" class="badge bg-primary-soft text-primary ms-auto">{{ props.badgeTitle }}</span>
  </routerLink>
  <span
    v-else
    class="nav-link"
    style="cursor: pointer;"
    @click.prevent="handleClick"
  >
    <div v-if="props.featherIcon" class="nav-link-icon">
      <vue-feather :type="`${props.featherIcon}`" size="16"></vue-feather>
    </div>
    {{ props.title }}
    <span v-if="props.badgeTitle" class="badge bg-primary-soft text-primary ms-auto">{{ props.badgeTitle }}</span>
  </span>
</template>
