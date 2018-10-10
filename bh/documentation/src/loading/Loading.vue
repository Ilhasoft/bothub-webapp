<template>
  <bh-card class="bh-grid">
    <div class="bh-grid__item">
      <h2>Loading</h2>
    </div>
    <div class="bh-grid__item">
      <h3>Simple Loading</h3>
      <example
        :component="SimpleLoadingExample"
        :code="simpleLoadingExampleCode" />
    </div>
    <div class="bh-grid__item">
      <h3>Sizes</h3>
      <example
        :component="LoadingSizes"
        :code="loadingSizeseCode" />
    </div>
    <div class="bh-grid__item">
      <api :data="api" />
    </div>
  </bh-card>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import SimpleLoadingExample from './examples/SimpleLoadingExample';
import simpleLoadingExampleCode from '!!raw-loader!./examples/SimpleLoadingExample';
import LoadingSizes from './examples/LoadingSizes';
import loadingSizeseCode from '!!raw-loader!./examples/LoadingSizes';
import api from './api';


export default {
  name: 'Loading',
  components: {
    Example,
    Api,
  },
  data() {
    return {
      SimpleLoadingExample,
      simpleLoadingExampleCode,
      LoadingSizes,
      loadingSizeseCode,
      api,
    };
  },
};
</script>
