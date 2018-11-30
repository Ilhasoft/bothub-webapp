<template>
  <div class="bh-grid bh-grid--column">
    <div class="bh-grid__item">
      <h2>Loading</h2>
      <h3>Simple Loading</h3>
      <example
        :component="SimpleLoadingExample"
        :code="simpleLoadingExampleCode" />
      <h3>Loading Sizes</h3>
      <example
        :component="LoadingSizes"
        :code="loadingSizesCode" />
      <h3>Loading Colors</h3>
      <example
        :component="LoadingColorsExample"
        :code="loadingColorsCode" />
    </div>
    <div class="bh-grid__item">
      <api :data="api" />
    </div>
  </div>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import SimpleLoadingExample from './examples/SimpleLoadingExample';
import simpleLoadingExampleCode from '!!raw-loader!./examples/SimpleLoadingExample';
import LoadingSizes from './examples/LoadingSizes';
import loadingSizesCode from '!!raw-loader!./examples/LoadingSizes';
import LoadingColorsExample from './examples/LoadingColors';
import loadingColorsCode from '!!raw-loader!./examples/LoadingColors';
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
      loadingSizesCode,
      LoadingColorsExample,
      loadingColorsCode,
      api,
    };
  },
};
</script>
