<script setup lang="ts">
import { useAuth } from '../composables'
import { Navbar, Footer } from '@/layouts'

const { user, isAdmin, setActiveEmployee } = useAuth()
</script>

<template>
  <!-- Navbar -->
  <Navbar></Navbar>

  <!-- Accounts -->
  <div id="layoutAuthentication">
    <div id="layoutAuthentication_content">
      <main>
        <div class="container-xl px-4">
          <div class="row justify-content-center">
            <!-- Create Organization-->
            <div class="col-xl-5 col-lg-6 col-md-8 col-sm-11 mt-4"
              v-if="isAdmin"
            >
              <div class="card text-center h-100">
                <div class="card-body px-5 pt-5 d-flex flex-column">
                  <div>
                    <div class="h3 text-primary">Privada</div>
                    <p class="text-muted mb-4">
                      Admin
                    </p>
                  </div>
                  <div
                    class="icons-org-create align-items-center mx-auto mt-auto"
                  >
                    <i class="fa-solid fa-user-shield" style="font-size: 55px; color: #0061f2;"></i>
                  </div>
                </div>
                <div class="card-footer bg-transparent px-5 py-4">
                  <div class="small text-center">
                    <a
                      class="btn btn-block btn-primary"
                    >
                      Ingresar
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Create Organization-->
            <div class="col-xl-5 col-lg-6 col-md-8 col-sm-11 mt-4"
              v-for="employee in user.employees" :key="employee.id"
            >
              <div class="card text-center h-100">
                <div class="card-body px-5 pt-5 d-flex flex-column">
                  <div>
                    <div class="h3 text-primary">{{ employee.branch.name }}</div>
                    <p class="text-muted mb-4">
                      {{ employee.role.name }}
                    </p>
                  </div>
                  <div
                    class="icons-org-create align-items-center mx-auto mt-auto"
                  >
                    <i class="fa-regular fa-building" style="font-size: 55px; color: #0061f2;"></i>
                  </div>
                </div>
                <div class="card-footer bg-transparent px-5 py-4">
                  <div class="small text-center">
                    <button
                      class="btn btn-block btn-primary"
                      :disabled="!employee.permissions.length"
                      @click.prevent="setActiveEmployee(employee)"
                    >
                      Ingresar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    <pre>{{ user }}</pre>
    <div id="layoutAuthentication_footer">
      <Footer></Footer>
    </div>
  </div>
</template>
