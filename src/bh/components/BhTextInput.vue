<template>
  <div class="bh-input-wrapper">
    <input
      ref="input"
      type="text"
      v-bind="$attrs"
      v-model="val"
      :class="inputClassAttr" />
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

      return classes.join(' ');
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
