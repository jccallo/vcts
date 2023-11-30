<script setup lang="ts">
const props = defineProps<{
   id: string
   title: string
   closeText?: string
   okText?: string
   backdrop?: boolean
   scrollable?: boolean
   centered?: boolean
   size?: string
   callback?: (...args: any[]) => void
}>()

const getBackdrop = () => {
   return props.backdrop ? 'static' : true
}

const getScrollable = () => {
   return props.scrollable ? 'modal-dialog-scrollable' : ''
}

const getCentered = () => {
   return props.centered ? 'modal-dialog-centered' : ''
}

const getSize = () => {
   return props.size === 'xl' ? 'modal-xl' : (props.size === 'lg' ? 'modal-lg' : (props.size === 'sm' ? 'modal-sm' : '')) 
}

const handleClick = (...args: any[]) => {
   if (props.callback) {
      props.callback(...args)
   }
}
</script>

<template>
   <div
      class="modal fade"
      :id="props.id"
      :data-bs-backdrop="getBackdrop()"
   >
      <div
         class="modal-dialog"
         :class="[
            getScrollable(), 
            getCentered(), 
            getSize()
         ]"
      >
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title">{{ props.title }}</h5>
               <button
                  class="btn-close"
                  type="button"
                  data-bs-dismiss="modal"
               ></button>
            </div>
            <div class="modal-body"><slot></slot></div>
            <div class="modal-footer">
               <button
                  class="btn btn-secondary"
                  type="button"
                  data-bs-dismiss="modal"
               >
                  {{ closeText ?? 'Close' }}
               </button>
               <button
                  class="btn btn-primary"
                  type="button"
                  @click="handleClick"
               >
                  {{ okText ?? 'Ok' }}
               </button>
            </div>
         </div>
      </div>
   </div>
</template>
