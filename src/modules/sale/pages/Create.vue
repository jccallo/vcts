<script setup lang="ts">
import { reactive } from 'vue'
import useCreate from '../composables/use.create'

const { create } = useCreate()

interface FormData {
  branch_id: number | string
  profile_id: number | string
  authorization: string
  customer_id: number | string
  payment_method: string
  card_id: number | string
  amount: number | string
  interest_free: string
  installments: string
  courtesy: string
  beneficiary_id: number | string
  retailer: string
  certificates: string
  observation?: string
}

const formData: FormData = reactive({
  branch_id: '',
  profile_id: '',
  authorization: '',
  customer_id: '',
  payment_method: '',
  card_id: '',
  amount: '',
  interest_free: '',
  installments: '',
  courtesy: '',
  beneficiary_id: '',
  retailer: '',
  certificates: '',
  observation: ''
})

const saleCreate = async () => {
  await create(formData)
}
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
                <vue-feather type="shopping-cart" size="16"></vue-feather>
              </div>
              Agregar Venta
            </h1>
          </div>
          <div class="col-12 col-xl-auto mb-3">
            <a
              class="btn btn-sm btn-light text-primary"
              href="user-management-list.html"
            >
              <vue-feather
                type="arrow-left"
                size="16"
                class="me-1"
              ></vue-feather>
              Volver a la Lista de Ventas
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- Main page content-->
  <div class="container-xl px-4 mt-4">
    <div class="row">
      <div class="col-xl-12">
        <!-- general -->
        <div class="card mb-4">
          <div class="card-header">General</div>
          <div class="card-body">
            <form>
              <!-- Form Row-->
              <div class="row gx-3">
                <!-- Form Group -->
                <div class="col-md-5 mb-3">
                  <label class="small mb-1" for="salebranch"
                    >Sede o Sucursal</label
                  >
                  <select class="form-select" id="salebranch" v-model="formData.branch_id">
                    <option selected disabled>Seleccionar:</option>
                    <option value="1">Administrator</option>
                    <option value="2">Registered</option>
                    <option value="3">Editor</option>
                    <option value="4">Guest</option>
                  </select>
                </div>

                <!-- Form Group -->
                <div class="col-md-7 mb-3">
                  <label class="small mb-1" for="saleprofile"
                    >Asesor o Agente</label
                  >
                  <select class="form-select" id="saleprofile" v-model="formData.profile_id">
                    <option selected disabled>Seleccionar:</option>
                    <option value="1">Administrator</option>
                    <option value="2">Registered</option>
                    <option value="3">Editor</option>
                    <option value="4">Guest</option>
                  </select>
                </div>
              </div>

              <!-- Form Row-->
              <div class="row gx-3">
                <!-- Form Group -->
                <div class="col-md-4 mb-3">
                  <label class="small mb-1" for="saleauthorization"
                    >Autorización</label
                  >
                  <input
                    class="form-control"
                    id="saleauthorization"
                    type="text"
                    v-model="formData.authorization"
                  />
                </div>

                <!-- Form Group -->
                <div class="col-md-8 mb-3">
                  <label class="small mb-1" for="saleccustomer">Cliente</label>
                  <select class="form-select" id="saleccustomer"  v-model="formData.customer_id">
                    <option selected disabled>Seleccionar:</option>
                    <option value="1">Administrator</option>
                    <option value="2">Registered</option>
                    <option value="3">Editor</option>
                    <option value="4">Guest</option>
                  </select>
                </div>
              </div>

              <!-- Form Row-->
              <div class="row gx-3">
                <!-- Form Group -->
                <div class="col-md-4 mb-3">
                  <label class="small mb-1" for="salepaymentmethod"
                    >Medio de Pago</label
                  >
                  <select class="form-select" id="salepaymentmethod" v-model="formData.payment_method">
                    <option selected disabled>Seleccionar:</option>
                    <option value="Open Pay">Open Pay</option>
                  </select>
                </div>

                <!-- Form Group -->
                <div class="col-md-8 mb-3">
                  <label class="small mb-1" for="salecard">Tajeta</label>
                  <select class="form-select" id="salecard" v-model="formData.card_id">
                    <option selected disabled>Seleccionar:</option>
                    <option value="1">Administrator</option>
                    <option value="2">Registered</option>
                    <option value="3">Editor</option>
                    <option value="4">Guest</option>
                  </select>
                </div>
              </div>

              <!-- Form Row-->
              <div class="row gx-3">
                <!-- Form Group -->
                <div class="col-md-4 mb-3">
                  <label class="small mb-1" for="saleamount">Monto</label>
                  <input class="form-control" id="saleamount" type="number" v-model="formData.amount" />
                </div>

                <!-- Form Group -->
                <div class="col-md-4 mb-3">
                  <label class="small mb-1" for="saleinterestfree"
                    >Cuotas sin Intereses</label
                  >
                  <select class="form-select" id="saleinterestfree" v-model="formData.interest_free">
                    <option selected disabled>Seleccionar:</option>
                    <option value="1">Si</option>
                    <option value="0">No</option>
                  </select>
                </div>

                <!-- Form Group -->
                <div class="col-md-4 mb-3">
                  <label class="small mb-1" for="saleinstallments"
                    >Número de Cuotas</label
                  >
                  <select class="form-select" id="saleinstallments" v-model="formData.installments">
                    <option selected disabled>Seleccionar:</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>

              <!-- Form Row-->
              <div class="row gx-3">
                <!-- Form Group -->
                <div class="col-md-4 mb-3">
                  <label class="small mb-1" for="salecourtesy">Cortesía</label>
                  <select class="form-select" id="salecourtesy" v-model="formData.courtesy">
                    <option selected disabled>Seleccionar:</option>
                    <option value="1">Si</option>
                    <option value="0">No</option>
                  </select>
                </div>

                <!-- Form Group -->
                <div class="col-md-8 mb-3">
                  <label class="small mb-1" for="salebeneficiary"
                    >Beneficiario</label
                  >
                  <select class="form-select" id="salebeneficiary" v-model="formData.beneficiary_id">
                    <option selected disabled>Seleccionar:</option>
                    <option value="1">Administrator</option>
                    <option value="2">Registered</option>
                    <option value="3">Editor</option>
                    <option value="4">Guest</option>
                  </select>
                </div>
              </div>

              <!-- Form Row-->
              <div class="row gx-3">
                <!-- Form Group -->
                <div class="col-md-4 mb-3">
                  <label class="small mb-1" for="saleretailer"
                    >Comercializadora</label
                  >
                  <select class="form-select" id="saleretailer" v-model="formData.retailer">
                    <option selected disabled>Seleccionar:</option>
                    <option value="Visa International Club">Visa International Club</option>
                    <option value="Otros">Otros</option>
                  </select>
                </div>

                <!-- Form Group -->
                <div class="col-md-8 mb-3">
                  <label class="small mb-1" for="salecertificates"
                    >Certificados</label
                  >
                  <select class="form-select" id="salecertificates" v-model="formData.certificates">
                    <option selected disabled>Seleccionar:</option>
                    <option value="administrator">Administrator</option>
                    <option value="registered">Registered</option>
                    <option value="edtior">Editor</option>
                    <option value="guest">Guest</option>
                  </select>
                </div>
              </div>

              <!-- Form Row-->
              <div class="row gx-3">
                <!-- Form Group -->
                <div class="col-md-12 mb-3">
                  <label class="small mb-1" for="saleobservation"
                    >Observaciones</label
                  >
                  <textarea
                    id="saleobservation"
                    class="lh-base form-control"
                    type="text"
                    placeholder="Enter your post preview text..."
                    rows="2"
                    v-model="formData.observation"
                  >
Empower communities and energize engaging ideas; scale and impact do-gooders while disrupting industries. Venture philanthropy benefits corporations and people by moving the needle.</textarea
                  >
                </div>
              </div>

              <!-- Submit button-->
              <button class="btn btn-primary" type="button" @click.stop="saleCreate">
                Agregar venta
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
../composables/use.create