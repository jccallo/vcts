<script setup lang="ts">
const props = defineProps<{
  refId: string
  title: string
  closeText?: string
  okText?: string
  onOkClick?: (...args: any[]) => void
}>()

const handleOk = (...args: any[]) => {
  if (props.onOkClick) {
    props.onOkClick(...args)
  }
};
</script>

<template>
  <div class="modal fade" :ref="props.refId" data-bs-backdrop="static">
    <div class="modal-dialog">
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
          <button class="btn btn-primary" type="button" @click="handleOk">{{ okText ?? 'Ok' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
