<template>
  <div class="exampleSearchInput">
    <bh-text
      v-model="dictyToString">
      <div slot="append">
        <bh-button
          size="small"
          inverted
          primary>
          <bh-icon
            value="magnify"
            size="small"
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
    debounceTime: {
      type: Number,
      default: 750,
    },
  },
  data() {
    return {
      dictyToString: exampleSearchToString(this.value),
      current: {},
      setTimeoutId: null,
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
      this.clearTimeout();
      this.setTimeoutId = setTimeout(
        () => { this.$emit('input', this.current); },
        this.debounceTime,
      );
    },
  },
  methods: {
    clearTimeout() {
      if (this.setTimeoutId) {
        clearTimeout(this.setTimeoutId);
        this.setTimeoutId = null;
      }
    },
  },
};
</script>
