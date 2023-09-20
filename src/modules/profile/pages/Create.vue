<script setup lang="ts">
import { useCreateProfile } from '../composables'
const { imageUrl, profileForm, branchNames, roleNames, onImageChange, createProfile } = useCreateProfile()
</script>

<template>
  <header class="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
    <div class="container-xl px-4">
      <div class="page-header-content">
        <div class="row align-items-center justify-content-between pt-3">
          <div class="col-auto mb-3">
            <h1 class="page-header-title">
              <div class="page-header-icon"><vue-feather type="user-plus" size="16"></vue-feather></div>
              Agregar Empleado
            </h1>
          </div>
          <div class="col-12 col-xl-auto mb-3">
            <routerLink class="btn btn-sm btn-light text-primary" :to="{ name: 'profiles.index' }">
              <vue-feather type="arrow-left" size="16" class="me-1"></vue-feather>
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
          <div class="card-header">Foto de Perfil</div>
          <div class="card-body text-center">
            <!-- Profile picture image-->
            <img class="img-account-profile rounded-circle mb-2" v-if="imageUrl" :src="imageUrl" alt="Foto de Perfil" />
            <img class="img-account-profile rounded-circle mb-2" v-else src="../../../assets/img/demo/user-placeholder.svg" alt="Foto de Perfil" />
            <!-- Profile picture help block-->
            <div class="small font-italic text-muted mb-4">JPG o PNG no mayor a 5 MB</div>
            <!-- Profile picture upload button-->
            <input class="form-control mb-3" type="file" accept=".jpg, .jpeg, .png" @change="onImageChange">
            <!-- <button class="btn btn-primary" type="button">Guardar imagen</button> -->
          </div>
        </div>
      </div>
      <div class="col-xl-8">
        <!-- Account details card-->
        <div class="card mb-4">
          <div class="card-header">Detalles de la Cuenta</div>
          <div class="card-body">
            <form @submit.prevent="createProfile">

              <!-- Form Row-->
              <div class="row gx-3">
                <!-- Form Group (fullname)-->
                <div class="col-md-8 mb-3">
                  <label class="small mb-1" for="inputFirstName">Nombres y Apellidos*</label>
                  <input class="form-control" id="inputFirstName" type="text"
                    v-model="profileForm.name" />
                </div>
                <!-- Form Group (telefono)-->
                <div class="col-md-4">
                  <label class="small mb-1" for="inputFirstName">Numero de documento</label>
                  <input class="form-control" id="inputFirstName" type="text"
                    v-model="profileForm.document_number" />
                </div>
                <!-- Form Group (direccion)-->
                <div class="col-md-12 mb-3">
                  <label class="small mb-1" for="inputLastName">Dirección</label>
                  <input class="form-control" id="inputLastName" type="text"
                    v-model="profileForm.address" />
                </div>
                <!-- Form Group (direccion)-->
                <div class="col-md-6 mb-3">
                  <label class="small mb-1" for="inputLastName">Teléfono</label>
                  <input class="form-control" id="inputLastName" type="text"
                    v-model="profileForm.phone" />
                </div>
                <!-- Form Group (genero)-->
                <div class="col-md-6 mb-3">
                  <label class="small mb-1">Género</label>
                  <v-select
                    class="style-chooser"
                    placeholder="Seleccionar:"
                    v-model="profileForm.gender"
                    :options="[{ value: 'M', label: 'Masculino' }, { value: 'F', label: 'Femenino' }]"
                    :reduce="(gender: any) => gender.value"
                    label="label"
                  />
                </div>
                <!-- Form Group (fecha de nacimiento)-->
                <div class="col-md-6 mb-3">
                  <label class="small mb-1" for="inputLastName">Fecha de Nacimiento</label>
                  <input style="padding-top: 0.75rem; padding-bottom: 0.75rem;" class="form-control" id="inputLastName" type="date"
                    v-model="profileForm.birthdate" />
                </div>
                <!-- Form Group (Genero)-->
                <div class="col-md-6 mb-3">
                  <label class="small mb-1">Estado</label>
                  <v-select
                    class="style-chooser"
                    placeholder="Seleccionar:"
                    v-model="profileForm.status"
                    :options="[{ value: '1', label: 'Activo' }, { value: '0', label: 'Inactivo' }]"
                    :reduce="(status: any) => status.value"
                    label="label"
                  />
                </div>
              </div>

              <div class="row gx-3">
                <!-- Form Group (email address)-->
                <div class="col-md-6 mb-3">
                  <label class="small mb-1">Sucursal</label>
                  <v-select
                    class="style-chooser"
                    placeholder="Seleccionar:"
                    v-model="profileForm.branch_id"
                    :options="branchNames"
                    :reduce="(branch: any) => branch.id"
                    label="name"
                  />
                </div>

                <!-- Form Group (password)-->
                <div class="col-md-6 mb-3">
                  <label class="small mb-1">Rol</label>
                  <v-select
                    class="style-chooser"
                    placeholder="Seleccionar:"
                    v-model="profileForm.role_id"
                    :options="roleNames"
                    :reduce="(role: any) => role.id"
                    label="name"
                  />
                </div>
              </div>

              <div class="row gx-3">
                <!-- Form Group (email address)-->
                <div class="col-md-6 mb-3">
                  <label class="small mb-1">Correo electrónico</label>
                  <input class="form-control" type="email"
                    v-model="profileForm.email" />
                </div>

                <!-- Form Group (password)-->
                <div class="col-md-6 mb-3">
                  <label class="small mb-1">Contraseña</label>
                  <input class="form-control" type="text"
                    v-model="profileForm.password" />
                </div>
              </div>
              <!-- Submit button-->
              <button type="submit" class="btn btn-primary">Agregar usuario</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <pre>{{ profileForm }}s</pre>
</template>