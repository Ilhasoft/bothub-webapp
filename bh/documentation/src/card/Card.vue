<template>
  <div>
    <h2>Card</h2>
    <example
      :component="SimpleCard"
      :code="simpleCardCode" />
    <h3>Card with border shadows</h3>
    <example
      :component="CardShadows"
      :code="cardShadowsCode" />
    <api :data="api" />
  </div>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import SimpleCard from './examples/SimpleCard';
import simpleCardCode from '!!raw-loader!./examples/SimpleCard';
import CardShadows from './examples/CardShadows';
import cardShadowsCode from '!!raw-loader!./examples/CardShadows';
import api from './api';


export default {
  name: 'Card',
  components: {
    Example,
    Api,
  },
  data() {
    return {
      SimpleCard,
      simpleCardCode,
      CardShadows,
      cardShadowsCode,
      api,

    };
  },
};
</script>

<style lang="scss">
  .item {
    text-align: center;
  }
</style>
