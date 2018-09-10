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
        v-bind="$attrs"
        v-model="val"
        type="text" >
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
  watch: {
    value(value) {
      this.val = value;
    },
    val(value) {
      this.$emit('input', value);
    },
  },
  mounted() {
    const { input } = this.$refs;
    this.formatters.reduce((c, f) => f(c), this.value || '');
    if (input) {
      input.oninput = async () => {
        const formattedValue = this.formatters.reduce((c, f) => f(c), input.value);
        const { selectionStart } = input;
        if (input.value !== formattedValue) {
          this.val = formattedValue;
          await this.$nextTick();
          input.setSelectionRange(selectionStart, selectionStart);
        }
      };
    }
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
