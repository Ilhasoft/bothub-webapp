<template>
  <bh-input>
    <div :class="inputClassAttr.concat(['example-txt-w-highlighted-entities'])">
      <div class="example-txt-w-highlighted-entities__input-wrapper">
        <textarea
          ref="input"
          v-bind="$attrs"
          v-model="val"
          class="bh-textarea__input example-txt-w-highlighted-entities__input"
          @keyup.enter="submit()"
        />
      </div>
      <slot name="append" />
    </div>
  </bh-input>
</template>

<script>
import BH from 'bh';
import Flag from '@/components/shared/Flag';

const components = {
  Flag,
};

export default {
  name: 'TextAreaInput',
  components,
  extends: BH.components.BhTextarea,
  props: {
    // eslint-disable-next-line vue/require-prop-types
    updateValue: {
      default: null,
    },
  },
  data() {
    return {};
  },
  computed: {
    entityClassAttr() {
      const classes = ['example-txt-w-highlighted-entities__entity'];

      if (this.size) {
        classes.push(`example-txt-w-highlighted-entities__entity--${this.size}`);
      }

      return classes;
    },
  },
  watch: {
    updateValue() {
      this.updateTextareaHeight();
    },
  },
  methods: {
    submit() {
      this.$emit('submit');
    },
    updateTextareaHeight() {
      this.$nextTick(function update() {
        const { input } = this.$refs;
        const offset = (input.offsetHeight - input.clientHeight);
        const computedStyle = window.getComputedStyle(input);
        input.style.minHeight = this.rows
          ? `${offset + (this.rows * 16)}px`
          : '';
        input.style.height = computedStyle.getPropertyValue('min-height');
        input.style.height = `${offset + input.scrollHeight}px`;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/forms.scss';
@import '~bh/src/assets/scss/variables.scss';

.bh {
  &-textarea {
    background: none;
  }
}

.example-txt-w-highlighted-entities {
  background-color: white;
  border-radius: $form-components-border-radius;

  &__input-wrapper {
    position: relative;
  }

  &__input {
    position: inherit;
    z-index: 1;
  }

  &__entity {
    @include form-component-typography();

    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    height: max-content !important;
    padding: .5rem;
    background: none;
    border-color: transparent;

    &__before,
    &__text {
      color: rgba(0, 0, 0, 0);
      white-space: pre-line;
    }

    &__text {
      border-radius: 4px;
      opacity: .5;
    }

    &--small {
      padding: .5rem;
      font-size: .5rem;
      line-height: .5rem;
    }

    &--normal {
      padding: .65rem 1rem;
    }

    &--medium {
      padding: 1rem;
      font-size: 1rem;
      line-height: 1rem;
    }

    &--large {
      padding: 1.75rem;
      font-size: 1.5rem;
      line-height: 1.5rem;
    }
  }
}
</style>
