<script setup lang="ts">
import { Link } from '@/interfaces'
import { $helper } from '@/services'

defineProps<{
  links: Link[]
  perpage: string
  query: string
  field: string
  direction: string
  routeName: string
}>()

</script>

<template v-if="links">
  <ul class="pagination mb-0">
    <li
      v-if="links.length > 3"
      v-for="(link, index) in links"
      :key="index"
      class="page-item"
      :class="{
        active: link.active,
        disabled: !link.url,
      }"
      :style="{ cursor: link.active || !link.url ? 'default' : 'pointer' }"
    >
      <router-link
        v-if="link.url"
        :to="{
          name: routeName,
          query: {
            page: $helper.getQueryParamValue('page', link.url) || '1',
            perpage: perpage,
            field: field,
            direction: direction,
            query: query,
          },
        }"
        class="page-link"
      >
        <span v-html="link.label"></span>
      </router-link>
      <a v-else class="page-link">
        <span v-html="link.label"></span>
      </a>
    </li>
  </ul>
</template>
