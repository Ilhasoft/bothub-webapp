<template>
  <div class="exampleSearchInput">
    <bh-text v-model="dictyToString">
      <div slot="append">
        <bh-button
          size="small"
          inverted
          primary>
          <bh-icon
            value="magnify"
            size="normal"
            class="exampleSearchInput__icon" />
        </bh-button>
      </div>
    </bh-text>
  </div>
</template>

<script>
import equal from 'deep-equal';
import { exampleSearchToDicty, exampleSearchToString } from '@/bh/utils';


export default {
  name: 'ExampleSearchInput',
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      dictyToString: exampleSearchToString(this.value),
      current: {},
    };
  },
  watch: {
    value(value) {
      if (!equal(this.current, value)) {
        this.dictyToString = exampleSearchToString(value);
      }
    },
    dictyToString(value) {
      this.current = exampleSearchToDicty(value);
      this.$emit('input', this.current);
    },
  },
};
</script>
