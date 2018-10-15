<template>
  <div>
    <h2>Icon</h2>
    <h3>All Icons</h3>
    <example
      :component="IconExamples"
      :code="iconExamplesCode" />
    <h3>Icon Sizes</h3>
    <example
      :component="IconSize"
      :code="iconSizeCode" />
    <api :data="api" />
  </div>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import IconExamples from './examples/IconExamples';
import iconExamplesCode from '!!raw-loader!./examples/IconExamples';
import IconSize from './examples/IconSize';
import iconSizeCode from '!!raw-loader!./examples/IconSize';
import api from './api';


export default {
  name: 'Autocomplete',
  components: {
    Example,
    Api,
  },
  data() {
    return {
      IconExamples,
      iconExamplesCode,
      IconSize,
      iconSizeCode,
      api,
    };
  },
};
</script>
