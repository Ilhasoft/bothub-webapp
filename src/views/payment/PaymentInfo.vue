<template>
  <boarding-layout>
    <div class="payment-options">
      <div class="payment-info-card__wrapper">
        <div class="payment-info-card">
          <h1> {{ $t('webapp.payment.info.title') }} </h1>
          <p> {{ $t('webapp.payment.info.subtitle') }} </p>
          <payment-form
            class="payment-info-card__form"
            show-back-button
            @back="onBack" />
        </div>
      </div>
    </div>
  </boarding-layout>
</template>

<script>
import PaymentForm from '@/components/payment/PaymentForm';
import BoardingLayout from '@/components/user/BoardingLayout';

export default {
  name: 'PaymentInfoView',
  components: {
    PaymentForm,
    BoardingLayout,
  },
  methods: {
    onBack() {},
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
.payment-options {
  margin: 4rem 0 0 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 2.5rem;
    color: $color-primary;
  }
}

.payment-info-card {
    padding: 2rem 4.7rem 3.5rem 4.7rem;
    background-color: $color-white;
    margin: 0 1rem;
    box-shadow: 0px 3px 6px #00000029;
    max-width: 31rem;

    &__wrapper {
      display: flex;
      align-items: center;
    }

    &__form {
      margin-top: 2.313rem;
    }
  }
</style>
