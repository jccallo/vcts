<script setup lang="ts">
import { useLogout } from '@/modules/auth/composables'
import { useRoute } from 'vue-router'

const { user, isLoading, logout } = useLogout()
const route = useRoute()

const isAuthAccounts = route.name === 'auth.accounts'
</script>

<template>
  <nav
    class="topnav navbar navbar-expand shadow justify-content-between justify-content-sm-start navbar-light bg-white"
    id="sidenavAccordion"
  >
    <!-- para arreglar el margen en la pagina de cuentas -->
    <span v-if="isAuthAccounts" class="order-1 order-lg-0 me-2 ms-lg-3 me-lg-0">
    </span>

    <!-- Sidenav Toggle Button-->
    <button
      v-else
      class="btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0"
      id="sidebarToggle"
    >
      <vue-feather type="menu" size="16"></vue-feather>
    </button>

    <!-- Navbar Brand-->
    <!-- * * Tip * * You can use text or an image for your navbar brand.-->
    <!-- * * * * * * When using an image, we recommend the SVG format.-->
    <!-- * * * * * * Dimensions: Maximum height: 32px, maximum width: 240px-->
    <routerLink
      class="navbar-brand pe-3 ps-4 ps-lg-2"
      :to="{ name: 'dashboard.index' }"
      >VISA INTERNATIONAL CLUB
    </routerLink>

    <!-- Navbar Search Input-->
    <!-- * * Note: * * Visible only on and above the lg breakpoint-->
    <!-- <form class="form-inline me-auto d-none d-lg-block me-3">
      <div class="input-group input-group-joined input-group-solid">
        <input class="form-control pe-0" type="search" placeholder="Buscar" aria-label="Search" />
        <div class="input-group-text"><vue-feather type="search" size="16"></vue-feather></div>
      </div>
    </form> -->

    <!-- Navbar Items-->
    <ul class="navbar-nav align-items-center ms-auto">
      <!-- Navbar Search Dropdown-->
      <!-- * * Note: * * Visible only below the lg breakpoint-->
      <li class="nav-item dropdown no-caret me-3 d-lg-none">
        <a
          class="btn btn-icon btn-transparent-dark dropdown-toggle"
          id="searchDropdown"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          ><i data-feather="search"></i
        ></a>

        <!-- Dropdown - Search-->
        <div
          class="dropdown-menu dropdown-menu-end p-3 shadow animated--fade-in-up"
          aria-labelledby="searchDropdown"
        >
          <form class="form-inline me-auto w-100">
            <div class="input-group input-group-joined input-group-solid">
              <input
                class="form-control pe-0"
                type="text"
                placeholder="Search for..."
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <div class="input-group-text"><i data-feather="search"></i></div>
            </div>
          </form>
        </div>
      </li>

      <!-- User Dropdown-->
      <li class="nav-item dropdown no-caret dropdown-user me-3 me-lg-4">
        <a
          class="btn btn-icon btn-transparent-dark dropdown-toggle"
          id="navbarDropdownUserImage"
          href="javascript:void(0);"
          role="button"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img
            class="img-fluid"
            src="../assets/img/illustrations/profiles/profile-1.png"
          />
        </a>
        <div
          class="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up"
          aria-labelledby="navbarDropdownUserImage"
        >
          <h6 class="dropdown-header d-flex align-items-center">
            <img
              class="dropdown-user-img"
              src="../assets/img/illustrations/profiles/profile-1.png"
            />
            <div class="dropdown-user-details">
              <div class="dropdown-user-details-name">{{ user.name }}</div>
              <div class="dropdown-user-details-email">{{ user.email }}</div>
            </div>
          </h6>
          <div class="dropdown-divider"></div>
          <routerLink class="dropdown-item" :to="{ name: 'auth.accounts' }">
            <div class="dropdown-item-icon">
              <vue-feather type="users" size="16"></vue-feather>
            </div>
            Cuentas
          </routerLink>
          <routerLink class="dropdown-item" :to="{ name: 'users.index' }">
            <div class="dropdown-item-icon">
              <vue-feather type="settings" size="16"></vue-feather>
            </div>
            Perfil
          </routerLink>
          <button
            class="dropdown-item"
            style="cursor: pointer"
            @click.prevent="logout"
            :disabled="isLoading"
          >
            <div class="dropdown-item-icon">
              <vue-feather type="log-out" size="16"></vue-feather>
            </div>
            Salir
          </button>
        </div>
      </li>
    </ul>
  </nav>
</template>
