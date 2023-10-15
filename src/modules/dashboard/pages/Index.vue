<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from '@/modules/auth/composables'
import { $storage } from '@/services'
const { user } = useAuth()

onMounted(() => {
  console.log(user)
  console.log($storage.get($storage.TOKEN))
})
</script>

<template>
  <header
    class="page-header page-header-dark bg-gradient-primary-to-secondary pb-10"
  >
    <div class="container-xl px-4">
      <div class="page-header-content pt-4">
        <div class="row align-items-center justify-content-between">
          <div class="col-auto mt-4">
            <h1 class="page-header-title">
              <div class="page-header-icon"><vue-feather type="activity"></vue-feather></div>
              Escritorio
            </h1>
            <div class="small">
              <span class="fw-500">Friday</span>
              &middot; September 20, 2021 &middot; 12:16 PM
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- Main page content-->
  <div class="container-xl px-4 mt-n10">
    <!-- Illustration dashboard card example-->
    <div class="card card-waves mb-4">
      <div class="card-body p-5">
          <div class="row align-items-center justify-content-between">
              <div class="col">
                  <h2 class="text-primary">¡Bienvenido de nuevo, tu tablero está listo!</h2>
                  <p class="text-gray-700">¡Buen trabajo, tu panel de afiliados está listo para funcionar! Puede ver ventas, generar enlaces, preparar cupones y descargar informes de afiliados utilizando este panel.</p>
                  <a class="btn btn-primary p-3" href="#!">
                      Get Started
                      <i class="ms-1" data-feather="arrow-right"></i>
                  </a>
              </div>
              <div class="col d-none d-lg-block mt-xxl-n4"><img class="img-fluid px-xl-4 mt-xxl-n5" src="../../../assets/img/illustrations/statistics.svg" /></div>
          </div>
      </div>
  </div>
  </div>
</template>
