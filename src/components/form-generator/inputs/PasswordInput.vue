<template>
  <b-input
    :message="drfErro"
    :maxlength="max_length"
    v-model="value"
    :placeholder="labelPlaceholder"
    password-reveal
    type="password"
    @input="update()" />
</template>

<script>

export default {
  props: {
    drfErro: {
      type: String,
      default: '',
    },
    max_length: {
      type: Number,
      default: null,
    },
    labelPlaceholder: {
      type: String,
      default: '',
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
