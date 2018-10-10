<template>
  <bh-card class="bh-grid">
    <div class="bh-grid__item">
      <h2>Text</h2>
    </div>
    <div class="bh-grid__item">
      <h3>Simple Text Field Example</h3>
      <example
        :component="SimpleTextExample"
        :code="simpleTextExampleCode" />
    </div>
    <div class="bh-grid__item">
      <h3>Text field with Slot</h3>
      <example
        :component="SlotTextExample"
        :code="slotTextExampleCode" />
    </div>
    <div class="bh-grid__item">
      <api :data="api" />
    </div>
  </bh-card>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import SimpleTextExample from './examples/SimpleTextExample';
import simpleTextExampleCode from '!!raw-loader!./examples/SimpleTextExample';
import SlotTextExample from './examples/SlotTextExample';
import slotTextExampleCode from '!!raw-loader!./examples/SlotTextExample';
import api from './api';


export default {
  name: 'TextComponent',
  components: {
    Example,
    Api,
  },
  data() {
    return {
      SimpleTextExample,
      simpleTextExampleCode,
      SlotTextExample,
      slotTextExampleCode,
      api,
    };
  },
};
</script>
