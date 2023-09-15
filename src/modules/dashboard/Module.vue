<script setup lang="ts">
import { onBeforeMount } from 'vue';

onBeforeMount(() => {
  document.body.classList.remove('bg-primary');
  document.body.classList.add('nav-fixed');
});
</script>

<template>
  <router-view></router-view>
</template>