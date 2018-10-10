<template>
  <bh-card class="bh-grid">
    <div class="bh-grid__item">
      <h2>Dropdown</h2>
    </div>
    <div class="bh-grid__item">
      <example
        :component="SimpleDropDownExample"
        :code="simpleDropDownExampleCode" />
    </div>
    <div class="bh-grid__item">
      <api :data="api" />
    </div>
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
