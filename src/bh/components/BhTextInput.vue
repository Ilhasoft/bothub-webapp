<template>
  <div class="bh-input-wrapper">
    <div :class="inputClassAttr">
      <span
        class="bh-textinput-prependtext"
        v-if="prependText">{{ prependText }}</span>
      <input
        ref="input"
        type="text"
        v-bind="$attrs"
        v-model="val" />
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BhTextInput',
  props: {
    value: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: null,
    },
    prependText: {
      type: String,
      default: null,
    },
  },
  watch: {
    val(value) {
      this.$emit('input', value);
    },
  },
  data() {
    return {
      val: this.value,
    };
  },
  computed: {
    inputClassAttr() {
      const classes = ['bh-textinput'];

      if (this.size) {
        classes.push(`bh-textinput-${this.size}`);
      }

      return classes;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/assets/scss/forms.scss';

.bh {
  &-textinput {
    @include input();
  }
}
</style>
