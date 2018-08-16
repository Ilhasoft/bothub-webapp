<template>
  <div :class="{
    'bh-loading':true,
    [`bh-loading--${this.size}`]: !!this.size,
  }">
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
@import '~bh/assets/scss/colors.scss';
@import '~bh/assets/scss/variables.scss';


.bh {
  &-loading {
    $parent: &;
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

    &--small {
      height: $height-small;

      #{$parent} span {
        width: ($height-small * $reduce-factor);
        height: ($height-small * $reduce-factor);
      }
    }

    &--medium {
      height: $height-medium;

      #{$parent} span {
        width: ($height-medium * $reduce-factor);
        height: ($height-medium * $reduce-factor);
      }
    }

    &--large {
      height: $height-large;

      #{$parent} span {
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
