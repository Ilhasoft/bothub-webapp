<template>
  <div :class="classAttr"><slot /></div>
</template>

<script>
export default {
  name: 'BhBadge',
  props: {
    size: {
      type: String,
      default: null,
    },
  },
  computed: {
    classAttr() {
      const classes = ['bh-badge'];

      if (this.size) {
        classes.push(`bh-badge--${this.size}`);
      }

      return classes;
    },
  },
};
</script>

<style lang="scss">
@import '~bh/assets/scss/variables.scss';
@import '~bh/assets/scss/typography.scss';


.bh {
  &-badge {
    @include typography();

    display: inline-flex;
    height: $height-normal;
    padding: 0 1rem;
    font-size: 1rem;
    line-height: $height-normal;
    background-color: white;
    border-radius: ($height-normal / 2);

    &--small {
      height: $height-small;
      padding: 0 .75rem;
      font-size: .75rem;
      line-height: $height-small;
      border-radius: ($height-small / 2);
    }

    &--medium {
      height: $height-medium;
      padding: 0 1.25rem;
      font-size: 1.25rem;
      line-height: $height-medium;
      border-radius: ($height-medium / 2);
    }

    &--large {
      height: $height-large;
      padding: 0 1.5rem;
      font-size: 1.5rem;
      line-height: $height-large;
      border-radius: ($height-large / 2);
    }

    > * {
      margin-right: 8px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
