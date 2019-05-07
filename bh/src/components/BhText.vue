<template>
  <bh-input>
    <div :class="inputClassAttr">
      <div
        v-if="$slots.prepend"
        :class="`${className}__prepend`"
      >
        <div :class="`${className}__prepend__content`">
          <slot name="prepend" />
        </div>
      </div>
      <input
        ref="input"
        v-model="val"
        :class="`${className}__input`"
        v-bind="$attrs"
        type="text"
      >
      <slot name="append" />
    </div>
  </bh-input>
</template>

<script>
import DebounceMixin from './DebounceMixin';


export default {
  name: 'BhText',
  mixins: [
    DebounceMixin,
  ],
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
    noBorder: {
      type: Boolean,
      default: false,
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
      if (this.noBorder) {
        classes.push(`${this.className}--no-border`);
      }

      return classes;
    },
    formattedValue() {
      return this.formatters.reduce((c, f) => f(c), this.value || '');
    },
  },
  watch: {
    value() {
      this.val = this.formattedValue;
    },
    val(value) {
      this.onInput(value);
    },
    formatters() {
      this.$nextTick();
      this.val = this.formattedValue;
    },
  },
  mounted() {
    this.val = this.formattedValue;

    const { input } = this.$refs;
    if (input) {
      input.oninput = async () => {
        const formattedValue = this.formatters.reduce((c, f) => f(c), input.value || '');
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
@import '@scss/forms.scss';
@import '@scss/colors.scss';


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
