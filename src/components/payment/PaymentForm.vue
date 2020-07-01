<template>
  <div>
    <b-input
      v-model="name"
      :placeholder="$t('webapp.payment.info.card_name')"
      class="card-number__field" />
    <card
      :options="{hidePostalCode: true,
                 classes:{base: 'card-number__input',
                          empty: 'card-number__input__empty'}}"
      class="card-number card-number__field"
      stripe="pk_test_XXXXXXXXXXXXXXXXXXXXXXXX"
      @change="onChange"
    />
    <div
      v-if="showBackButton"
      class="payment-buttons">
      <b-button
        type="is-primary"
        @click="$emit('back')"> {{ $t('webapp.payment.info.back') }} </b-button>
      <b-button
        type="is-primary"> {{ $t('webapp.payment.info.save') }} </b-button>
    </div>
  </div>
</template>

<script>
import { Card } from 'vue-stripe-elements-plus';

export default {
  components: {
    Card,
  },
  props: {
    showBackButton: {
      type: Boolean,
      default: null,
    },
  },
  data() {
    return {
      name: null,
    };
  },
  methods: {
    onChange(event) {
      console.log(event);
    },
  },
};
</script>

<style lang="scss" scoped>
 /deep/ .card-number {
    box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
    max-width: 100%;
    width: 100%;
    background-color: white;
    border-color: #dbdbdb !important;
    border-radius: 4px;
    color: #363636;
    font-size: 1rem;
    height: 2.25em;
    line-height: 1.5;
    padding-bottom: calc(0.375em - 1px);
    padding-left: calc(0.625em - 1px);
    padding-right: calc(0.625em - 1px);
    padding-top: calc(0.375em - 1px);
    position: relative;
    vertical-align: top;
    border: 1px solid transparent;
    font-style: inherit;

    &:hover {
        border-color: #b5b5b5 !important;
    }

     &__field {
        margin-bottom: 0.625rem;
    }

    &__input {
        color: #363636;

        &__empty {
            opacity: 0.5;
        }
    }
 }

 .payment-buttons {
     display: flex;
     justify-content: center;
     margin-top: 3.5rem;
     > * {
         margin-right: 0.75rem;
     }
 }

</style>
