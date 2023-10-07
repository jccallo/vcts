<script setup lang="ts">
import { onMounted } from 'vue';
import { useDatatable } from '@/composables'
import { Sale } from '@/interfaces';

import {
  Info,
  Pagination,
  StatusType,
  EditLink,
  DeleteLink,
  ShowLink,
} from '@/components/Datatable'

const {
  data: sales,
  links,
  from,
  to,
  total,
  page,
  perpage,
  query,
  loadURL
} = useDatatable<Sale>('sales')

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
              Lista de Ventas
            </h1>
          </div>
          <div class="col-12 col-xl-auto mb-3">
            <routerLink
              class="btn btn-sm btn-light text-primary"
              :to="{ name: 'sales.create' }"
            >
              <vue-feather
                type="user-plus"
                size="16"
                class="me-1"
              ></vue-feather>
              Agregar Nueva Venta
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
                  <th>Fecha de Venta</th>
                  <th>Monto Total</th>
                  <th>N° de Cuotas</th>
                  <th>Intereses</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody class="datatable-content">
                <tr
                  v-if="sales.length > 0"
                  v-for="sale in sales"
                  :key="sale.id"
                >
                  <td>{{ sale.sales_date }}</td>
                  <td>{{ sale.amount }}</td>
                  <td>{{ sale.installments }}</td>
                  <td>{{ sale.interest_free }}</td>
                  <td><StatusType :is-active="sale.status" /></td>
                  <td>
                    <ShowLink :go="{ name: 'users.index' }" />
                    <EditLink :go="{ name: 'users.index' }" />
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
                v-if="sales.length > 0"
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
                route-name="sales.index"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
