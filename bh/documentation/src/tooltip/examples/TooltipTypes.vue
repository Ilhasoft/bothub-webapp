<template>
  <div class="bh-grid">
    <div class="bh-grid__item">
      <div class="tooltip-example">
        <bh-tooltip
          class="tooltip-example__tooltip"
          direction="up"
          open>Tooltip Up</bh-tooltip>
      </div>
    </div>
    <div class="bh-grid__item">
      <div class="tooltip-example">
        <bh-tooltip
          class="tooltip-example__tooltip"
          direction="down"
          open>Tooltip Down</bh-tooltip>
      </div>
    </div>
    <div class="bh-grid__item">
      <div class="tooltip-example">
        <bh-tooltip
          class="tooltip-example__tooltip"
          danger
          direction="down"
          open>Tooltip Danger</bh-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TooltipTypesExample',
};
</script>

<style lang="scss" scoped>
.tooltip-example {
  position: relative;
  height: 10rem;
  background-color: #dddddd;

  &__tooltip {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
