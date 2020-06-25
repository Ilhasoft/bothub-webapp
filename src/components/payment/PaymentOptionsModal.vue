<template>
  <b-modal
    :active="open"
    @close="$emit('update:open', false)">
    <payment-options class="modal-content" />
  </b-modal>

</template>

<script>
import PaymentOptions from '@/components/payment/PaymentOptions';

export default {
  name: 'PaymentOptionsModal',
  components: {
    PaymentOptions,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
    .modal-content {
        padding: 3.3rem 0;
        border-radius: 10px;
    }
</style>
