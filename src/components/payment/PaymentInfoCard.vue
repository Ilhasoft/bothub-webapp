<template>
  <div class="payment-info-card__wrapper">
    <div class="payment-info-card">
      <h1> {{ $t('webapp.payment.info.title') }} </h1>
      <p> {{ $t('webapp.payment.info.subtitle') }} </p>
      <form>
        <form-generator
          v-model="data"
          :schema="schema"
          :show-labels="false"/>

        <b-button type="is-primary"> {{ $t('webapp.payment.info.back') }} </b-button>
        <b-button
          native-type="submit"
          type="is-primary"> {{ $t('webapp.payment.info.save') }} </b-button>
      </form>
    </div>
  </div>
</template>

<script>
import FormGenerator from '@/components/form-generator/FormGenerator';

export default {
  name: 'PaymentInfoCard',
  components: {
    FormGenerator,
  },
  data() {
    return {
      data: {},
      schema: {
        card: {
          label: 'Card number',
          read_only: false,
          required: true,
          type: 'card',
        },
        card_name: {
          label: 'Card name',
          read_only: false,
          required: true,
          type: 'string',
        },
        card_date: {
          label: 'MM / YY',
          read_only: false,
          required: true,
          type: 'date',
        },
        card_code: {
          label: 'CVC',
          read_only: false,
          required: true,
          type: 'number',
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';

  .payment-info-card {
    padding: 2rem 4.7rem 3.5rem 4.7rem;
    background-color: $color-white;
    margin: 0 1rem;
    box-shadow: 0px 3px 6px #00000029;
    max-width: 31rem;

    h1 {
      font-size: 2.5rem;
      color: $color-primary;
    }

    &__wrapper {
      display: flex;
      align-items: center;
    }
  }
</style>
