<template>
  <img :src="svg" svg-inline :class="{
      'container-icon': true,
      [`container-icon--${size}`]: !!size,
      'container-icon--spin': spin,
      'set-fill': true,
      'set-fill-mobile': fillMobile,
      'set-fill-primary': fillPrimary
    }"/>
</template>

<script>
import icons from '@/utils/icons';

export default {
  name: 'CustomIcon',
  props: {
    value: {
      type: String,
      default: 'help-text',
    },
    size: {
      type: String,
      default: null,
    },
    spin: {
      type: Boolean,
      default: false,
    },
    fillMobile: {
      type: Boolean,
      default: false,
    },
    fillPrimary: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    svg() {
      return icons[this.value];
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/variables.scss';


@keyframes IconSpin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.set-fill{
   filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(196deg)
   brightness(104%) contrast(101%);
}

.set-fill-primary{
  filter: invert(49%) sepia(98%) saturate(318%) hue-rotate(123deg)
  brightness(106%) contrast(90%);
}

.set-fill-mobile{
    @media screen and (max-width: $mobile-width) {
      filter: invert(57%) sepia(12%) saturate(2114%) hue-rotate(123deg)
      brightness(108%) contrast(91%);
    }
}

.container {
  &-icon {
    width: 1em;
    height: 1em;
    vertical-align: middle;

    svg {
      display: block;
      width: 100%;
      height: 100%;
      fill: currentColor;
    }

    &--spin {
      svg {
        animation-name: IconSpin;
        animation-duration: 1s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
    }

    @each $size in $icons-sizes {
      $size-name: nth($size, 1);
      $size-value: nth($size, 2);

      &--#{$size-name} {
        width: $size-value;
        height: $size-value;
      }
    }
  }
}
</style>
