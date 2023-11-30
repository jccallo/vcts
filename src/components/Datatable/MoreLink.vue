<script setup lang="ts">
const props = defineProps<{
   id: string
   featherIcon: string
}>()
</script>

<template>
   <span class="btn btn-datatable btn-icon btn-transparent-dark fixed-btn-transparent-dark" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :id="props.id">
      <vue-feather :type="props.featherIcon"></vue-feather>
   </span>
   <div class="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up" :aria-labelledby="props.id">
      <slot></slot>
   </div>
</template>
