<template>
  <bh-card class="bh-grid">
    <div class="bh-grid__item">
      <h2>Badge</h2>
    </div>
    <div class="bh-grid__item">
      <h3>Badge Example</h3>
      <example
        :component="BadgeExample"
        :code="badgeExampleCode" />
    </div>
    <div class="bh-grid__item">
      <h3>Badge Sizes</h3>
      <example
        :component="BadgeSize"
        :code="badgeSizeCode" />
    </div>
    <api :data="api" />
  </bh-card>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import BadgeExample from './examples/BadgeExample';
import badgeExampleCode from '!!raw-loader!./examples/BadgeExample';
import BadgeSize from './examples/BadgeSize';
import badgeSizeCode from '!!raw-loader!./examples/BadgeSize';
import api from './api';


export default {
  name: 'Buttons',
  components: {
    Example,
    Api,
  },
  data() {
    return {
      BadgeExample,
      badgeExampleCode,
      BadgeSize,
      badgeSizeCode,
      api,
    };
  },
};
</script>
