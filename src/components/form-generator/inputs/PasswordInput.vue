<template>
  <b-input
    password-reveal
    type="password"
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
    initialData: {
      type: String,
    },
  },
  mounted() {
    this.update();
  },
  data() {
    return {
      value: this.initialData || '',
    };
  },
  methods: {
    update() {
      this.$emit('input', this.value);
    },
  },
};
</script>
