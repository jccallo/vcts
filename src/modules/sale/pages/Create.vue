<script setup lang="ts">
import { reactive, onMounted, watch, ref } from 'vue'
import { Modal } from 'bootstrap'
import { SaleForm } from '../interfaces'
import {
  useGetCustomers,
  useGetCards,
  useGetBeneficiaries,
} from '../composables'

const { beneficiaries, getBeneficiaries } = useGetBeneficiaries()
const { customers, getCustomers } = useGetCustomers()
const { cards, getCards } = useGetCards()

const formData = reactive<SaleForm>({
  branch_id: 0,
  customer_id: '',
  card_id: '',
  beneficiary_id: '',
  payment_method: '',
  interest_free: '',
  installments: '',
  courtesy: '',
  retailer: '',
  certificates: [],
  amount: '',
  authorization: '',
  observation: '',
})

watch(
  () => formData.customer_id,
  async () => {
    formData.card_id = ''
    if (formData.customer_id) await getCards(formData.customer_id)
  }
)

const saleCreate = async () => {
  console.log('crear', 'crear')
}
const staticBackdrop = ref(null)

onMounted(async () => {
  await getBeneficiaries()
  await getCustomers()
  if (formData.customer_id) await getCards(formData.customer_id)

  if (staticBackdrop.value) {
    const modal = new Modal(staticBackdrop.value)
    modal.show()
  }
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
            <routerLink
              class="btn btn-sm btn-light text-primary"
              :to="{ name: 'sales.index' }"
            >
              <vue-feather
                type="arrow-left"
                size="16"
                class="me-1"
              ></vue-feather>
              Volver a la Lista de Ventas
            </routerLink>
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
          <div class="card-header">Formulario de Venta</div>
          <div class="card-body">
            <form>
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
                  <label class="small mb-1">Cliente</label>&nbsp;
                  <span
                    class="badge bg-success text-white me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                    style="cursor: pointer"
                  >
                    + Agregar
                  </span>
                  <v-select
                    id="clientInput"
                    class="style-chooser"
                    placeholder="Seleccionar:"
                    v-model="formData.customer_id"
                    :options="customers"
                    :reduce="(customer: any) => customer.id"
                    label="fullname"
                  />
                </div>
              </div>

              <!-- Form Row-->
              <div class="row gx-3">
                <!-- Form Group -->
                <div class="col-md-4 mb-3">
                  <label class="small mb-1">Medio de Pago</label>
                  <v-select
                    class="style-chooser"
                    placeholder="Seleccionar:"
                    v-model="formData.payment_method"
                    :options="[
                      'Open Pay',
                      'Mercado Pago',
                      'Pago Efectivo',
                      'POS',
                      'Otros',
                    ]"
                  />
                </div>

                <!-- Form Group -->
                <div class="col-md-8 mb-3">
                  <label class="small mb-1">Tajeta</label>&nbsp;
                  <span
                    class="badge bg-success text-white me-2"
                    style="cursor: pointer"
                  >
                    + Agregar
                  </span>
                  <v-select
                    class="style-chooser"
                    placeholder="Seleccionar:"
                    v-model="formData.card_id"
                    :options="cards"
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
                  <input
                    class="form-control"
                    id="saleamount"
                    type="number"
                    v-model="formData.amount"
                  />
                </div>

                <!-- Form Group -->
                <div class="col-md-4 mb-3">
                  <label class="small mb-1" for="saleinterestfree"
                    >Cuotas sin Intereses</label
                  >
                  <select
                    class="form-select"
                    id="saleinterestfree"
                    v-model="formData.interest_free"
                  >
                    <option selected disabled>Seleccionar:</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <!-- Form Group -->
                <div class="col-md-4 mb-3">
                  <label class="small mb-1">Número de Cuotas</label>
                  <v-select
                    class="style-chooser"
                    placeholder="Seleccionar:"
                    v-model="formData.installments"
                    :options="
                      Array.from({ length: 36 }, (_, index) => index + 1)
                    "
                  />
                </div>
              </div>

              <!-- Form Row-->
              <div class="row gx-3">
                <!-- Form Group -->
                <div class="col-md-4 mb-3">
                  <label class="small mb-1" for="salecourtesy">Cortesía</label>
                  <select
                    class="form-select"
                    id="salecourtesy"
                    v-model="formData.courtesy"
                  >
                    <option selected disabled>Seleccionar:</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <!-- Form Group -->
                <div class="col-md-8 mb-3">
                  <label class="small mb-1">Beneficiario</label>&nbsp;
                  <span
                    class="badge bg-success text-white me-2"
                    style="cursor: pointer"
                  >
                    + Agregar
                  </span>
                  <v-select
                    class="style-chooser"
                    placeholder="Seleccionar:"
                    v-model="formData.beneficiary_id"
                    :options="beneficiaries"
                    :reduce="(beneficiary: any) => beneficiary.id"
                    label="fullname"
                  />
                </div>
              </div>

              <!-- Form Row-->
              <div class="row gx-3">
                <!-- Form Group -->
                <div class="col-md-4 mb-3">
                  <label class="small mb-1">Comercializadora</label>
                  <v-select
                    class="style-chooser"
                    placeholder="Seleccionar:"
                    v-model="formData.retailer"
                    :options="['Visa International Club', 'Otros']"
                  />
                </div>

                <!-- Form Group -->
                <div class="col-md-8 mb-3">
                  <label class="small mb-1">Certificados</label>
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
                  <label class="small mb-1">Observaciones</label>
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
              <button
                class="btn btn-primary"
                type="button"
                @click.stop="saleCreate"
              >
                Agregar venta
              </button>
            </form>
            <!-- Button trigger modal -->
            <button
              class="btn btn-primary"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Launch Static Backdrop Modal
            </button>

            <!-- Modal Customers -->
            <div
              class="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Agregar Nuevo Cliente</h5>
                    <button
                      class="btn-close"
                      type="button"
                      data-bs-dismiss="modal"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div class="row gx-3">
                      <!-- Form Group -->
                      <div class="col-12 mb-3">
                        <label class="small mb-1">Nombres</label>
                        <input
                          class="form-control"
                          type="text"
                        />
                      </div>

                      <!-- Form Group -->
                      <div class="col-12 mb-3">
                        <label class="small mb-1">Apellidos</label>
                        <input
                          class="form-control"
                          type="text"
                        />
                      </div>

                      <!-- Form Group -->
                      <div class="col-12 mb-3">
                        <label class="small mb-1">N° de Documento</label>
                        <input
                          class="form-control"
                          type="text"
                        />
                      </div>

                      <!-- Form Group -->
                      <div class="col-12 mb-3">
                        <label class="small mb-1">Fecha de Nacimiento</label>
                        <input
                          class="form-control"
                          type="text"
                        />
                      </div>

                      <!-- Form Group -->
                      <div class="col-12 mb-3">
                        <label class="small mb-1">Telefono</label>
                        <input
                          class="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      class="btn btn-secondary"
                      type="button"
                      data-bs-dismiss="modal"
                    >
                      Cancelar
                    </button>
                    <button class="btn btn-primary" type="button">
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <pre>{{ formData }}</pre>
            <!-- {{ formData.profile_id }} {{ typeof formData.profile_id }}
            {{ formData.profile_id == 0 ? 'si' : 'no' }}
            <pre
              >{{ formData }} {{ formData.customer_id }}-{{
                formData.card_id
              }}-{{ formData.beneficiary_id }}</pre
            >
            <pre>customersPluck: {{ customersPluck }}</pre>
            <pre>cardsPluck: {{ cardsPluck }}</pre>
            <pre>beneficiariesPluck: {{ beneficiariesPluck }}</pre>
            <pre>{{ profiles }}</pre> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
