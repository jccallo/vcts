<script setup lang="ts">
import { onMounted } from 'vue';
import useCustomers from '../composables/use.customers';

const { customers, meta, customersIndex } = useCustomers()

onMounted(async () => {
  await customersIndex()
})
</script>

<template>
  <pre>{{ customers }}</pre>
  <pre>{{ meta }}</pre>
</template>