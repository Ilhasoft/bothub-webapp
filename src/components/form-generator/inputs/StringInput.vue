<template>
  <b-input
    :maxlength="max_length"
    :has-counter="showMaxLength"
    v-model="value"
    :placeholder="labelPlaceholder"
    type="text"
    @input="update()" />
</template>

<script>

export default {
  props: {
    max_length: {
      type: Number,
      default: null,
    },
    showMaxLength: {
      type: Boolean,
      default: true,
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
