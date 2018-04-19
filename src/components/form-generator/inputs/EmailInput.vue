<template>
  <b-input
    type="email"
    :maxlength="max_length"
    v-model="value"
    @input="update()" />
</template>

<script>
export default {
  props: {
    max_length: {
      type: Number,
    },
  },
  mounted() {
    this.update();
  },
  data() {
    return {
      value: '',
    };
  },
  methods: {
    update() {
      this.$emit('input', this.value);
    },
  },
};
</script>
