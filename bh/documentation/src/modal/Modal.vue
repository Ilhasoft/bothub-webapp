<template>
  <div>
    <h2>Modal</h2>
    <example
      :component="ModalExamples"
      :code="modalExamplesCode" />
    <api :data="api" />
  </div>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import ModalExamples from './examples/ModalExample';
import modalExamplesCode from '!!raw-loader!./examples/ModalExample';
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
      modalExamplesCode,
      api,
    };
  },
};
</script>
