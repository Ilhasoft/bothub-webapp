<template>
  <form
    @submit.prevent="submit()">
    <bh-text
      v-model="toString"
      class="example-search-input">
      <div slot="append">
        <bh-icon-button
          value="magnify"
          size="small"
          class="exampleSearchInput__icon"
          @click="submit()" />
      </div>
    </bh-text>
  </form>
</template>

<script>
import equal from 'deep-equal';
import { exampleSearchToDicty, exampleSearchToString } from '@/utils/index';


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
      toString: exampleSearchToString(this.value),
      setTimeoutId: null,
    };
  },
  computed: {
    current() {
      return exampleSearchToDicty(this.toString);
    },
  },
  watch: {
    value(value) {
      if (!equal(this.current, value)) {
        this.toString = exampleSearchToString(value);
      }
    },
    toString() {
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
    submit() {
      this.clearTimeout();
      this.$emit('input', this.current);
    },
  },
};
</script>
