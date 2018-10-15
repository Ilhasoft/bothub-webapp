<template>
  <div class="bh-grid bh-grid--column">
    <div class="bh-grid__item">
      <h2>Icon Buttons</h2>
      <h3>Icons Buttons</h3>
      <example
        :component="IconButtonExamples"
        :code="iconButtonExamplesCode" />
    </div>
    <div class="bh-grid__item">
      <h3>Sizes</h3>
      <example
        :component="IconButtonSize"
        :code="iconButtonSizeCode" />
    </div>
    <div class="bh-grid__item">
      <api :data="api" />
    </div>
  </div>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import IconButtonExamples from './examples/IconButtonExamples';
import iconButtonExamplesCode from '!!raw-loader!./examples/IconButtonExamples';
import IconButtonSize from './examples/IconButtonSize';
import iconButtonSizeCode from '!!raw-loader!./examples/IconButtonSize';
import api from './api';


export default {
  name: 'IconButton',
  components: {
    Example,
    Api,
  },
  data() {
    return {
      IconButtonExamples,
      iconButtonExamplesCode,
      IconButtonSize,
      iconButtonSizeCode,
      api,
    };
  },
};
</script>
