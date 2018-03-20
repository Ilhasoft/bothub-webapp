<template>
  <div class="field">
    <label>{{ label }}:</label>
    <slot />
    <div v-if="helpText && errorsList.length === 0" class="help-text">{{ helpText }}</div>
    <ul v-if="errorsList.length > 0" class="errors-list">
      <li v-for="(error, index) in errorsList" :key="index">{{ error }}</li>
    </ul>
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
    errors: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      validateError: false,
    };
  },
  computed: {
    errorsList() {
      if (this.validateError) return [this.validateError];
      if (this.errors.length > 0) return this.errors;
      return [];
    },
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

  .errors-list {
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      @extend .help-text;
      color: red;
    }
  }
}
</style>
