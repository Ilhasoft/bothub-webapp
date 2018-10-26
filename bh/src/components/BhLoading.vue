<template>
  <div
    :class="{
      'bh-loading':true,
      [`bh-loading--${size}`]: !!size,
    }"
  >
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
};
</script>

<style lang="scss">
@import '@scss/colors.scss';
@import '@scss/variables.scss';


.bh {
  &-loading {
    $parent: &;
    $reduce-factor: .5;

    display: inline-flex;
    align-items: center;
    height: $size-normal;
    color: $color-lighter-grey;

    span {
      width: ($size-normal * $reduce-factor);
      height: ($size-normal * $reduce-factor);
      background-color: currentColor;
      border-radius: 100%;
      animation: bh-loading-bouncedelay 1.4s infinite ease-in-out both;

      &:nth-child(1) {
        animation-delay: -0.32s;
      }

      &:nth-child(2) {
        animation-delay: -0.16s;
      }
    }

    &--small {
      height: $size-small;

      #{$parent} span {
        width: ($size-small * $reduce-factor);
        height: ($size-small * $reduce-factor);
      }
    }

    &--medium {
      height: $size-medium;

      #{$parent} span {
        width: ($size-medium * $reduce-factor);
        height: ($size-medium * $reduce-factor);
      }
    }

    &--large {
      height: $size-large;

      #{$parent} span {
        width: ($size-large * $reduce-factor);
        height: ($size-large * $reduce-factor);
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
