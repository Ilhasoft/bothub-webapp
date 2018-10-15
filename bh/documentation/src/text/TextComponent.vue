<template>
  <div>
    <h2>Text Input</h2>
    <h3>Simple Text Input Example</h3>
    <example
      :component="SimpleTextExample"
      :code="simpleTextExampleCode" />
    <h3>Text Input with Slot</h3>
    <example
      :component="SlotTextExample"
      :code="slotTextExampleCode" />
    <api :data="api" />
  </div>
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
