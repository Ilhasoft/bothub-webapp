<template>
  <div class="bh-grid bh-grid--column">
    <div class="bh-grid__item">
      <h2>Select</h2>
      <h3>Select Example</h3>
      <example
        :component="SelectExample"
        :code="selectExampleCode" />
    </div>
    <div class="bh-grid__item">
      <h3>Select Disabled</h3>
      <example
        :component="SelectDisabled"
        :code="selectDisabledCode" />
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
import selectExampleCode from '!!raw-loader!./examples/SelectExample';
import SelectDisabled from './examples/SelectDisabled';
import selectDisabledCode from '!!raw-loader!./examples/SelectDisabled';
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
      selectExampleCode,
      SelectDisabled,
      selectDisabledCode,
      api,
    };
  },
};
</script>
