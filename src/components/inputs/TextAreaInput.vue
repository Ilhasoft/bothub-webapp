<template>
  <bh-input>
    <div :class="inputClassAttr.concat(['text-area-entities'])">
      <div class="text-area-entities__input-wrapper">
        <textarea
          ref="input"
          v-bind="$attrs"
          v-model="val"
          class="bh-textarea__input text-area-entities__input"
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
  &-textarea__input {
    font-size: 0.8rem;
  }
}

.bh-textarea__input

.text-area-entities {
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
  }
}
</style>
