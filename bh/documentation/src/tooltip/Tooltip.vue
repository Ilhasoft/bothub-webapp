<template>
  <div class="bh-grid bh-grid--column">
    <div class="bh-grid__item">
      <h2>Tooltip</h2>
      <h3>Types</h3>
      <example
        :component="TooltipTypesExample"
        :code="tooltipTypesExampleCode" />
      <h3>Close event</h3>
      <p>The <code>open</code> prop can be sync. Update event is emitted on click or blur event.</p>
      <example
        :component="TooltipCloseExample"
        :code="tooltipCloseExampleCode" />
    </div>
    <div class="bh-grid__item">
      <api :data="api" />
    </div>
  </div>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import TooltipTypesExample from './examples/TooltipTypes';
import tooltipTypesExampleCode from '!!raw-loader!./examples/TooltipTypes';
import TooltipCloseExample from './examples/TooltipClose';
import tooltipCloseExampleCode from '!!raw-loader!./examples/TooltipClose';
import api from './api';


export default {
  name: 'Tooltip',
  components: {
    Example,
    Api,
  },
  data() {
    return {
      TooltipTypesExample,
      tooltipTypesExampleCode,
      TooltipCloseExample,
      tooltipCloseExampleCode,
      api,
    };
  },
};
</script>
