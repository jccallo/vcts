<script setup lang="ts">
const props = defineProps<{
   title: string
   direction: string
   field: string
   column: string
   callback?: () => void
}>()

const handleClick = () => {
   if (props.callback) {
      props.callback()
   }
}
</script>

<template>
   <th @click.prevent="handleClick">
      <span class="d-flex align-content-center pointer"
         >{{ props.title }} <vue-feather v-if="props.field === props.column ? true : false" :type="props.direction === 'asc' ? 'arrow-up' : 'arrow-down'"></vue-feather
      ></span>
   </th>
</template>
