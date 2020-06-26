<template>
  <boarding-layout>
    <payment-info-card class="payment-options" />
  </boarding-layout>
</template>

<script>
import PaymentInfoCard from '@/components/payment/PaymentInfoCard';
import BoardingLayout from '@/components/user/BoardingLayout';

export default {
  name: 'PaymentInfoView',
  components: {
    PaymentInfoCard,
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
