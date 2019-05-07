<template>
  <div class="bh-grid bh-grid--column">
    <div class="bh-grid__item">
      <h2>Badge</h2>
      <h3>Badge Example</h3>
      <example
        :component="BadgeExample"
        :code="badgeExampleCode" />
    </div>
    <div class="bh-grid__item">
      <h3>Example Badge with text</h3>
      <example
        :component="BadgeWithText"
        :code="badgeWithTextCode" />
    </div>
    <div class="bh-grid__item">
      <h3>Badge Sizes</h3>
      <example
        :component="BadgeSize"
        :code="badgeSizeCode" />
    </div>
    <div class="bh-grid__item">
      <api :data="api" />
    </div>
  </div>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import BadgeExample from './examples/BadgeExample';
import badgeExampleCode from '!!raw-loader!./examples/BadgeExample';
import BadgeSize from './examples/BadgeSize';
import badgeSizeCode from '!!raw-loader!./examples/BadgeSize';
import BadgeWithText from './examples/BadgeWithText';
import badgeWithTextCode from '!!raw-loader!./examples/BadgeWithText';
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
      BadgeWithText,
      badgeWithTextCode,
      api,
    };
  },
};
</script>
