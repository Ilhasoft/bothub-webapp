<template>
  <div class="search-example-test">
    <form @submit.prevent="onSubmit()">
      <bh-text
        v-model="toString"
        :debounce="debounceTime">
        <div slot="append">
          <bh-icon-button
            value="magnify"
            size="small"
            type="submit" />
        </div>
      </bh-text>
    </form>
    <bh-dropdown
      full-width
      position="bottom-left"
      title="intents">
      <bh-dropdown-item>Edit</bh-dropdown-item>
      <bh-dropdown-item>Remove</bh-dropdown-item>
    </bh-dropdown>
    <bh-dropdown
      full-width
      position="bottom-left"
      title="All labels">
      <bh-dropdown-item>Edit</bh-dropdown-item>
      <bh-dropdown-item>Remove</bh-dropdown-item>
    </bh-dropdown>
    <bh-dropdown
      full-width
      position="bottom-left"
      title="All entities">
      <bh-dropdown-item>Edit</bh-dropdown-item>
      <bh-dropdown-item>Remove</bh-dropdown-item>
    </bh-dropdown>
  </div>
</template>

<script>
import equal from 'deep-equal';
import { exampleSearchToDicty, exampleSearchToString } from '@/utils/index';


export default {
  name: 'SearchEaxampleTest',
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    debounceTime: {
      type: Number,
      default: 750,
    },
    intents: {
      type: Array,
      default: null,
    },
    entities: {
      type: Array,
      default: null,
    },
    labels: {
      type: Array,
      default: null,
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
      this.$emit('input', this.current);
    },
  },
  methods: {
    onSubmit() {
      this.$emit('input', this.current);
    },
  },
};
</script>

<style lang="scss" scoped>
.search-example-test {
  display:flex;
}
</style>
