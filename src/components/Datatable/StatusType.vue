<script setup lang="ts">
defineProps<{
  isActive: string
}>()
</script>

<template>
  <span
    class="badge"
    :class="
      isActive === '1'
        ? 'bg-green-soft text-green'
        : 'bg-gray-200 text-dark'
    "
  >
    {{ isActive === '1' ? 'Activo' : 'Inactivo' }}
  </span>
</template>
