<script setup lang="ts">
import { Pluck } from '@/interfaces'
import { useCreate } from '../composables'

const { customerForm, locations, errors, isLoading, save } = useCreate()
</script>

<template>
   <header class="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
      <div class="container-xl px-4">
         <div class="page-header-content">
            <div class="row align-items-center justify-content-between pt-3">
               <div class="col-auto mb-3">
                  <h1 class="page-header-title">
                     <div class="page-header-icon"><i data-feather="user-plus"></i></div>
                     Agregar Cliente
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
                           <input class="form-control" :class="{ 'is-invalid': errors?.firstname }" type="text" v-model="customerForm.firstname" />
                           <span v-if="errors?.firstname" class="invalid-feedback">
                              {{ errors?.firstname[0] }}
                           </span>
                        </div>
                     </div>
                     <!-- Form Group -->
                     <div class="col-md-6">
                        <div class="mb-3">
                           <label class="small mb-1">Apellidos</label>
                           <input class="form-control" :class="{ 'is-invalid': errors?.lastname }" type="text" v-model="customerForm.lastname" />
                           <span v-if="errors?.lastname" class="invalid-feedback">
                              {{ errors?.lastname[0] }}
                           </span>
                        </div>
                     </div>
                     <!-- Form Group -->
                     <div class="col-md-4">
                        <div class="mb-3">
                           <label class="small mb-1">N° Documento</label>
                           <input class="form-control" :class="{ 'is-invalid': errors?.document_number }" type="number" v-model="customerForm.document_number" />
                           <span v-if="errors?.document_number" class="invalid-feedback">
                              {{ errors?.document_number[0] }}
                           </span>
                        </div>
                     </div>

                     <!-- Form Group -->
                     <div class="col-md-4">
                        <div class="mb-3">
                           <label class="small mb-1">Fecha de Nacimiento</label>
                           <input class="form-control jc-date-input" :class="{ 'is-invalid': errors?.birthdate }" type="date" v-model="customerForm.birthdate" />
                           <span v-if="errors?.birthdate" class="invalid-feedback">
                              {{ errors?.birthdate[0] }}
                           </span>
                        </div>
                     </div>
                     <!-- Form Group -->
                     <div class="col-md-4">
                        <div class="mb-3">
                           <label class="small mb-1">Telefono</label>
                           <input class="form-control" :class="{ 'is-invalid': errors?.phone }" type="number" v-model="customerForm.phone" />
                           <span v-if="errors?.phone" class="invalid-feedback">
                              {{ errors?.phone[0] }}
                           </span>
                        </div>
                     </div>
                     <!-- Form Group -->
                     <div class="col-md-6">
                        <div class="mb-3">
                           <label class="small mb-1">Correo</label>
                           <input class="form-control" :class="{ 'is-invalid': errors?.email }" type="email" v-model="customerForm.email" />
                           <span v-if="errors?.email" class="invalid-feedback">
                              {{ errors?.email[0] }}
                           </span>
                        </div>
                     </div>
                     <!-- Form Group -->
                     <div class="col-md-6">
                        <div class="mb-3">
                           <label class="small mb-1">Direccion</label>
                           <input class="form-control" :class="{ 'is-invalid': errors?.address }" type="text" v-model="customerForm.address" />
                           <span v-if="errors?.address" class="invalid-feedback">
                              {{ errors?.address[0] }}
                           </span>
                        </div>
                     </div>
                     <!-- Form Group -->
                     <div class="col-md-6">
                        <div class="mb-3">
                           <label class="small mb-1">Referencia</label>
                           <input class="form-control" :class="{ 'is-invalid': errors?.reference }" type="text" v-model="customerForm.reference" />
                           <span v-if="errors?.reference" class="invalid-feedback">
                              {{ errors?.reference[0] }}
                           </span>
                        </div>
                     </div>
                     <!-- Form Group -->
                     <div class="col-md-6">
                        <div class="mb-3">
                           <label class="small mb-1">Departamento</label>
                           <v-select
                              class="style-chooser jc-border-select"
                              :class="{ 'jc-is-invalid': errors?.department_id }"
                              placeholder="Seleccionar:"
                              v-model="customerForm.department_id"
                              :options="locations.departments"
                              :reduce="(department: Pluck) => department.id"
                              label="name"
                           />
                           <span v-if="errors?.department_id" class="jc-invalid-feedback">
                              {{ errors?.department_id[0] }}
                           </span>
                        </div>
                     </div>
                     <!-- Form Group -->
                     <div class="col-md-6">
                        <div class="mb-3">
                           <label class="small mb-1">Provincia</label>
                           <v-select
                              class="style-chooser jc-border-select"
                              :class="{ 'jc-is-invalid': errors?.province_id }"
                              placeholder="Seleccionar:"
                              v-model="customerForm.province_id"
                              :options="locations.provinces"
                              :reduce="(province: Pluck) => province.id"
                              label="name"
                           />
                           <span v-if="errors?.province_id" class="jc-invalid-feedback">
                              {{ errors?.province_id[0] }}
                           </span>
                        </div>
                     </div>
                     <!-- Form Group -->
                     <div class="col-md-6">
                        <div class="mb-3">
                           <label class="small mb-1">Distrito</label>
                           <v-select
                              class="style-chooser jc-border-select"
                              :class="{ 'jc-is-invalid': errors?.district_id }"
                              placeholder="Seleccionar:"
                              v-model="customerForm.district_id"
                              :options="locations.districts"
                              :reduce="(district: Pluck) => district.id"
                              label="name"
                           />
                           <span v-if="errors?.district_id" class="jc-invalid-feedback">
                              {{ errors?.district_id[0] }}
                           </span>
                        </div>
                     </div>

                     <!-- Form Group -->
                     <!-- <div class="col-md-6">
                        <div class="mb-3">
                           <label class="small mb-1">Email address</label>
                           <input
                              class="form-control is-invalid"
                              type="email"
                           />
                           <span class="invalid-feedback">
                              Lorem ipsum dolor sit amet.
                           </span>
                        </div>
                     </div> -->
                     <!-- Form Group -->
                     <!-- <div class="col-md-6 mb-3">
                        <label class="small mb-1">Role</label>
                        <select class="form-select" aria-label="Default select example">
                           <option selected disabled>Select a role:</option>
                           <option value="administrator">Administrator</option>
                           <option value="registered">Registered</option>
                           <option value="edtior">Editor</option>
                           <option value="guest">Guest</option>
                        </select>
                     </div> -->
                  </div>
                  <!-- Submit button-->
                  <button class="btn btn-primary" type="button" :disabled="isLoading" @click.prevent="save">Agregar cliente</button>
               </div>
            </div>
         </div>
      </div>
   </div>
   <pre>{{ customerForm }}</pre>
   <pre>{{ locations }}</pre>
</template>
