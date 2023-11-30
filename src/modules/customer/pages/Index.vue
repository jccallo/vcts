<script setup lang="ts">
import { Header, Info, Link, MoreLink, OptionLink, Pagination, StatusType } from '@/components/Datatable'
import { useDatatable } from '@/composables'
import { Customer } from '@/interfaces'
import { onMounted } from 'vue'

const { data, links, from, to, total, perpage, query, direction, field, loadURL, setSort } = useDatatable<Customer>('/customers', 'customers.index')

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
                     <div class="page-header-icon"><vue-feather type="users" size="16"></vue-feather></div>
                     Lista de Clientes
                  </h1>
               </div>
               <div class="col-12 col-xl-auto mb-3">
                  <a class="btn btn-sm btn-light text-primary" href="user-management-groups-list.html">
                     <i class="me-1" data-feather="users"></i>
                     Manage Groups
                  </a>
                  <a class="btn btn-sm btn-light text-primary" href="user-management-add-user.html">
                     <i class="me-1" data-feather="user-plus"></i>
                     Agregar Nuevo Cliente
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
                  <div class="col-xs-12 col-md-6 mb-3">
                     <div class="d-flex align-content-center justify-content-md-end">
                        <input type="email" class="form-control datatable-field" placeholder="Buscar..." v-model="query" />
                     </div>
                  </div>
               </div>
               <div class="table-responsive">
                  <table class="table table-bordered table-hover datatable-table">
                     <thead>
                        <tr>
                           <Header title="Nombres" :direction="direction" :field="field" column="firstname" :callback="() => setSort('firstname')"></Header>
                           <Header title="Apellidos" :direction="direction" :field="field" column="lastname" :callback="() => setSort('lastname')"></Header>
                           <Header title="Dni" :direction="direction" :field="field" column="document_number" :callback="() => setSort('document_number')"></Header> 
                           <Header title="Telefono" :direction="direction" :field="field" column="phone" :callback="() => setSort('phone')"></Header> 
                           <Header title="Correo" :direction="direction" :field="field" column="email" :callback="() => setSort('email')"></Header> 
                           <Header title="Estado" :direction="direction" :field="field" column="status" :callback="() => setSort('status')"></Header>
                           <th>Acciones</th>
                        </tr>
                     </thead>
                     <tbody class="datatable-content">
                        <tr v-if="data" v-for="customer in data" :key="customer.id">
                           <td>{{ customer.firstname }}</td>
                           <td>{{ customer.lastname }}</td>
                           <td>{{ customer.document_number }}</td>
                           <td>{{ customer.phone }}</td>
                           <td>{{ customer.email }}</td>
                           <td><StatusType :is-active="customer.status" /></td>
                           <td class="jc-action-width">
                              <Link feather-icon="eye" :go="{ name: 'customers.show', params: { id: customer.id } }" />
                              <Link feather-icon="edit" :go="{ name: 'customers.edit', params: { id: customer.id } }" />
                              <Link feather-icon="trash-2" />
                              <MoreLink id="more" feather-icon="more-vertical">
                                 <OptionLink title="Tajetas" feather-icon="credit-card" :go="{ name: 'customers.cards.create', params: { id: customer.id } }" />
                              </MoreLink>
                           </td>
                        </tr>
                        <tr v-else>
                           <td class="text-center" colspan="6">No se encontraron entradas</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
               <div class="row">
                  <div class="col-xs-12 col-md-6 mb-sm-2 mb-md-0 pt-2">
                     <Info v-if="data" :from="from" :to="to" :total="total" />
                  </div>
                  <div class="col-xs-12 col-md-6 d-flex justify-content-md-end mb-0">
                     <Pagination :links="links" :perpage="perpage" :query="query" :field="field" :direction="direction" route-name="customers.index" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
