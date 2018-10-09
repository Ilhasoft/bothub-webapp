<template>
  <bh-card class="buttons">
    <h2>Badge</h2>
    <div class="bh-grid">
      <div class="bh-grid__item">
        <h3>Badge Example</h3>
        <example
          :component="BadgeExample"
          :code="badgeExampleCode" />
      </div>
    </div>
    <div class="bh-grid">
      <div class="bh-grid__item">
        <h3>Badge Sizes</h3>
        <example
          :component="BadgeSize"
          :code="badgeSizeCode" />
      </div>
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

<style lang="scss">
.buttons {
  padding: 1rem;
}
</style>
