<template>
  <b-select
    v-model="value"
    expanded
    @input="update()">
    <option
      v-for="choice in choices"
      :key="choice.value"
      :value="choice.value">{{ choice.display_name }}</option>
  </b-select>
</template>

<script>
import bSelect from 'bh';

export default {
  components: {
    bSelect,
  },
  props: {
    choices: {
      required: true,
      type: Array,
    },
    initialData: {
      type: [Array, String],
      default: null,
    },
  },
  data() {
    return {
      value: this.initialData,
    };
  },
  mounted() {
    this.update();
  },
  methods: {
    update() {
      this.$emit('input', this.value);
    },
  },
};
</script>
