<script setup lang="ts">
import { onMounted } from 'vue'
import { useAccess } from '@/composables';
import { useLogout, useAuth } from '@/modules/auth/composables'
import { NavLinkCollapsed, NavLink } from '@/components/NavLink'

const { user } = useAuth()
const { logout } = useLogout()
const { checkAccess } = useAccess()

onMounted(() => {
  console.log('sss', checkAccess('op.index'))
})
</script>

<template>
  <nav class="sidenav shadow-right sidenav-light">
    <div class="sidenav-menu">
      <div class="nav accordion" id="accordionSidenav">
        <!-- Sidenav Menu Heading (Account)-->
        <!-- * * Note: * * Visible only on and above the sm breakpoint-->
        <!-- <div class="sidenav-menu-heading d-sm-none">Cuenta</div> -->

        <!-- Sidenav Link (Alerts)-->
        <!-- * * Note: * * Visible only on and above the sm breakpoint-->
        <!-- <a class="nav-link d-sm-none" href="#!">
          <div class="nav-link-icon"><i data-feather="bell"></i></div>
          Alertas
          <span class="badge bg-warning-soft text-warning ms-auto">4 New!</span>
        </a> -->

        <!-- Sidenav Link (Messages)-->
        <!-- * * Note: * * Visible only on and above the sm breakpoint-->
        <!-- <a class="nav-link d-sm-none" href="#!">
          <div class="nav-link-icon"><i data-feather="mail"></i></div>
          Mensajes
          <span class="badge bg-success-soft text-success ms-auto">2 New!</span>
        </a> -->

        <!--------------------------- Sede ---------------------------->
        <div class="sidenav-menu-heading">Sede los Olivos</div>

        <!-- Escritorio -->
        <NavLink title="Escritorio" feather-icon="activity" :go="{ name: 'dashboard.index' }" />
        <!--------------------------- fin de Sede ---------------------------->

        <!--------------------------- Mantenimientos ---------------------------->
        <div class="sidenav-menu-heading">Mantenimientos</div>

        <!-- Usuarios -->
        <NavLinkCollapsed
          id="users"
          title="Usuarios"
          resource="users"
          feather-icon="users"
          :has-accordion="false"
        >
          <NavLink title="Lista de Usuarios" :go="{ name: 'users.index' }" />
          <NavLink title="Agregar Usuarios" :go="{ name: 'users.create' }" />
        </NavLinkCollapsed>

        <!-- Clientes -->
        <NavLinkCollapsed
          id="customers"
          title="Clientes"
          resource="customers"
          feather-icon="users"
          :has-accordion="false"
        >
          <NavLink title="Lista de Clientes" :go="{ name: 'customers.index' }" />
          <NavLink title="Agregar Clientes" :go="{ name: 'customers.create' }" />
        </NavLinkCollapsed>

        <!-- Beneficiarios -->
        <NavLinkCollapsed
          id="beneficiaries"
          title="Beneficiarios"
          resource="beneficiaries"
          feather-icon="users"
          :has-accordion="false"
        >
          <NavLink title="Lista de Beneficiarios" :go="{ name: 'beneficiaries.index' }" />
          <NavLink title="Agregar Beneficiario" :go="{ name: 'beneficiaries.create' }" />
        </NavLinkCollapsed>

        <!-- Bancos -->
        <a
          class="nav-link collapsed"
          href="javascript:void(0);"
          data-bs-toggle="collapse"
          data-bs-target="#collapseBanks"
          aria-expanded="false"
          aria-controls="collapseBanks"
        >
          <div class="nav-link-icon">
            <vue-feather type="dollar-sign" size="16"></vue-feather>
          </div>
          Bancos
          <div class="sidenav-collapse-arrow">
            <i class="fas fa-angle-down"></i>
          </div>
        </a>
        <div
          class="collapse"
          id="collapseBanks"
          data-bs-parent="#accordionSidenav"
        >
          <nav
            class="sidenav-menu-nested nav accordion"
            id="accordionSidenavPagesMenu"
          >
            <router-link :to="{ name: 'dashboard.index' }" class="nav-link"
              >Lista de Bancos</router-link
            >
            <router-link :to="{ name: 'dashboard.index' }" class="nav-link"
              >Agregar Banco</router-link
            >
          </nav>
        </div>

        <!-- Sedes-->
        <a
          class="nav-link collapsed"
          href="javascript:void(0);"
          data-bs-toggle="collapse"
          data-bs-target="#collapseBranches"
          aria-expanded="false"
          aria-controls="collapseBranches"
        >
          <div class="nav-link-icon">
            <vue-feather type="flag" size="16"></vue-feather>
          </div>
          Sedes
          <div class="sidenav-collapse-arrow">
            <i class="fas fa-angle-down"></i>
          </div>
        </a>
        <div
          class="collapse"
          id="collapseBranches"
          data-bs-parent="#accordionSidenav"
        >
          <nav
            class="sidenav-menu-nested nav accordion"
            id="accordionSidenavPagesMenu"
          >
            <router-link :to="{ name: 'dashboard.index' }" class="nav-link"
              >Lista de Usuarios</router-link
            >
            <router-link :to="{ name: 'dashboard.index' }" class="nav-link"
              >Agregar Usuario</router-link
            >
          </nav>
        </div>

        <!-- Empresas -->
        <a
          class="nav-link collapsed"
          href="javascript:void(0);"
          data-bs-toggle="collapse"
          data-bs-target="#collapseCompanies"
          aria-expanded="false"
          aria-controls="collapseCompanies"
        >
          <div class="nav-link-icon">
            <vue-feather type="globe" size="16"></vue-feather>
          </div>
          Empresas
          <div class="sidenav-collapse-arrow">
            <i class="fas fa-angle-down"></i>
          </div>
        </a>
        <div
          class="collapse"
          id="collapseCompanies"
          data-bs-parent="#accordionSidenav"
        >
          <nav
            class="sidenav-menu-nested nav accordion"
            id="accordionSidenavPagesMenu"
          >
            <router-link :to="{ name: 'dashboard.index' }" class="nav-link"
              >Lista de Empresas</router-link
            >
            <router-link :to="{ name: 'dashboard.index' }" class="nav-link"
              >Agregar Empresa</router-link
            >
          </nav>
        </div>

        <!-- Roles-->
        <a
          class="nav-link collapsed"
          href="javascript:void(0);"
          data-bs-toggle="collapse"
          data-bs-target="#collapseRoles"
          aria-expanded="false"
          aria-controls="collapseRoles"
        >
          <div class="nav-link-icon">
            <vue-feather type="briefcase" size="16"></vue-feather>
          </div>
          Roles
          <div class="sidenav-collapse-arrow">
            <i class="fas fa-angle-down"></i>
          </div>
        </a>
        <div
          class="collapse"
          id="collapseRoles"
          data-bs-parent="#accordionSidenav"
        >
          <nav
            class="sidenav-menu-nested nav accordion"
            id="accordionSidenavPagesMenu"
          >
            <a class="nav-link" href="pricing.html">Lista de Roles</a>
            <a class="nav-link" href="invoice.html">Agregar Rol</a>
          </nav>
        </div>

        <!-- Permisos -->
        <a
          class="nav-link collapsed"
          href="javascript:void(0);"
          data-bs-toggle="collapse"
          data-bs-target="#collapsePermissions"
          aria-expanded="false"
          aria-controls="collapsePermissions"
        >
          <div class="nav-link-icon">
            <vue-feather type="unlock" size="16"></vue-feather>
          </div>
          Permisos
          <div class="sidenav-collapse-arrow">
            <i class="fas fa-angle-down"></i>
          </div>
        </a>
        <div
          class="collapse"
          id="collapsePermissions"
          data-bs-parent="#accordionSidenav"
        >
          <nav
            class="sidenav-menu-nested nav accordion"
            id="accordionSidenavPagesMenu"
          >
            <a class="nav-link" href="pricing.html">Lista de Permisos</a>
            <a class="nav-link" href="invoice.html">Agregar Permiso</a>
          </nav>
        </div>

        <!-- Tipos de documentos -->
        <a
          class="nav-link collapsed"
          href="javascript:void(0);"
          data-bs-toggle="collapse"
          data-bs-target="#collapseDocuments"
          aria-expanded="false"
          aria-controls="collapseDocuments"
        >
          <div class="nav-link-icon">
            <vue-feather type="paperclip" size="16"></vue-feather>
          </div>
          Documentos
          <div class="sidenav-collapse-arrow">
            <i class="fas fa-angle-down"></i>
          </div>
        </a>
        <div
          class="collapse"
          id="collapseDocuments"
          data-bs-parent="#accordionSidenav"
        >
          <nav
            class="sidenav-menu-nested nav accordion"
            id="accordionSidenavPagesMenu"
          >
            <router-link :to="{ name: 'dashboard.index' }" class="nav-link"
              >Lista de documentos</router-link
            >
            <router-link :to="{ name: 'dashboard.index' }" class="nav-link"
              >Agregar documento</router-link
            >
          </nav>
        </div>

        <!--------------------------- Transacciones ---------------------------->
        <div class="sidenav-menu-heading">Transacciones</div>

        <!-- Ventas -->
        <NavLinkCollapsed
          id="sales"
          title="Ventas"
          resource="sales"
          feather-icon="shopping-cart"
          :has-accordion="false"
        >
          <NavLink title="Lista de Ventas" :go="{ name: 'sales.index' }" />
          <NavLink title="Agregar Venta" :go="{ name: 'sales.create' }" />
        </NavLinkCollapsed>
        <!--------------------------- fin de Transacciones ---------------------------->

        <!--------------------------- Usuario ---------------------------->
        <div class="sidenav-menu-heading">Usuario</div>

        <!-- Cuentas -->
        <NavLink title="Cuentas" feather-icon="users" :go="{ name: 'auth.accounts' }" />

        <!-- Perfil -->
        <NavLink title="Perfil" feather-icon="settings" :go="{ name: 'auth.accounts' }" />

        <!-- Salir -->
        <NavLink title="Salir" feather-icon="log-out" :callback="logout" />
        <!--------------------------- fin de Usuario ---------------------------->

      </div>
    </div>
    <!-- Sidenav Footer-->
    <div class="sidenav-footer">
      <div class="sidenav-footer-content">
        <div class="sidenav-footer-subtitle">Conectado como:</div>
        <div class="sidenav-footer-title">
          {{ user.name }}
        </div>
      </div>
    </div>
  </nav>
</template>
