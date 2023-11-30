<script setup lang="ts">
// import { onMounted, ref } from 'vue'
// import { Modal } from 'bootstrap'
import type { Pluck } from '@/interfaces'
import { useCreate } from '../composables'
import { Modal } from '@/components/Modal';

const { isLoading, comboboxState, saleForm, saleState, saveSale } = useCreate()

// const staticBackdrop = ref(null)

// onMounted(async () => {
//   if (staticBackdrop.value) {
//     const modal = new Modal(staticBackdrop.value)
//     modal.show()
//   }
// })
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
                    v-model="saleForm.authorization"
                  />
                </div>

                <!-- Form Group -->
                <div class="col-md-8 mb-3">
                  <label class="small mb-1">Cliente</label>&nbsp;
                  <span
                    class="badge bg-green-soft text-green me-2" data-bs-toggle="modal" data-bs-target="#customerModal"
                    style="cursor: pointer"
                  >
                    + Agregar
                  </span>
                  <v-select
                    id="clientInput"
                    class="style-chooser jc-border-select"
                    placeholder="Seleccionar:"
                    v-model="saleForm.customer_id"
                    :options="comboboxState.customerNames"
                    :reduce="(customer: Pluck) => customer.id"
                    label="name"
                  />
                </div>
              </div>

              <!-- Form Row-->
              <div class="row gx-3">
                <!-- Form Group -->
                <div class="col-md-4 mb-3">
                  <label class="small mb-1">Medio de Pago</label>
                  <v-select
                    class="style-chooser jc-border-select"
                    placeholder="Seleccionar:"
                    v-model="saleForm.payment_method_id"
                    :options="comboboxState.paymentMethodNames"
                    :reduce="(paymentMethod: Pluck) => paymentMethod.id"
                    label="name"
                  />
                </div>

                <!-- Form Group -->
                <div class="col-md-8 mb-3">
                  <label class="small mb-1">Tajeta</label>&nbsp;
                  <span
                    class="badge bg-green-soft text-green me-2" data-bs-toggle="modal" data-bs-target="#cardModal"
                    style="cursor: pointer"
                  >
                    + Agregar
                  </span>
                  <v-select
                    class="style-chooser jc-border-select"
                    placeholder="Seleccionar:"
                    v-model="saleForm.card_id"
                    :options="comboboxState.cardNames"
                    :reduce="(card: Pluck) => card.id"
                    label="name"
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
                    v-model="saleForm.amount"
                  />
                </div>

                <!-- Form Group -->
                <div class="col-md-4 mb-3">
                  <label class="small mb-1" for="saleinterestfree"
                    >Cuotas sin Intereses</label
                  >
                  <v-select
                    class="style-chooser jc-border-select"
                    placeholder="Seleccionar:"
                    v-model="saleForm.interest_free"
                    :options="['Si', 'No']"
                  />
                </div>

                <!-- Form Group -->
                <div class="col-md-4 mb-3">
                  <label class="small mb-1">Número de Cuotas</label>
                  <v-select
                    class="style-chooser jc-border-select"
                    placeholder="Seleccionar:"
                    v-model="saleForm.installments"
                    :options="Array.from({ length: 36 }, (_, index) => index + 1)"
                  />
                </div>
              </div>

              <!-- Form Row-->
              <div class="row gx-3">
                <!-- Form Group -->
                <div class="col-md-4 mb-3">
                  <label class="small mb-1" for="salecourtesy">Cortesía</label>
                  <v-select
                    class="style-chooser jc-border-select"
                    placeholder="Seleccionar:"
                    v-model="saleForm.courtesy_id"
                    :options="comboboxState.courtesyNames"
                    :reduce="(courtesy: Pluck) => courtesy.id"
                    label="name"
                  />
                </div>

                <!-- Form Group -->
                <div class="col-md-8 mb-3">
                  <label class="small mb-1">Beneficiario</label>&nbsp;
                  <span
                    class="badge bg-green-soft text-green me-2" data-bs-toggle="modal" data-bs-target="#beneficiaryModal"
                    style="cursor: pointer"
                  >
                    + Agregar
                  </span>
                  <v-select
                    class="style-chooser jc-border-select"
                    placeholder="Seleccionar:"
                    v-model="saleForm.beneficiary_id"
                    :options="comboboxState.beneficiaryNames"
                    :reduce="(beneficiary: Pluck) => beneficiary.id"
                    label="name"
                  />
                </div>
              </div>

              <!-- Form Row-->
              <div class="row gx-3">
                <!-- Form Group -->
                <div class="col-md-4 mb-3">
                  <label class="small mb-1">Comercializadora</label>
                  <v-select
                    class="style-chooser jc-border-select"
                    placeholder="Seleccionar:"
                    v-model="saleForm.retailer_id"
                    :options="comboboxState.retailerNames"
                    :reduce="(retailer: Pluck) => retailer.id"
                    label="name"
                  />
                </div>

                <!-- Form Group -->
                <div class="col-md-8 mb-3">
                  <label class="small mb-1">Certificados</label>
                  <v-select
                    multiple
                    class="style-chooser jc-border-select"
                    placeholder="Seleccionar:"
                    v-model="saleForm.certificates"
                    :options="comboboxState.certificateNames"
                    :reduce="(certificate: Pluck) => certificate.id"
                    label="name"
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
                    v-model="saleForm.observation"
                  >
                  </textarea>
                </div>
              </div>

              <!-- Submit button-->
              <button
                class="btn btn-primary"
                type="button"
                :disabled="isLoading"
                @click.prevent="saveSale"
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

            

            <pre>{{ saleForm }}</pre>
            <pre>{{ saleState.error }}</pre>
            <!-- {{ saleForm.profile_id }} {{ typeof saleForm.profile_id }}
            {{ saleForm.profile_id == 0 ? 'si' : 'no' }}
            <pre
              >{{ saleForm }} {{ saleForm.customer_id }}-{{
                saleForm.card_id
              }}-{{ saleForm.beneficiary_id }}</pre
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

  <Modal
    id= "customerModal"
    title="Agregar Cliente"
    :backdrop="true"
    size="lg"
  >
  Agregar Cliente
  </Modal>

  <Modal
    id= "cardModal"
    title="Agregar Tarjeta"
    :backdrop="true"
    size="lg"
  >
    Agregar Tarjeta
  </Modal>

  <Modal
    id= "beneficiaryModal"
    title="Agregar Beneficiario"
    :backdrop="true"
    size="lg"
  >
    Agregar Beneficiario
  </Modal>
</template>
