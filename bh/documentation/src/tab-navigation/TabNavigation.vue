<template>
  <div class="bh-grid bh-grid--column">
    <div class="bh-grid__item">
      <h2>Tab Navigation</h2>
      <example
        :component="TabNavigationExample"
        :code="tabNavigationExampleCode" />
    </div>
    <div class="bh-grid__item">
      <api :data="api" />
    </div>
  </div>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import TabNavigationExample from './examples/TabNavigationExample';
import tabNavigationExampleCode from '!!raw-loader!./examples/TabNavigationExample';
import api from './api';


export default {
  name: 'TabNavigation',
  components: {
    Example,
    Api,
  },
  data() {
    return {
      TabNavigationExample,
      tabNavigationExampleCode,
      api,
    };
  },
};
</script>
