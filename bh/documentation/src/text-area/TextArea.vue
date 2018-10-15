<template>
  <bh-card class="modal">
    <h2>Text Area</h2>
    <example
      :component="SimpleTextAreaExample"
      :code="simpleTextAreaExampleCode" />
    <api :data="api" />
  </bh-card>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import SimpleTextAreaExample from './examples/SimpleTextAreaExample';
import simpleTextAreaExampleCode from '!!raw-loader!./examples/SimpleTextAreaExample';
import api from './api';

export default {
  name: 'Autocomplete',
  components: {
    Example,
    Api,
  },
  data() {
    return {
      SimpleTextAreaExample,
      simpleTextAreaExampleCode,
      api,
    };
  },
};
</script>
