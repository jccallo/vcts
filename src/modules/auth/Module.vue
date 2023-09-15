<script setup lang="ts">
import {onBeforeMount} from 'vue';

onBeforeMount(() => {
    document.body.classList.remove('nav-fixed');
    document.body.classList.add('bg-primary');
});
</script>

<template>
    <router-view></router-view>
</template>