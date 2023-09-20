<script setup lang="ts">
const props = defineProps<{
  menssage: string
  type: string
  fontSize: number
}>()
</script>

<template>
  <div :class="`alert alert-${props.type} alert-icon`" role="alert">
    <div class="alert-icon-aside">
      <i class="fa-solid fa-circle-exclamation"></i>
    </div>
    <div class="alert-icon-content">
      <span :style="`font-size: ${fontSize}px;`">{{ props.menssage }}</span>
    </div>
  </div>
</template>
