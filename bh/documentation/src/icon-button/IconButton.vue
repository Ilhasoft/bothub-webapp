<template>
  <bh-card class="bh-grid">
    <div class="bh-grid__item">
      <h2>Icon Buttons</h2>
    </div>
    <div class="bh-grid__item">
      <h3>Icons Buttons</h3>
      <example
        :component="IconButtonExamples"
        :code="iconButtonExamplesCode" />
    </div>
    <div class="bh-grid__item">
      <api :data="api" />
    </div>
  </bh-card>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import IconButtonExamples from './examples/IconButtonExamples';
import iconButtonExamplesCode from '!!raw-loader!./examples/IconButtonExamples';
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
      api,
    };
  },
};
</script>
