<script setup lang="ts">
const props = defineProps<{
  menssage: string
  type: string
}>()
</script>

<template>
  <div :class="`alert alert-${props.type} alert-icon`" role="alert">
    <div class="alert-icon-aside">
      <i class="fa-solid fa-circle-exclamation"></i>
    </div>
    <div class="alert-icon-content">
      {{ props.menssage }}
    </div>
  </div>
</template>
