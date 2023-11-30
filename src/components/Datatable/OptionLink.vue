<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router'

const props = defineProps<{
   title: string
   featherIcon?: string
   go?: RouteLocationRaw
   callback?: () => void
}>()

const handleClick = () => {
   if (props.callback) {
      props.callback()
   }
}
</script>

<template>
   <routerLink v-if="go" class="dropdown-item" :to="go">
      <div v-if="props.featherIcon" class="dropdown-item-icon"><vue-feather :type="props.featherIcon"></vue-feather></div>
      {{ props.title }}
   </routerLink>
   <span v-else class="dropdown-item pointer" @click.prevent="handleClick">
      <div v-if="props.featherIcon" class="dropdown-item-icon"><vue-feather :type="props.featherIcon" @click.prevent="handleClick"></vue-feather></div>
      {{ props.title }}
   </span>
</template>
