<template>
  <b-autocomplete
    open-on-focus
    v-model="currentValue"
    v-bind="$attrs"
    :data="filteredIntents" />
</template>

<script>
import { filterAndOrderListByText } from '@/utils';

export default {
  name: 'IntentInput',
  props: {
    value: {
      type: String,
      default: '',
    },
    intents: {
      type: Array,
      default: () => ([]),
    },
  },
  watch: {
    currentValue(value) {
      this.$emit('input', value);
    },
  },
  data() {
    return {
      currentValue: this.value,
    };
  },
  computed: {
    filteredIntents() {
      return filterAndOrderListByText(this.intents, this.currentValue);
    },
  },
};
</script>
