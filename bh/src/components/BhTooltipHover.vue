<template>
  <div
    :class="[
      'bh-tooltip-hover',
      `bh-tooltip-hover--${direction}`,
    ]"
  >
    <bh-tooltip
      :open="open"
      :danger="danger"
      :direction="direction"
      class="bh-tooltip-hover__tooltip"
    ><slot name="tooltip" /></bh-tooltip>
    <div
      class="bh-tooltip-hover__trigger"
      @mouseover="openTootip()"
      @mouseout="closeTooltip()"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BhTooltipHover',
  props: {
    danger: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String,
      default: 'down',
    },
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    openTootip() {
      this.open = true;
    },
    closeTooltip() {
      this.open = false;
    },
  },
};
</script>

<style lang="scss">
.bh {
  &-tooltip-hover {
    $p: &;
    position: relative;
    display: inline;

    &__tooltip {
      position: absolute;
      left: 50%;
      width: max-content;
    }

    &--down {
      #{$p}__tooltip {
        top: -10px;
        transform: translate(-50%, -100%);
      }
    }

    &--up {
      #{$p}__tooltip {
        bottom: -10px;
        transform: translate(-50%, 100%);
      }
    }

    &__trigger {
      display: inline-block;
    }
  }
}
</style>
