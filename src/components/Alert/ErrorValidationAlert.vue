<script setup lang="ts">
import { Pluck } from '../../interfaces';

const props = defineProps<{
  errors: Pluck[]
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
    </div>
  </div>
</template>