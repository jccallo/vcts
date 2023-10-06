<script setup lang="ts">
import { useLogin } from '../composables'

const { isLoading, loginForm, login } = useLogin()
</script>

<template>
  <div id="layoutAuthentication">
    <div id="layoutAuthentication_content">
      <main>
        <div class="container-xl px-4">
          <div class="row justify-content-center">
            <div class="col-lg-5">
              <!-- Basic login form-->
              <div class="card shadow-lg border-0 rounded-lg mt-5">
                <div class="card-header justify-content-center">
                  <h3 class="fw-light my-4">Acceso</h3>
                </div>
                <div class="card-body">
                  <!-- Login form-->
                  <form autocomplete="off" @submit.prevent="login">
                    <!-- Form Group (email address)-->
                    <div class="mb-3">
                      <label class="small mb-1" for="inputEmailAddress"
                        >Correo</label
                      >
                      <input
                        class="form-control"
                        id="inputEmailAddress"
                        type="email"
                        placeholder="Ingrese su correo"
                        v-model="loginForm.email"
                      />
                    </div>
                    <!-- Form Group (password)-->
                    <div class="mb-3">
                      <label class="small mb-1" for="inputPassword"
                        >Contraseña</label
                      >
                      <input
                        class="form-control"
                        id="inputPassword"
                        type="password"
                        placeholder="Enter password"
                        v-model="loginForm.password"
                      />
                    </div>
                    <!-- Form Group (remember password checkbox)-->
                    <div class="mb-3">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          id="rememberPasswordCheck"
                          type="checkbox"
                          v-model="loginForm.remember_token"
                        />
                        <label
                          class="form-check-label"
                          for="rememberPasswordCheck"
                          >Recordar contraseña</label
                        >
                      </div>
                    </div>
                    <!-- Form Group (login box)-->
                    <div
                      class="d-flex align-items-center justify-content-between mt-4 mb-0"
                    >
                      <a class="small" href="#">¿Has olvidado tu contraseña?</a>
                      <button
                        type="submit"
                        class="btn btn-primary"
                        :disabled="isLoading"
                      >
                        Ingresar
                      </button>
                    </div>
                  </form>
                </div>
                <div class="card-footer text-center">
                  <div class="small">
                    <a href="#">¿Necesitas una cuenta? ¡Registrate!</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    <div id="layoutAuthentication_footer">
      <footer class="footer-admin mt-auto footer-dark">
        <div class="container-xl px-4">
          <div class="row">
            <div class="col-md-6 small">Copyright &copy; VCZoluciones 2023</div>
            <div class="col-md-6 text-md-end small">
              <a href="#!">Politica de Privacidad</a>
              &middot;
              <a href="#!">Terminos &amp; Condiciones</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
