<template>
  <div class="bh-grid bh-grid--column">
    <div class="bh-grid__item">
      <h2>Tooltip</h2>
      <example
        :component="TooltipExamples"
        :code="tooltipExamplesCode" />
    </div>
    <div class="bh-grid__item">
      <api :data="api" />
    </div>
  </div>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import TooltipExamples from './examples/TooltipExamples';
import tooltipExamplesCode from '!!raw-loader!./examples/TooltipExamples';
import api from './api';


export default {
  name: 'Tooltip',
  components: {
    Example,
    Api,
  },
  data() {
    return {
      TooltipExamples,
      tooltipExamplesCode,
      api,
    };
  },
};
</script>
