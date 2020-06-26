<template>
  <div class="payment-info-card">
    <form-generator :schema="schema"/>
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
          type: 'Number',
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
