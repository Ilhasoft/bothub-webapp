<template>
  <bh-input>
    <div :class="inputClassAttr">
      <div
        v-if="$slots.prepend"
        :class="`${className}__prepend`">
        <div :class="`${className}__prepend__content`">
          <slot name="prepend" />
        </div>
      </div>
      <input
        ref="input"
        :class="`${className}__input`"
        type="text"
        v-bind="$attrs"
        v-model="val" />
      <slot name="append" />
    </div>
  </bh-input>
</template>

<script>
export default {
  name: 'BhText',
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
    formatters: {
      type: Array,
      default: () => ([]),
    },
  },
  watch: {
    value(value) {
      this.val = value;
    },
    val(value) {
      const out = this.formatters.reduce((c, f) => f(c), value);
      this.val = out;
      this.$emit('input', out);
    },
  },
  data() {
    return {
      className: 'bh-text',
      val: this.value,
    };
  },
  computed: {
    inputClassAttr() {
      const classes = [this.className];

      if (this.size) {
        classes.push(`${this.className}--${this.size}`);
      }

      return classes;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/assets/scss/forms.scss';
@import '~bh/assets/scss/colors.scss';


.bh {
  $parent: &;

  &-text {
    @include text();
  }

  &-input {
    &--has-error {
      #{$parent}-text {
        border-color: $color-danger;
      }
    }
  }
}
</style>
