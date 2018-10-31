<template>
  <div class="bh-grid bh-grid--column">
    <div class="bh-grid__item">
      <h2>Tooltip Hover</h2>
      <h3>Simple</h3>
      <example
        :component="TooltipHoverSimpleExample"
        :code="tooltipHoverSimpleExampleCode" />
    </div>
    <div class="bh-grid__item">
      <api :data="api" />
    </div>
  </div>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import TooltipHoverSimpleExample from './examples/TooltipHoverSimple';
import tooltipHoverSimpleExampleCode from '!!raw-loader!./examples/TooltipHoverSimple';
import api from './api';


export default {
  name: 'TooltipHover',
  components: {
    Example,
    Api,
  },
  data() {
    return {
      TooltipHoverSimpleExample,
      tooltipHoverSimpleExampleCode,
      api,
    };
  },
};
</script>
