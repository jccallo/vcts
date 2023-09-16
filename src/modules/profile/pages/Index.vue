<script setup lang="ts">
import { useProfile } from '../composables/useProfile'

const { profiles, links, from, to, total, perpage, query, goTo } = useProfile()
</script>

<template>
  <header
    class="page-header page-header-compact page-header-light border-bottom bg-white mb-4"
  >
    <div class="container-fluid px-4">
      <div class="page-header-content">
        <div class="row align-items-center justify-content-between pt-3">
          <div class="col-auto mb-3">
            <h1 class="page-header-title">
              <div class="page-header-icon"><vue-feather type="users" size="16"></vue-feather></div>
              Lista de Empleados
            </h1>
          </div>
          <div class="col-12 col-xl-auto mb-3">
            <a
              class="btn btn-sm btn-light text-primary"
              href="user-management-groups-list.html"
            >
              <i class="me-1" data-feather="users"></i>
              Manage Groups
            </a>
            <a
              class="btn btn-sm btn-light text-primary"
              href="user-management-add-user.html"
            >
              <i class="me-1" data-feather="user-plus"></i>
              Agregar Nuevo Empleado
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- Main page content-->
  <div class="container-fluid px-4">
    <div class="card">
      <div class="card-body">
        <!-- datatable -->
        <div
          class="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns"
        >
          <!-- cabecera -->
          <div class="datatable-top">
            <div class="datatable-dropdown">
              <label>
                <select class="datatable-selector" v-model="perpage">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                </select>
                entradas por página
              </label>
            </div>
            <div class="datatable-search">
              <input
                class="datatable-input"
                placeholder="Buscar..."
                type="search"
                title="Search within table"
                v-model="query"
              />
            </div>
          </div>
          <!-- listado -->
          <div class="datatable-container" style="overflow-x: auto">
            <table class="datatable-table">
              <thead>
                <tr>
                  <th>
                    <button class="datatable-sorter">Nombre</button>
                  </th>
                  <th>
                    <button class="datatable-sorter">Correo</button>
                  </th>
                  <th>
                    <button class="datatable-sorter">Teléfono</button>
                  </th>
                  <th>
                    <button class="datatable-sorter">Dni</button>
                  </th>
                  <th>
                    <button class="datatable-sorter">Estado</button>
                  </th>
                  <th>
                    <button class="datatable-sorter">Acciones</button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="profiles.length > 0" v-for="profile in profiles" key="profile.id">
                  <td>
                    <div class="d-flex align-items-center">
                      <div class="avatar me-2">
                        <img
                          class="avatar-img img-fluid"
                          src="../../../assets/img/illustrations/profiles/profile-1.png"
                        />
                      </div>
                      {{ profile.name }}
                    </div>
                  </td>
                  <td>{{ profile.email }}</td>
                  <td>{{ profile.phone }}</td>
                  <td>
                    {{ profile.document_number }}
                  </td>
                  <td>
                    <span
                      class="badge"
                      :class="profile.status === '1' ? 'bg-green-soft text-green': 'bg-yellow-soft text-yellow'"
                      >{{
                        profile.status === '1' ? 'Activo' : 'Inactivo'
                      }}</span
                    >
                  </td>
                  <td>
                    <routerLink
                      class="btn btn-datatable btn-icon btn-transparent-dark me-2 fixed-btn-transparent-dark"
                      :to="{ name: 'profiles.index' }"
                      ><vue-feather type="edit" size="16" ></vue-feather>
                    </routerLink>
                    <routerLink
                      class="btn btn-datatable btn-icon btn-transparent-dark fixed-btn-transparent-dark"
                      :to="{ name: 'profiles.index' }"
                      ><vue-feather type="trash-2" size="16"></vue-feather>
                    </routerLink>
                  </td>
                </tr>
                <tr v-else><td class="datatable-empty" colspan="6">No se encontraron entradas</td></tr>
              </tbody>
            </table>
          </div>
          <!-- footer -->
          <div class="datatable-bottom">
            <div v-if="profiles.length > 0" class="datatable-info">Mostrando {{ from }} a {{ to }} de {{ total }} entradas</div>
            <nav class="datatable-pagination">
              <ul class="datatable-pagination-list">
                <li
                  class="datatable-pagination-list-item"
                  v-if="links.length > 3"
                  v-for="(link, index) in links"
                  :key="index"
                  :class="{
                    'datatable-active': link.active,
                    'datatable-hidden': !link.url,
                    'datatable-disabled': !link.url,
                  }"
                >
                  <button v-if="link.url"
                    class="datatable-pagination-list-item-link"
                    @click.prevent="goTo(link.url)"
                  ><span v-html="link.label"></span></button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <!-- /datatable -->
      </div>
    </div>
  </div>
</template>