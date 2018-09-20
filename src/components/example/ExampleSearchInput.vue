<template>
  <form @submit.prevent="onSubmit()">
    <bh-text v-model="toString">
      <div slot="append">
        <bh-icon-button
          value="magnify"
          size="small"
          type="submit" />
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
    onSubmit() {
      this.clearTimeout();
      this.$emit('input', this.current);
    },
  },
};
</script>
