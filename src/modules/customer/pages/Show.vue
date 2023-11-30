<script setup lang="ts">
import { useRoute } from 'vue-router'
import { Pluck } from '@/interfaces'
import { useEdit } from '../composables'
import { $helper, useCustomers } from '@/services'
import { onMounted } from 'vue';

const route = useRoute()
const { customerForm, locations } = useEdit()



onMounted(async() => {
   const { customers, getAllCustomers } = useCustomers()
   await getAllCustomers()
   console.log('customers', customers.list)
})
</script>

<template>
   <header class="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
      <div class="container-xl px-4">
         <div class="page-header-content">
            <div class="row align-items-center justify-content-between pt-3">
               <div class="col-auto mb-3">
                  <h1 class="page-header-title">
                     <div class="page-header-icon"><i data-feather="user-plus"></i></div>
                     Editar Cliente
                  </h1>
               </div>
               <div class="col-12 col-xl-auto mb-3">
                  <routerLink class="btn btn-sm btn-light text-primary" :to="{ name: 'customers.index' }">
                     <vue-feather type="arrow-left" size="16" class="me-1"></vue-feather>
                     Volver a la lista de clientes
                  </routerLink>
               </div>
            </div>
         </div>
      </div>
   </header>
   <!-- Main page content-->
   <div class="container-xl px-4 mt-4">
      <div class="row">
         <div class="col">
            <!-- Account details card-->
            <div class="card mb-4">
               <div class="card-header">Formulario de Cliente</div>
               <div class="card-body">
                  <!-- Form Row-->
                  <div class="row gx-3">
                     <!-- Form Group -->
                     <div class="col-md-6">
                        <div class="mb-3">
                           <label class="small mb-1">Nombres</label>
                           <input class="form-control" type="text" readonly :value="customerForm.firstname" />
                        </div>
                     </div>
                     <!-- Form Group -->
                     <div class="col-md-6">
                        <div class="mb-3">
                           <label class="small mb-1">Apellidos</label>
                           <input class="form-control" type="text" readonly :value="customerForm.lastname" />
                        </div>
                     </div>

                     
                     <!-- Form Group -->
                     <div class="col-md-3">
                        <div class="mb-3">
                           <label class="small mb-1">Código</label>
                           <input class="form-control jc-code" type="text" readonly :value="customerForm.customer_code" />
                        </div>
                     </div>
                     <!-- Form Group -->
                     <div class="col-md-3">
                        <div class="mb-3">
                           <label class="small mb-1">N° Documento</label>
                           <input class="form-control" type="text" readonly :value="customerForm.document_number" />
                        </div>
                     </div>
                     <!-- Form Group -->
                     <div class="col-md-3">
                        <div class="mb-3">
                           <label class="small mb-1">Fecha de Nacimiento</label>
                           <input class="form-control jc-date-input" readonly type="date" :value="customerForm.birthdate" />
                        </div>
                     </div>
                     <!-- Form Group -->
                     <div class="col-md-3">
                        <div class="mb-3">
                           <label class="small mb-1">Telefono</label>
                           <input class="form-control" type="number" readonly :value="customerForm.phone" />
                        </div>
                     </div>

                     <!-- Form Group -->
                     <div class="col-md-6">
                        <div class="mb-3">
                           <label class="small mb-1">Correo</label>
                           <input class="form-control" type="email" readonly :value="customerForm.email" />
                        </div>
                     </div>
                     <!-- Form Group -->
                     <div class="col-md-6">
                        <div class="mb-3">
                           <label class="small mb-1">Direccion</label>
                           <input class="form-control" type="text" readonly :value="customerForm.address" />
                        </div>
                     </div>
                     <!-- Form Group -->
                     <div class="col-md-6">
                        <div class="mb-3">
                           <label class="small mb-1">Referencia</label>
                           <input class="form-control" type="text" readonly :value="customerForm.reference" />
                        </div>
                     </div>
                     <!-- Form Group -->
                     <div class="col-md-6">
                        <div class="mb-3">
                           <label class="small mb-1">Estado</label>
                           <input class="form-control" type="text" readonly :value="$helper.getActiveName(customerForm.status)" />
                        </div>
                     </div>
                     <!-- Form Group -->
                     <div class="col-md-4">
                        <div class="mb-3">
                           <label class="small mb-1">Departamento</label>
                           <v-select
                              disabled
                              class="style-chooser jc-border-select"
                              v-model="customerForm.department_id"
                              :options="locations.departments"
                              :reduce="(department: Pluck) => department.id"
                              label="name"
                           />
                        </div>
                     </div>
                     <!-- Form Group -->
                     <div class="col-md-4">
                        <div class="mb-3">
                           <label class="small mb-1">Provincia</label>
                           <v-select
                              disabled
                              class="style-chooser jc-border-select"
                              v-model="customerForm.province_id"
                              :options="locations.provinces"
                              :reduce="(province: Pluck) => province.id"
                              label="name"
                           />
                        </div>
                     </div>
                     <!-- Form Group -->
                     <div class="col-md-4">
                        <div class="mb-3">
                           <label class="small mb-1">Distrito</label>
                           <v-select
                              disabled
                              class="style-chooser jc-border-select"
                              v-model="customerForm.district_id"
                              :options="locations.districts"
                              :reduce="(district: Pluck) => district.id"
                              label="name"
                           />
                        </div>
                     </div>
                  </div>
                  <routerLink class="btn btn-primary" type="button" :to="{ name: 'customers.edit', params: { id: route.params.id } }">Ir a editar</routerLink>
               </div>
            </div>
         </div>
      </div>
   </div>
   <pre>{{ customerForm }}</pre>
   <pre>{{ locations }}</pre>
</template>
