<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router'

defineProps<{
  go: RouteLocationRaw
}>()
</script>

<template>
  <routerLink
    class="btn btn-datatable btn-icon btn-transparent-dark me-2 fixed-btn-transparent-dark"
    :to="go"
    ><vue-feather type="edit" size="16"></vue-feather>
  </routerLink>
</template>
