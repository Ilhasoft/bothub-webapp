<template>
  <div class="field">
    <label>{{ label }}:</label>
    <slot />
    <div v-if="helpText && !validateError" class="help-text">{{ helpText }}</div>
    <div v-if="validateError" class="validate-error">{{ validateError }}</div>
  </div>
</template>

<script>
export default {
  name: 'Field',
  props: {
    label: {
      type: String,
      required: true,
    },
    helpText: {
      type: String,
    },
  },
  data() {
    return {
      validateError: false,
    };
  },
  mounted() {
    if (this.$slots.default) {
      this.$slots.default.forEach((node) => {
        const input = node.componentInstance;
        input.$on('validate', (error) => {
          this.validateError = error;
        });
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.field {
  margin: 0 0 16px 0;

  label {
    display: block;
    margin: 0;
    padding: 0;
    margin: 8px 0;
    text-align: left;
    font-size: 24px;
  }

  .help-text {
    text-align: left;
    font-size: 18px;
    margin: 4px 0;
  }

  .validate-error {
    @extend .help-text;

    color: red;
  }
}
</style>
