<template>
  <div class="bh-grid bh-grid--column">
    <div class="bh-grid__item">
      <h2>Text Input</h2>
      <h3>Simple Text Input Example</h3>
      <example
        :component="SimpleTextExample"
        :code="simpleTextExampleCode" />
    </div>
    <div class="bh-grid__item">
      <h3>Text Input with Slot</h3>
      <example
        :component="SlotTextExample"
        :code="slotTextExampleCode" />
    </div>
    <div class="bh-grid__item">
      <h3>Debounce</h3>
      <example
        :component="DebounceExample"
        :code="debounceExampleCode" />
    </div>
    <div class="bh-grid__item">
      <h3>Text input without Border</h3>
      <example
        :component="NoBorderTextExample"
        :code="noBorderTextExampleCode" />
    </div>
    <div class="bh-grid__item">
      <api :data="api" />
    </div>
  </div>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import SimpleTextExample from './examples/SimpleTextExample';
import simpleTextExampleCode from '!!raw-loader!./examples/SimpleTextExample';
import SlotTextExample from './examples/SlotTextExample';
import slotTextExampleCode from '!!raw-loader!./examples/SlotTextExample';
import DebounceExample from './examples/Debounce';
import debounceExampleCode from '!!raw-loader!./examples/Debounce';
import NoBorderTextExample from './examples/NoBorderTextExample';
import noBorderTextExampleCode from '!!raw-loader!./examples/NoBorderTextExample';
import api from './api';


export default {
  name: 'TextInput',
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
      DebounceExample,
      debounceExampleCode,
      NoBorderTextExample,
      noBorderTextExampleCode,
      api,
    };
  },
};
</script>
