<template>
  <b-datepicker
    :placeholder="labelPlaceholder"
    :min-date="minimum"
    type="month"
    @input="update()" />
</template>

<script>

export default {
  props: {
    max_length: {
      type: Number,
      default: null,
    },
    showMaxLenght: {
      type: Boolean,
      default: true,
    },
    labelPlaceholder: {
      type: String,
      default: '',
    },
  },
  computed: {
    minimum() {
      return new Date();
    },
  },
  mounted() {
    this.update();
  },
  methods: {
    update(value) {
      if (!value) this.$emit('input', null);
      else this.$emit('input', value.toString());
    },
  },
};
</script>
