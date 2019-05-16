<template>
  <b-input
    :maxlength="max_length"
    v-model="value"
    type="email"
    @input="update()" />
</template>

<script>
import bInput from 'bh';

export default {
  components: {
    bInput,
  },
  props: {
    max_length: {
      type: Number,
      default: null,
    },
    initialData: {
      type: String,
      default: '',
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
