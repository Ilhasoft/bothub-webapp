<template>
  <b-input
    :maxlength="max_length"
    :placeholder="labelPlaceholder"
    v-model="value"
    type="textarea"
    @input="update()" />
</template>

<script>

export default {
  props: {
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
