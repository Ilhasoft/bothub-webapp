<template>
  <b-input
    :maxlength="!showMaxLenght ? '' : max_length"
    v-model="value"
    :placeholder="labelPlaceholder"
    type="email"
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
    showMaxLenght: {
      type: Boolean,
      default: true,
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
