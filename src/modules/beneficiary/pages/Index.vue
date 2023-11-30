<script setup lang="ts">
import { onMounted } from 'vue';
import type { Beneficiary } from '@/interfaces'
import { useDatatable } from '@/composables'

const { data, links, from, to, total, page, perpage, query, loadURL } = useDatatable<Beneficiary>('/beneficiaries', 'beneficiaries.index')

onMounted(async() => {
  await loadURL()
})
</script>

<template>
  <pre>{{ data }}</pre>
  <pre>{{ links }}</pre>
  <pre>{{ from }}</pre>
  <pre>{{ to }}</pre>
  <pre>{{ total }}</pre>
  <pre>{{ page }}</pre>
  <pre>{{ perpage }}</pre>
  <pre>{{ query }}</pre>
</template>
