<template>
  <boarding-layout>
    <payment-options class="payment-options" />
  </boarding-layout>
</template>

<script>
import PaymentOptions from '@/components/payment/PaymentOptions';
import BoardingLayout from '@/components/user/BoardingLayout';

export default {
  name: 'PaymentOptionsView',
  components: {
    PaymentOptions,
    BoardingLayout,
  },
};
</script>

<style lang="scss" scoped>
.payment-options {
  margin: 4rem 0 0 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
