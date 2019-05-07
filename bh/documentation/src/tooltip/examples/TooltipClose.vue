<template>
  <div>
    <div class="tooltip-example">
      <bh-tooltip
        :open.sync="tooltipOpen"
        direction="down"
        class="tooltip-example__tooltip">Just click to close!</bh-tooltip>
    </div>
    <hr>
    <div>
      <bh-button
        primary
        @click="openTooltip()">Open tooltip</bh-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TooltipCloseExample',
  data() {
    return {
      tooltipOpen: false,
    };
  },
  methods: {
    openTooltip() {
      this.tooltipOpen = true;
    },
  },
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
