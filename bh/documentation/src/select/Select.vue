<template>
  <div class="bh-grid bh-grid--column">
    <div class="bh-grid__item">
      <h2>Select</h2>
      <example
        :component="SelectExample"
        :code="SelectExampleCode" />
    </div>
    <div class="bh-grid__item">
      <api :data="api" />
    </div>
  </div>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import SelectExample from './examples/SelectExample';
import SelectExampleCode from '!!raw-loader!./examples/SelectExample';
import api from './api';


export default {
  name: 'Select',
  components: {
    Example,
    Api,
  },
  data() {
    return {
      SelectExample,
      SelectExampleCode,
      api,
    };
  },
};
</script>
