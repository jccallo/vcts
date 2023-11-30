<script setup lang="ts">
import { $http } from '@/services';
import { useCreate } from '../composables'

const { validationErrors, userForm, imageState, onImageChange, createUser } = useCreate()
</script>

<template>
  <header
    class="page-header page-header-compact page-header-light border-bottom bg-white mb-4"
  >
    <div class="container-xl px-4">
      <div class="page-header-content">
        <div class="row align-items-center justify-content-between pt-3">
          <div class="col-auto mb-3">
            <h1 class="page-header-title">
              <div class="page-header-icon">
                <vue-feather type="user-plus" size="16"></vue-feather>
              </div>
              Agregar Empleado
            </h1>
          </div>
          <div class="col-12 col-xl-auto mb-3">
            <routerLink
              class="btn btn-sm btn-light text-primary"
              :to="{ name: 'users.index' }"
            >
              <vue-feather
                type="arrow-left"
                size="16"
                class="me-1"
              ></vue-feather>
              Volver a la lista de empleados
            </routerLink>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- Main page content-->
  <div class="container-xl px-4 mt-4">
    <div class="row">
      <div class="col-xl-4">
        <!-- Profile picture card-->
        <div class="card mb-4 mb-xl-0">
          <div class="card-header">Imagen de Perfil</div>
          <div class="card-body text-center">
            <!-- Profile picture image-->
            <img
              class="img-account-profile rounded-circle mb-2"
              width="160"
              v-if="imageState.url"
              :src="imageState.url"
              alt="Foto de Perfil"
            />
            <img
              class="img-account-profile rounded-circle mb-2"
              width="160"
              v-else
              src="../../../assets/img/demo/user-placeholder.svg"
              alt="Foto de Perfil"
            />
            <!-- Profile picture help block-->
            <div class="small font-italic text-muted mb-4">
              JPG o PNG no mayor a 2 MB
            </div>
            <!-- Profile picture upload button-->
            <input
              class="form-control mb-3"
              type="file"
              accept=".jpg, .jpeg, .png"
              @change="onImageChange"
            />
            <!-- <button class="btn btn-primary" type="button">Guardar imagen</button> -->
          </div>
        </div>
      </div>
      <div class="col-xl-8">
        <!-- Account details card-->
        <div class="card mb-4">
          <div class="card-header">Detalles de la Cuenta</div>
          <div class="card-body">
            <!-- Form Row-->
            <div class="row gx-3">
              <!-- Form Group -->
              <div class="col-md-6 mb-3">
                <label class="small mb-1" for="email"
                  >Correo electrónico*</label
                >
                <input
                  class="form-control"
                  :class="{ 'is-invalid': validationErrors?.email }"
                  id="email"
                  type="email"
                  v-model="userForm.email"
                />
                <span v-if="validationErrors?.email" class="invalid-feedback">
                  {{ validationErrors.email[0] }}
                </span>
              </div>

              <!-- Form Group -->
              <div class="col-md-6 mb-3">
                <label class="small mb-1" for="password">Contraseña*</label>
                <input
                  class="form-control"
                  :class="{ 'is-invalid': validationErrors?.password }"
                  id="password"
                  type="text"
                  v-model="userForm.password"
                />
                <span
                  v-if="validationErrors?.password"
                  class="invalid-feedback"
                >
                  {{ validationErrors.password[0] }}
                </span>
              </div>

              <!-- Form Group -->
              <div class="col-md-6 mb-3">
                <label class="small mb-1">Admin</label>
                <select
                  class="form-select"
                  :class="{ 'is-invalid': validationErrors?.admin }"
                  v-model="userForm.admin"
                >
                  <option selected disabled>Seleccionar:</option>
                  <option value="true">Si</option>
                  <option value="false">No</option>
                </select>
                <span v-if="validationErrors?.admin" class="invalid-feedback">
                  {{ validationErrors.admin[0] }}
                </span>
              </div>

              <!-- Form Group -->
              <div class="col-md-6 mb-3">
                <label class="small mb-1">Estado</label>
                <select
                  class="form-select"
                  :class="{ 'is-invalid': validationErrors?.status }"
                  v-model="userForm.status"
                >
                  <option selected disabled>Seleccionar:</option>
                  <option value="1">Activo</option>
                  <option value="0">Inactivo</option>
                </select>
                <span v-if="validationErrors?.status" class="invalid-feedback">
                  {{ validationErrors.status[0] }}
                </span>
              </div>

              <!-- Form Group -->
              <div class="col-md-6 mb-3">
                <label class="small mb-1" for="name">Nombre completo</label>
                <input
                  class="form-control"
                  :class="{ 'is-invalid': validationErrors?.name }"
                  id="name"
                  type="text"
                  v-model="userForm.name"
                />
                <span v-if="validationErrors?.name" class="invalid-feedback">
                  {{ validationErrors.name[0] }}
                </span>
              </div>

              <!-- Form Group -->
              <div class="col-md-6 mb-3">
                <label class="small mb-1" for="document_number"
                  >N° de documento</label
                >
                <input
                  class="form-control"
                  :class="{ 'is-invalid': validationErrors?.document_number }"
                  id="document_number"
                  type="number"
                  v-model="userForm.document_number"
                />
                <span
                  v-if="validationErrors?.document_number"
                  class="invalid-feedback"
                >
                  {{ validationErrors.document_number[0] }}
                </span>
              </div>

              <!-- Form Group -->
              <div class="col-md-6 mb-3">
                <label class="small mb-1" for="phone">Teléfono</label>
                <input
                  class="form-control"
                  :class="{ 'is-invalid': validationErrors?.phone }"
                  id="phone"
                  type="number"
                  v-model="userForm.phone"
                />
                <span v-if="validationErrors?.phone" class="invalid-feedback">
                  {{ validationErrors.phone[0] }}
                </span>
              </div>

              <!-- Form Group -->
              <div class="col-md-6 mb-3">
                <label class="small mb-1" for="inputLastName"
                  >Fecha de Nacimiento</label
                >
                <input
                  class="form-control jc-date-input"
                  :class="{ 'is-invalid': validationErrors?.birthdate }"
                  id="inputLastName"
                  type="date"
                  v-model="userForm.birthdate"
                />
                <span
                  v-if="validationErrors?.birthdate"
                  class="invalid-feedback"
                >
                  {{ validationErrors.birthdate[0] }}
                </span>
              </div>

              <!-- Form Group -->
              <div class="col-md-12 mb-3">
                <label class="small mb-1" for="address">Dirección</label>
                <input
                  class="form-control"
                  :class="{ 'is-invalid': validationErrors?.address }"
                  id="address"
                  type="text"
                  v-model="userForm.address"
                />
                <span
                  v-if="validationErrors?.address"
                  class="invalid-feedback"
                >
                  {{ validationErrors.address[0] }}
                </span>
              </div>
            </div>
            <!-- Submit button-->
            <button class="btn btn-primary" :disabled="$http.isLoading.value" @click.prevent="createUser">
              Agregar usuario
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <pre>{{ userForm }}</pre>
</template>
