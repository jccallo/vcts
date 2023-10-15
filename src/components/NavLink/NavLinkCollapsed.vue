<script setup lang="ts">
import { useRoute } from 'vue-router'

const props = defineProps<{
  id: string
  title: string
  resource: string
  featherIcon?: string
  hasAccordion: boolean
}>()

const setActiveClass = () => useRoute().name?.toString().split('.')[0] === props.resource ? 'active' : ''
</script>

<template>
  <a
    class="nav-link collapsed"
    style="cursor: default;"
    data-bs-toggle="collapse"
    :data-bs-target="`#${props.id}`"
    aria-expanded="false"
    :aria-controls="`${props.id}`"
    :class="setActiveClass()"
  >
    <div v-if="props.featherIcon" class="nav-link-icon">
      <vue-feather :type="`${props.featherIcon}`" size="16"></vue-feather>
    </div>
    {{ props.title }}
    <div class="sidenav-collapse-arrow">
      <i class="fas fa-angle-down"></i>
    </div>
  </a>
  <div class="collapse" :id="`${props.id}`">
    <nav :class="`sidenav-menu-nested nav ${hasAccordion ? 'accordion' : ''}`">
      <slot></slot>
    </nav>
  </div>
</template>


<!-- <NavLinkCollapsed
  id="holaid"
  title="holatitle"
  resource="users"
  feather-icon="home"
  :has-accordion="true"
>
  <NavLinkCollapsed
    id="aaaa"
    title="aaaaa"
    resource="users"
    feather-icon="users"
    :has-accordion="false"
  >
    <NavLink title="Cards" badge-title="Updated" :go="{ name: 'users.index' }" />
  </NavLinkCollapsed>
</NavLinkCollapsed>


 
const mifun = (argumento: number, arg: string) => {
  return () => {
    // Lógica para realizar una acción con el argumento cuando se hace clic en el enlace
    console.log('Acción realizada con el argumento:', argumento, arg);
  }
}
<NavLink title="Cards" badge-title="Updated" feather-icon="users" :callback="mifun(34, 'jholaaa')" /> -->

