<script setup lang="ts">
import { Footer, Navbar, Sidebar } from '@/layouts'
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