<template>
  <div :class="classAttr">
    <span />
    <span />
    <span />
  </div>
</template>

<script>
export default {
  name: 'BhLoading',
  props: {
    size: {
      type: String,
      default: null,
    },
  },
  computed: {
    classAttr() {
      const classes = ['bh-loading'];

      if (this.size) {
        classes.push(`bh-loading-${this.size}`);
      }

      return classes;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/assets/scss/colors.scss';
@import '~bh/assets/scss/variables.scss';

.bh {
  &-loading {
    $reduce-factor: .5;

    display: inline-flex;
    align-items: center;
    height: $height-normal;

    span {
      width: ($height-normal * $reduce-factor);
      height: ($height-normal * $reduce-factor);
      background-color: $color-lighter-grey;
      border-radius: 100%;
      animation: bh-loading-bouncedelay 1.4s infinite ease-in-out both;

      &:nth-child(1) {
        animation-delay: -0.32s;
      }

      &:nth-child(2) {
        animation-delay: -0.16s;
      }
    }

    &-small {
      height: $height-small;

      span { /* stylelint-disable-line no-descending-specificity */
        width: ($height-small * $reduce-factor);
        height: ($height-small * $reduce-factor);
      }
    }

    &-medium {
      height: $height-medium;

      span { /* stylelint-disable-line no-descending-specificity */
        width: ($height-medium * $reduce-factor);
        height: ($height-medium * $reduce-factor);
      }
    }

    &-large {
      height: $height-large;

      span { /* stylelint-disable-line no-descending-specificity */
        width: ($height-large * $reduce-factor);
        height: ($height-large * $reduce-factor);
      }
    }
  }
}

@keyframes bh-loading-bouncedelay {
  0%, 80%, 100% {
    transform: scale(0);
  } 40% {
    transform: scale(1.0);
  }
}
</style>
