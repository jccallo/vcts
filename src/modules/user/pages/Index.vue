<script setup lang="ts">
import { onMounted } from 'vue'
import { useDatatable } from '@/composables'

import {
  Info,
  Pagination,
  StatusType,
  UserType,
  EditLink,
  DeleteLink,
  ShowLink,
} from '@/components/Datatable'
import { User } from '../interfaces';

const {
  data: users,
  links,
  from,
  to,
  total,
  page,
  perpage,
  query,
  loadURL,
} = useDatatable<User>('users')

onMounted(async () => {
  await loadURL()
})
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
              <div class="page-header-icon">
                <vue-feather type="users" size="16"></vue-feather>
              </div>
              Lista de Usuarios
            </h1>
          </div>
          <div class="col-12 col-xl-auto mb-3">
            <routerLink
              class="btn btn-sm btn-light text-primary"
              :to="{ name: 'users.create' }"
            >
              <vue-feather
                type="user-plus"
                size="16"
                class="me-1"
              ></vue-feather>
              Agregar Nuevo Usuario
            </routerLink>
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
        <div class="datatable">
          <div class="row">
            <div class="col-xs-12 col-md-6 mb-3">
              <label>
                <select class="form-select datatable-field" v-model="perpage">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                </select>
                entradas por página
              </label>
            </div>
            <div class="col-xs-12 col-md-6 text-md-end mb-3">
              <input
                type="email"
                class="form-control datatable-field"
                placeholder="Buscar..."
                v-model="query"
              />
            </div>
          </div>
          <div class="table-responsive">
            <table class="table table-bordered table-hover datatable-table">
              <thead>
                <tr>
                  <th>Nombre Completo</th>
                  <th>Correo</th>
                  <th>Tipo de Usuario</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody class="datatable-content">
                <tr
                  v-if="users.length > 0"
                  v-for="user in users"
                  :key="user.id"
                >
                  <td>{{ user.email }}</td>
                  <td>{{ user.email }}</td>
                  <td><UserType :is-admin="user.admin" /></td>
                  <td><StatusType :is-active="user.status" /></td>
                  <td>
                    <ShowLink :go="{ name: 'users.edit', params: { id: user.id } }" />
                    <EditLink :go="{ name: 'users.edit', params: { id: user.id } }" />
                    <DeleteLink :go="{ name: 'users.index' }" />
                  </td>
                </tr>
                <tr v-else>
                  <td class="text-center" colspan="6">
                    No se encontraron entradas
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-6 mb-sm-2 mb-md-0 pt-2">
              <Info
                v-if="users.length > 0"
                :from="from"
                :to="to"
                :total="total"
              />
            </div>
            <div class="col-xs-12 col-md-6 d-flex justify-content-md-end mb-0">
              <Pagination
                :links="links"
                :page="page"
                :perpage="perpage"
                :query="query"
                route-name="users.index"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
