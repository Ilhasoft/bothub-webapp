<template>
  <b-input
    v-cleave="masks.creditCard"
    :maxlength="!showMaxLenght ? '' : max_length"
    :placeholder="labelPlaceholder"
    icon="credit-card"
    type="text"
    @input="update" />
</template>

<script>
import Cleave from 'cleave.js';

const cleave = {
  name: 'cleave',
  bind(el, binding) {
    const input = el.querySelector('input');
    // eslint-disable-next-line no-underscore-dangle
    input._vCleave = new Cleave(input, binding.value);
  },
  unbind(el) {
    const input = el.querySelector('input');
    // eslint-disable-next-line no-underscore-dangle
    input._vCleave.destroy();
  },
};

export default {
  directives: { cleave },
  props: {
    max_length: {
      type: Number,
      default: null,
    },
    showMaxLenght: {
      type: Boolean,
      default: true,
    },
    labelPlaceholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      value: null,
      masks: {
        creditCard: {
          creditCard: true,
          onCreditCardTypeChanged(type) {
            console.log(type);
          },
        },
      },
    };
  },
  methods: {
    update(value) {
      this.value = value.replace(/\s/g, '');
      this.$emit('input', this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
 .card-number {
   box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
max-width: 100%;
width: 100%;
border-color: #b5b5b5;
background-color: white;
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
 }
</style>
