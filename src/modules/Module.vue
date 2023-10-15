<script setup lang="ts">
import { Footer, Navbar, Sidebar } from '@/layouts'
import { onMounted } from 'vue'

onMounted(() => {
  // para mostra o esconder el menu lateral
  // lo guarda en el localstorage para recordar 
  const sidebarToggle = document.body.querySelector('#sidebarToggle')
  if (sidebarToggle) {
    // Uncomment Below to persist sidebar toggle between refreshes
    if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
      document.body.classList.toggle('sidenav-toggled')
    }
    sidebarToggle.addEventListener('click', (event) => {
      event.preventDefault()
      document.body.classList.toggle('sidenav-toggled')
      localStorage.setItem(
        'sb|sidebar-toggle',
        document.body.classList.contains('sidenav-toggled').toString()
      )
    })
  }

  // si la pantalla es menor que LG, esconde el menu lateral al hacer click en la pantalla
  // lo guarda en el localstorage para recordar 
  const sidenavContent = document.body.querySelector('#layoutSidenav_content')
  if (sidenavContent) {
    sidenavContent.addEventListener('click', () => {
      const BOOTSTRAP_LG_WIDTH = 992
      if (window.innerWidth >= BOOTSTRAP_LG_WIDTH) {
        return
      }
      if (document.body.classList.contains('sidenav-toggled')) {
        document.body.classList.toggle('sidenav-toggled')
        // localStorage.setItem(
        //   'sb|sidebar-toggle',
        //   document.body.classList.contains('sidenav-toggled').toString()
        // )
      }
    })
  }
})
</script>

<template>
  <!-- Navbar -->
  <Navbar></Navbar>

  <!-- Sidenav -->
  <div id="layoutSidenav">
    <div id="layoutSidenav_nav">
      <!-- sidebar -->
      <Sidebar></Sidebar>
    </div>
    <div id="layoutSidenav_content">
      <main>
        <!-- header & content -->
        <RouterView></RouterView>
      </main>
      <Footer></Footer>
    </div>
  </div>
</template>
