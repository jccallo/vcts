<script setup lang="ts">
defineProps<{
  from: number
  to: number
  total: number
}>()
</script>

<template>
  <span> Mostrando {{ from }} a {{ to }} de {{ total }} registros </span>
</template>
