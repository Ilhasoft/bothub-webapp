<template>
  <div class="bh-grid--column">
    <div class="bh-grid__item">
      <h2>Icon</h2>
      <h3>All Icons</h3>
      <example
        :component="IconExamples"
        :code="iconExamplesCode" />
    </div>
    <div class="bh-grid__item">
      <h3>Icon Sizes</h3>
      <example
        :component="IconSize"
        :code="iconSizeCode" />
    </div>
    <div class="bh-grid__item">
      <h3>Icon Colors</h3>
      <example
        :component="IconColor"
        :code="iconColorCode" />
    </div>
    <div class="bh-grid__item">
      <api :data="api" />
    </div>
  </div>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import IconExamples from './examples/IconExamples';
import iconExamplesCode from '!!raw-loader!./examples/IconExamples';
import IconSize from './examples/IconSize';
import iconSizeCode from '!!raw-loader!./examples/IconSize';
import IconColor from './examples/IconColors';
import iconColorCode from '!!raw-loader!./examples/IconColors';
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
      IconColor,
      iconColorCode,
      api,
    };
  },
};
</script>
