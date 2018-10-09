<template>
  <bh-card class="modal">
    <h2>Icon</h2>
    <h3>All Icons</h3>
    <example
      :component="ModalExamples"
      :code="ModalExamplesCode" />
    <api :data="api" />
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

<style lang="scss">
.modal {
  padding: 1rem;
}
</style>
