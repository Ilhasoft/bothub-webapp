<template>
  <div>
    <b-loading :active="!loaded" />
    <b-input
      v-model="name"
      :placeholder="$t('webapp.payment.info.card_name')"
      class="card-number__field" />
    <card
      v-if="loaded"
      :options="{hidePostalCode: true,
                 classes:{base: 'card-number__input',
                          empty: 'card-number__input__empty'}
      }"
      :class="{'card-number': true,
               'card-number__field': true,
               'card-number--focus': cardIsFocused}"
      stripe="pk_test_XXXXXXXXXXXXXXXXXXXXXXXX"
      @focus="cardIsFocused = true"
      @blur="cardIsFocused = false"
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
import stripe from '@/utils/plugins/stripe';

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
      cardIsFocused: false,
      loaded: false,
    };
  },
  async mounted() {
    stripe.addStripe(() => { this.loaded = true; });
  },
  methods: {
    onChange() {},
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
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

    &--focus {
      box-shadow: 0 0 0 0.125em lighten( $color-primary, 25% );
    }

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
