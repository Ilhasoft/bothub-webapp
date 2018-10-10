<template>
  <bh-card class="bh-grid">
    <div class="bh-grid__item">
      <h2>Modal</h2>
    </div>
    <div class="bh-grid__item">
      <example
        :component="ModalExamples"
        :code="ModalExamplesCode" />
    </div>
    <div class="bh-grid__item">
      <api :data="api" />
    </div>
  </bh-card>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import ModalExamples from './examples/ModalExample';
import ModalExamplesCode from '!!raw-loader!./examples/ModalExample';
import api from './api';


export default {
  name: 'Autocomplete',
  components: {
    Example,
    Api,
  },
  data() {
    return {
      ModalExamples,
      ModalExamplesCode,
      api,
    };
  },
};
</script>
