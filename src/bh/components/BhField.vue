<template>
  <div :class="classAttr">
    <div
      v-if="label !== null"
      class="bh-field__label">
      <span>{{ label || '&nbsp;' }}</span>
      <span
        v-if="helpText"
        class="bh-field__label__help-text">
        <bh-icon
          value="help-text"
          @click="toggleHelpTextTooltip()" />
        <bh-tooltip
          :open.sync="helpTextTooltipOpen"
          class="bh-field__label__help-text__tooltip">
          <p>{{ helpText }}</p>
        </bh-tooltip>
      </span>
    </div>
    <div class="bh-field__input">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BhField',
  props: {
    label: {
      type: String,
      default: null,
    },
    helpText: {
      type: String,
      default: null,
    },
    errors: {
      type: Array,
      default: () => ([]),
    },
  },
  provide() {
    const bhField = {};
    Object.defineProperty(bhField, 'errors', {
      enumerable: true,
      get: () => this.errors,
    });
    return { bhField };
  },
  data() {
    return {
      helpTextTooltipOpen: false,
    };
  },
  computed: {
    classAttr() {
      const classes = ['bh-field'];

      if (this.errors.length > 0) {
        classes.push('bh-field--has-error');
      }

      return classes;
    },
  },
  methods: {
    toggleHelpTextTooltip() {
      this.helpTextTooltipOpen = !this.helpTextTooltipOpen;
    },
  },
};
</script>

<style lang="scss">
@import '~bh/assets/scss/variables.scss';
@import '~bh/assets/scss/colors.scss';


.bh {
  &-field {
    $parent: &;
    $margin: 8px 0;

    &__label {
      margin: $margin;
      font-family: $font-family;
      font-size: 1rem;
      font-weight: $font-weight-medium;
      line-height: 1.5rem;
      color: $color-bolder-grey;

      &__help-text {
        position: relative;
        display: inline-block;
        vertical-align: bottom;
        cursor: pointer;

        &__tooltip {
          position: absolute;
          top: 0;
          left: calc(100% + 8px);
          width: max-content;
          max-width: 200px;
        }
      }
    }

    &__input {
      margin: $margin;
    }

    &--has-error {
      #{$parent}__label {
        color: $color-danger;
      }
    }
  }
}
</style>
