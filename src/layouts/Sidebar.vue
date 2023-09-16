<script setup lang="ts">
import { useLogout } from '@/modules/auth/composables'
import { useSessionStore } from '@/modules/auth/stores';

const session = useSessionStore()
const { logout } = useLogout()
</script>

<template>
  <nav class="sidenav shadow-right sidenav-light">
    <div class="sidenav-menu">
      <div class="nav accordion" id="accordionSidenav">
        <!-- Sidenav Menu Heading (Account)-->
        <!-- * * Note: * * Visible only on and above the sm breakpoint-->
        <div class="sidenav-menu-heading d-sm-none">Cuenta</div>
        <!-- Sidenav Link (Alerts)-->
        <!-- * * Note: * * Visible only on and above the sm breakpoint-->
        <a class="nav-link d-sm-none" href="#!">
          <div class="nav-link-icon"><i data-feather="bell"></i></div>
          Alertas
          <span class="badge bg-warning-soft text-warning ms-auto">4 New!</span>
        </a>
        <!-- Sidenav Link (Messages)-->
        <!-- * * Note: * * Visible only on and above the sm breakpoint-->
        <a class="nav-link d-sm-none" href="#!">
          <div class="nav-link-icon"><i data-feather="mail"></i></div>
          Mensajes
          <span class="badge bg-success-soft text-success ms-auto">2 New!</span>
        </a>

        <!-- Sede -->
        <div class="sidenav-menu-heading">Sede los Olivos</div>

        <!-- Dashboard -->
        <router-link :to="{ name: 'dashboard.index' }" class="nav-link" href="charts.html">
          <div class="nav-link-icon"><vue-feather type="activity" size="16"></vue-feather></div>
          Dashboard
        </router-link>

        <!-- Modulos-->
        <div class="sidenav-menu-heading">Mantenimiento</div>

        <!-- Empleados-->
        <a class="nav-link collapsed" href="javascript:void(0);" data-bs-toggle="collapse"
          data-bs-target="#collapseEmployees" aria-expanded="false" aria-controls="collapseEmployees">
          <div class="nav-link-icon"><vue-feather type="users" size="16"></vue-feather></div>
          Empleados
          <div class="sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
        </a>
        <div class="collapse" id="collapseEmployees" data-bs-parent="#accordionSidenav">
          <nav class="sidenav-menu-nested nav accordion" id="accordionSidenavPagesMenu">
            <router-link :to="{ name: 'profiles.index' }" class="nav-link">Lista de Ventas</router-link>
            <router-link :to="{ name: 'profiles.create' }" class="nav-link">Agregar Empleado</router-link>
          </nav>
        </div>

        <!-- clientes-->
        <a class="nav-link collapsed" href="javascript:void(0);" data-bs-toggle="collapse" data-bs-target="#collapseCustomers"
          aria-expanded="false" aria-controls="collapseCustomers">
          <div class="nav-link-icon"><vue-feather type="users" size="16"></vue-feather></div>
          Clientes
          <div class="sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
        </a>
        <div class="collapse" id="collapseCustomers" data-bs-parent="#accordionSidenav">
          <nav class="sidenav-menu-nested nav accordion" id="accordionSidenavPagesMenu">
            <router-link :to="{ name: 'customers.index' }" class="nav-link">Lista de Clientes</router-link>
            <a class="nav-link" href="invoice.html">Agregar Cliente</a>
          </nav>
        </div>

        <!-- Beneficiarios -->
        <a class="nav-link collapsed" href="javascript:void(0);" data-bs-toggle="collapse" data-bs-target="#collapseBeneficiaries"
          aria-expanded="false" aria-controls="collapseBeneficiaries">
          <div class="nav-link-icon"><vue-feather type="users" size="16"></vue-feather></div>
          Beneficiarios
          <div class="sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
        </a>
        <div class="collapse" id="collapseBeneficiaries" data-bs-parent="#accordionSidenav">
          <nav class="sidenav-menu-nested nav accordion" id="accordionSidenavPagesMenu">
            <router-link :to="{ name: 'dashboard.index' }" class="nav-link">Lista de Beneficiarios</router-link>
            <router-link :to="{ name: 'dashboard.index' }" class="nav-link">Agregar Beneficiario</router-link>
          </nav>
        </div>

        <!-- Bancos -->
        <a class="nav-link collapsed" href="javascript:void(0);" data-bs-toggle="collapse" data-bs-target="#collapseBanks"
          aria-expanded="false" aria-controls="collapseBanks">
          <div class="nav-link-icon"><vue-feather type="dollar-sign" size="16"></vue-feather></div>
          Bancos
          <div class="sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
        </a>
        <div class="collapse" id="collapseBanks" data-bs-parent="#accordionSidenav">
          <nav class="sidenav-menu-nested nav accordion" id="accordionSidenavPagesMenu">
            <router-link :to="{ name: 'dashboard.index' }" class="nav-link">Lista de Bancos</router-link>
            <router-link :to="{ name: 'dashboard.index' }" class="nav-link">Agregar Banco</router-link>
          </nav>
        </div>

        <!-- Sedes-->
        <a class="nav-link collapsed" href="javascript:void(0);" data-bs-toggle="collapse" data-bs-target="#collapseBranches"
          aria-expanded="false" aria-controls="collapseBranches">
          <div class="nav-link-icon"><vue-feather type="flag" size="16"></vue-feather></div>
          Sedes
          <div class="sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
        </a>
        <div class="collapse" id="collapseBranches" data-bs-parent="#accordionSidenav">
          <nav class="sidenav-menu-nested nav accordion" id="accordionSidenavPagesMenu">
            <router-link :to="{ name: 'dashboard.index' }" class="nav-link">Lista de Usuarios</router-link>
            <router-link :to="{ name: 'dashboard.index' }" class="nav-link">Agregar Usuario</router-link>
          </nav>
        </div>

        <!-- Empresas -->
        <a class="nav-link collapsed" href="javascript:void(0);" data-bs-toggle="collapse" data-bs-target="#collapseCompanies"
          aria-expanded="false" aria-controls="collapseCompanies">
          <div class="nav-link-icon"><vue-feather type="globe" size="16"></vue-feather></div>
          Empresas
          <div class="sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
        </a>
        <div class="collapse" id="collapseCompanies" data-bs-parent="#accordionSidenav">
          <nav class="sidenav-menu-nested nav accordion" id="accordionSidenavPagesMenu">
            <router-link :to="{ name: 'dashboard.index' }" class="nav-link">Lista de Empresas</router-link>
            <router-link :to="{ name: 'dashboard.index' }" class="nav-link">Agregar Empresa</router-link>
          </nav>
        </div>

        <!-- Roles-->
        <a class="nav-link collapsed" href="javascript:void(0);" data-bs-toggle="collapse" data-bs-target="#collapseRoles"
          aria-expanded="false" aria-controls="collapseRoles">
          <div class="nav-link-icon"><vue-feather type="briefcase" size="16"></vue-feather></div>
          Roles
          <div class="sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
        </a>
        <div class="collapse" id="collapseRoles" data-bs-parent="#accordionSidenav">
          <nav class="sidenav-menu-nested nav accordion" id="accordionSidenavPagesMenu">
            <a class="nav-link" href="pricing.html">Lista de Roles</a>
            <a class="nav-link" href="invoice.html">Agregar Rol</a>
          </nav>
        </div>

        <!-- Permisos -->
        <a class="nav-link collapsed" href="javascript:void(0);" data-bs-toggle="collapse"
          data-bs-target="#collapsePermissions" aria-expanded="false" aria-controls="collapsePermissions">
          <div class="nav-link-icon"><vue-feather type="unlock" size="16"></vue-feather></div>
          Permisos
          <div class="sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
        </a>
        <div class="collapse" id="collapsePermissions" data-bs-parent="#accordionSidenav">
          <nav class="sidenav-menu-nested nav accordion" id="accordionSidenavPagesMenu">
            <a class="nav-link" href="pricing.html">Lista de Permisos</a>
            <a class="nav-link" href="invoice.html">Agregar Permiso</a>
          </nav>
        </div>

        <!-- Tipos de documentos -->
        <a class="nav-link collapsed" href="javascript:void(0);" data-bs-toggle="collapse" data-bs-target="#collapseDocuments"
          aria-expanded="false" aria-controls="collapseDocuments">
          <div class="nav-link-icon"><vue-feather type="paperclip" size="16"></vue-feather></div>
          Documentos
          <div class="sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
        </a>
        <div class="collapse" id="collapseDocuments" data-bs-parent="#accordionSidenav">
          <nav class="sidenav-menu-nested nav accordion" id="accordionSidenavPagesMenu">
            <router-link :to="{ name: 'dashboard.index' }" class="nav-link">Lista de documentos</router-link>
            <router-link :to="{ name: 'dashboard.index' }" class="nav-link">Agregar documento</router-link>
          </nav>
        </div>

        <!-- Modulos-->
        <div class="sidenav-menu-heading">Transacciones</div>

        <!-- Ventas-->
        <a class="nav-link collapsed" href="javascript:void(0);" data-bs-toggle="collapse" data-bs-target="#collapseSales"
          aria-expanded="false" aria-controls="collapseSales">
          <div class="nav-link-icon"><vue-feather type="shopping-cart" size="16"></vue-feather></div>
          Ventas
          <div class="sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
        </a>
        <div class="collapse" id="collapseSales" data-bs-parent="#accordionSidenav">
          <nav class="sidenav-menu-nested nav accordion" id="accordionSidenavPagesMenu">
            <router-link :to="{ name: 'sales.index' }" class="nav-link">Lista de Ventas</router-link>
            <router-link :to="{ name: 'sales.create' }" class="nav-link">Agregar Venta</router-link>
          </nav>
        </div>

        <!-- Usuario -->
        <div class="sidenav-menu-heading">Usuario</div>
        <!-- Sidenav Link (Charts)-->
        <a class="nav-link" href="charts.html">
          <div class="nav-link-icon"><vue-feather type="bar-chart" size="16"></vue-feather></div>
          Perfil
        </a>
        <!-- Sidenav Link (Tables)-->
        <span class="nav-link" style="cursor: pointer;" @click.stop="logout">
          <div class="nav-link-icon"><vue-feather type="filter" size="16"></vue-feather></div>
          Salir
        </span>
      </div>
    </div>
    <!-- Sidenav Footer-->
    <div class="sidenav-footer">
      <div class="sidenav-footer-content">
        <div class="sidenav-footer-subtitle">Conectado como:</div>
        <div v-if="session.user" class="sidenav-footer-title">{{ session.user.name }}</div>
      </div>
    </div>
  </nav>
</template>
