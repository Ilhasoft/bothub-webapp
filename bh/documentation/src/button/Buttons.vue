<template>
  <bh-card class="buttons">
    <h2>Buttons</h2>
    <example
      :component="SimpleButton"
      :code="simpleButtonCode" />
  </bh-card>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import SimpleButton from './examples/SimpleButton';
import simpleButtonCode from '!!raw-loader!./examples/SimpleButton';
import api from './api';


export default {
  name: 'Buttons',
  components: {
    Example,
    Api,
  },
  data() {
    return {
      SimpleButton,
      simpleButtonCode,
      api,
    };
  },
};
</script>

<style lang="scss">
.buttons {
  padding: 1rem;
}
</style>
