<template>
  <div class="bh-grid bh-grid--column">
    <div class="bh-grid__item">
      <bh-tooltip
        direction="up"
        open>Tooltip Up</bh-tooltip>
    </div>
    <div class="bh-grid__item">
      <bh-tooltip
        direction="down"
        open>Tooltip Down</bh-tooltip>
    </div>
    <div class="bh-grid__item">
      <bh-tooltip
        danger
        open>Tooltip Danger</bh-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TooltipExamples',
};
</script>
