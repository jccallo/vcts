<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  to: RouteLocationRaw
  feather: string
  value: string
  target: string
  parent: string
  slot: boolean
}>()

const handleLinkClick = () => {
  router.push(props.to)
}
</script>

<template>
  <!-- Sidenav Accordion (Generico)-->
  <a
    style="cursor: pointer;"
    class="nav-link collapsed"
    :to="props.to"
    data-bs-toggle="collapse"
    :data-bs-target="`#${props.target}`"
    aria-expanded="false"
    :aria-controls="props.target"
    @click="handleLinkClick"
  >
    <div class="nav-link-icon">
      <vue-feather :type="props.feather" size="16"></vue-feather>
    </div>
    {{ props.value }}
    <div v-if="slot" class="sidenav-collapse-arrow">
      <i class="fas fa-angle-down"></i>
    </div>
  </a>
  <div
    v-if="slot"
    class="collapse"
    :id="props.target"
    :data-bs-parent="`#${props.parent}`"
  >
    <nav class="sidenav-menu-nested nav">
      <slot></slot>
    </nav>
  </div>
</template>
