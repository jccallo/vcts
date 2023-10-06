<script setup lang="ts">
defineProps<{
  isAdmin: string
}>()
</script>

<template>
  <span
    class="badge"
    :class="isAdmin === 'true' ? 'bg-green-soft text-green' : 'bg-yellow-soft text-yellow'"
  >
    {{ isAdmin === 'true' ? 'Admin' : 'Regular' }}
  </span>
</template>