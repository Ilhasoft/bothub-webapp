<template>
  <div class="bh-grid bh-grid--column">
    <div class="bh-grid__item">
      <h2>Highlighted Pre</h2>
      <h3>Simple</h3>
      <example
        :component="SimplePreExample"
        :code="simplePreExampleCode" />
    </div>
    <div class="bh-grid__item">
      <api :data="api" />
    </div>
  </div>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import SimplePreExample from './examples/SimplePre';
import simplePreExampleCode from '!!raw-loader!./examples/SimplePre';
import api from './api';


export default {
  name: 'HighlightedPre',
  components: {
    Example,
    Api,
  },
  data() {
    return {
      SimplePreExample,
      simplePreExampleCode,
      api,
    };
  },
};
</script>
