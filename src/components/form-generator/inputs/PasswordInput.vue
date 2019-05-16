<template>
  <b-input
    :message="drfErro"
    :maxlength="max_length"
    v-model="value"
    password-reveal
    type="password"
    @input="update()" />
</template>

<script>
import bInput from 'bh';

export default {
  components: {
    bInput,
  },
  props: {
    drfErro: {
      type: String,
      default: '',
    },
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
