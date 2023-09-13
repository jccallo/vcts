<script setup lang="ts">
import { reactive, onMounted, watch } from 'vue';
import { useCreate, useSales } from '../composables'
import { Sale } from '../interfaces'

const { create, getProfiles, profiles } = useCreate()
const { customersPluck, cardsPluck, beneficiariesPluck, getCustomersPluck, getCardsPluck, getBeneficiariesPluck } = useSales()

const formData = reactive<Sale>({
  branch_id: null,
  profile_id: null,
  customer_id: null,
  payment_method: null,
  card_id: null,
  interest_free: null,
  installments: null,
  courtesy: null,
  beneficiary_id: null,
  retailer: null,
  certificates: null,
  amount: null,
  authorization: null,
  observation: ''
})

watch(() => formData.customer_id, async () => {
  formData.card_id = null
  if (!!formData.customer_id) await getCardsPluck(formData.customer_id)
})

const saleCreate = async () => {
  await create(formData)
}

onMounted(async () => {
  await getProfiles()
  await getBeneficiariesPluck()
  await getCustomersPluck()
  if (!!formData.customer_id) await getCardsPluck(formData.customer_id)
})
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
                  <label class="small mb-1"
                    >Asesor o Agente</label
                  >
                  <v-select
                    class="style-chooser"
                    placeholder="Seleccionar:"
                    v-model="formData.profile_id"
                    :options="profiles"
                    :reduce="(profile: any) => profile.id"
                    label="fullname"
                  />
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
                  <label class="small mb-1">Cliente</label>
                  <v-select
                    class="style-chooser"
                    placeholder="Seleccionar:"
                    v-model="formData.customer_id"
                    :options="customersPluck"
                    :reduce="(customer: any) => customer.id"
                    label="fullname"
                  />
                </div>
              </div>

              <!-- Form Row-->
              <div class="row gx-3">
                <!-- Form Group -->
                <div class="col-md-4 mb-3">
                  <label class="small mb-1"
                    >Medio de Pago</label
                  >
                  <v-select
                    class="style-chooser"
                    placeholder="Seleccionar:"
                    v-model="formData.payment_method"
                    :options="['Open Pay', 'Mercado Pago', 'Pago Efectivo', 'POS', 'Otros']"
                  />
                </div>

                <!-- Form Group -->
                <div class="col-md-8 mb-3">
                  <label class="small mb-1">Tajeta</label>
                  <v-select
                    class="style-chooser"
                    placeholder="Seleccionar:"
                    v-model="formData.card_id"
                    :options="cardsPluck"
                    :reduce="(card: any) => card.id"
                    label="fullname"
                  />
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
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <!-- Form Group -->
                <div class="col-md-4 mb-3">
                  <label class="small mb-1"
                    >Número de Cuotas</label
                  >
                  <v-select
                    class="style-chooser"
                    placeholder="Seleccionar:"
                    v-model="formData.installments"
                    :options="Array.from({ length: 36 }, (_, index) => index + 1)"
                  />
                </div>
              </div>

              <!-- Form Row-->
              <div class="row gx-3">
                <!-- Form Group -->
                <div class="col-md-4 mb-3">
                  <label class="small mb-1" for="salecourtesy">Cortesía</label>
                  <select class="form-select" id="salecourtesy" v-model="formData.courtesy">
                    <option selected disabled>Seleccionar:</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <!-- Form Group -->
                <div class="col-md-8 mb-3">
                  <label class="small mb-1"
                    >Beneficiario</label
                  >
                  <v-select
                    class="style-chooser"
                    placeholder="Seleccionar:"
                    v-model="formData.beneficiary_id"
                    :options="beneficiariesPluck"
                    :reduce="(beneficiary: any) => beneficiary.id"
                    label="fullname"
                  />
                </div>
              </div>

              <!-- Form Row-->
              <div class="row gx-3">
                <!-- Form Group -->
                <div class="col-md-4 mb-3">
                  <label class="small mb-1"
                    >Comercializadora</label
                  >
                  <v-select
                    class="style-chooser"
                    placeholder="Seleccionar:"
                    v-model="formData.retailer"
                    :options="['Visa International Club', 'Otros']"
                  />
                </div>

                <!-- Form Group -->
                <div class="col-md-8 mb-3">
                  <label class="small mb-1"
                    >Certificados</label
                  >
                  <v-select
                    multiple
                    class="style-chooser"
                    placeholder="Seleccionar:"
                    v-model="formData.certificates"
                    :options="[
                        '4 Certificados Nacionales',
                        '3 Certificados Nacionales',
                        '2 Certificados Nacionales',
                        '1 Certificados Nacionales',
                        '2 Certificados Internacionales',
                        '1 Certificados Internacionales',
                    ]"
                  />
                </div>
              </div>

              <!-- Form Row-->
              <div class="row gx-3">
                <!-- Form Group -->
                <div class="col-md-12 mb-3">
                  <label class="small mb-1"
                    >Observaciones</label
                  >
                  <textarea
                    id="saleobservation"
                    class="lh-base form-control"
                    type="text"
                    placeholder="Escriba sus observaciones..."
                    rows="2"
                    v-model="formData.observation"
                  >
                  </textarea>
                </div>
              </div>

              <!-- Submit button-->
              <button class="btn btn-primary" type="button" @click.stop="saleCreate">
                Agregar venta
              </button>
            </form>

            
            {{ formData.profile_id }} {{ typeof formData.profile_id }} {{ formData.profile_id == 0? 'si': 'no' }}
            <pre>{{ formData }} {{ formData.customer_id }}-{{ formData.card_id }}-{{ formData.beneficiary_id }}</pre>
            <pre>customersPluck: {{ customersPluck }}</pre>
            <pre>cardsPluck: {{ cardsPluck }}</pre>
            <pre>beneficiariesPluck: {{ beneficiariesPluck }}</pre>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>