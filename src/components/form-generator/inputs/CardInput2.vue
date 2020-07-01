<template>
  <!-- <card-number
    ref="cardNumber"
    stripe="pk_test_XXXXXXXXXXXXXXXXXXXXXXXX"
    class="stripe-element card-number"
  /> -->
  <card
    :options="{hidePostalCode:true}"
    v-model="data"
    class="card-number"
    stripe="pk_test_XXXXXXXXXXXXXXXXXXXXXXXX"
    @change="onChange"
  />
</template>

<script>
import { CardNumber, Card } from 'vue-stripe-elements-plus';

export default {
  components: {
    CardNumber,
    Card,
  },
  props: {
    max_length: {
      type: Number,
      default: null,
    },
    showMaxLength: {
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
      data: null,
      value: null,
      cardType: null,
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
 .card-number {
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

&:hover {
  border-color: #b5b5b5 !important;
}
 }
</style>
