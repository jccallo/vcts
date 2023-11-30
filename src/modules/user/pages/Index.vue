<script setup lang="ts">
import { Header, Info, Link, Pagination, UserType, StatusType } from '@/components/Datatable'
import { useDatatable } from '@/composables'
import { User } from '@/interfaces'
import { onMounted } from 'vue'

const { data, links, from, to, total, perpage, query, direction, field, loadURL, setSort } = useDatatable<User>('/users', 'users.index')

onMounted(async () => {
   await loadURL()
})
</script>

<template>
   <header class="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
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
                  <routerLink class="btn btn-sm btn-light text-primary" :to="{ name: 'users.create' }">
                     <vue-feather type="user-plus" size="16" class="me-1"></vue-feather>
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
                        registros por página
                     </label>
                  </div>
                  <div class="col-xs-12 col-md-6 text-md-end mb-3">
                     <input type="email" class="form-control datatable-field" placeholder="Buscar..." v-model="query" />
                  </div>
               </div>
               <div class="table-responsive">
                  <table class="table table-bordered table-hover datatable-table">
                     <thead>
                        <tr>
                           <Header title="Nombre Completo" :direction="direction" :field="field" column="name" :callback="() => setSort('name')"></Header>
                           <Header title="Correo" :direction="direction" :field="field" column="email" :callback="() => setSort('email')"></Header>
                           <Header title="Tipo de Usuario" :direction="direction" :field="field" column="admin" :callback="() => setSort('admin')"></Header>
                           <Header title="Estado" :direction="direction" :field="field" column="status" :callback="() => setSort('status')"></Header>
                           <th>Acciones</th>
                        </tr>
                     </thead>
                     <tbody class="datatable-content">
                        <tr v-if="data" v-for="user in data" :key="user.id">
                           <td>{{ user.name }}</td>
                           <td>{{ user.email }}</td>
                           <td><UserType :is-admin="user.admin" /></td>
                           <td><StatusType :is-active="user.status" /></td>
                           <td class="jc-action-width">
                              <Link feather-icon="eye" :go="{ name: 'customers.show', params: { id: user.id } }" />
                              <Link feather-icon="edit" :go="{ name: 'customers.edit', params: { id: user.id } }" />
                              <Link feather-icon="trash-2" />
                           </td>
                        </tr>
                        <tr v-else>
                           <td class="text-center" colspan="6">No se encontraron registros</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
               <div class="row">
                  <div class="col-xs-12 col-md-6 mb-sm-2 mb-md-0 pt-2">
                     <Info v-if="data" :from="from" :to="to" :total="total" />
                  </div>
                  <div class="col-xs-12 col-md-6 d-flex justify-content-md-end mb-0">
                     <Pagination :links="links" :perpage="perpage" :query="query" :field="field" :direction="direction" route-name="users.index" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
