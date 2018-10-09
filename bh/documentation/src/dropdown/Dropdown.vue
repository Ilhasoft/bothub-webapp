<template>
  <bh-card class="icon">
    <h2>Dropdown</h2>
    <example
      :component="SimpleDropDownExample"
      :code="simpleDropDownExampleCode" />
    <api :data="api" />
  </bh-card>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import SimpleDropDownExample from './examples/SimpleDropDownExample';
import simpleDropDownExampleCode from '!!raw-loader!./examples/SimpleDropDownExample';
import api from './api';


export default {
  name: 'Autocomplete',
  components: {
    Example,
    Api,
  },
  data() {
    return {
      SimpleDropDownExample,
      simpleDropDownExampleCode,
      api,
    };
  },
};
</script>

<style lang="scss">
.icon {
  padding: 1rem;
}
</style>
