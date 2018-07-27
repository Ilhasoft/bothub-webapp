<template>
  <div class="bh-field">
    <div
      v-if="label !== null"
      class="bh-field-label">
      <span>{{ label || '&nbsp;' }}</span>
      <span
        v-if="helpText"
        class="bh-field-label-help-text">
        <bh-icon
          value="help-text"
          @click="toggleHelpTextTooltip()" />
        <bh-tooltip
          :open.sync="helpTextTooltipOpen"
          class="bh-field-label-help-text-tooltip">
          <p>{{ helpText }}</p>
        </bh-tooltip>
      </span>
    </div>
    <slot class="bh-field-input" />
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
  },
  data() {
    return {
      helpTextTooltipOpen: false,
    };
  },
  methods: {
    toggleHelpTextTooltip() {
      this.helpTextTooltipOpen = !this.helpTextTooltipOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/assets/scss/variables.scss';
@import '~bh/assets/scss/colors.scss';

.bh {
  &-field {
    $margin: 8px 0;

    &-label {
      margin: $margin;
      font-family: $font-family;
      font-size: 1rem;
      font-weight: $font-weight-medium;
      line-height: 1.5rem;
      color: $color-bolder-grey;

      &-help-text {
        position: relative;
        display: inline-block;
        vertical-align: bottom;
        cursor: pointer;

        &-tooltip {
          position: absolute;
          top: 0;
          left: calc(100% + 8px);
          width: max-content;
          max-width: 200px;
        }
      }
    }

    &-input {
      margin: $margin;
    }
  }
}
</style>
