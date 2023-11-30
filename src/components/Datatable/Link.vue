<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router'

const props = defineProps<{
   featherIcon: string
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
   <routerLink v-if="props.go" class="btn btn-datatable btn-icon btn-transparent-dark me-2 fixed-btn-transparent-dark" :to="props.go">
      <vue-feather :type="props.featherIcon"></vue-feather>
   </routerLink>
   <span v-else class="btn btn-datatable btn-icon btn-transparent-dark me-2 fixed-btn-transparent-dark" @click.prevent="handleClick">
      <vue-feather :type="props.featherIcon"></vue-feather>
   </span>
</template>
