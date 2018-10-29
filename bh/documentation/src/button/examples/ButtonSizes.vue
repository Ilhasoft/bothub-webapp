<template>
  <div class="bh-grid">
    <div class="bh-grid__item item">
      <bh-button size="small">Small</bh-button>
    </div>
    <div class="bh-grid__item item">
      <bh-button
        primary
        size="normal">Normal</bh-button>
    </div>
    <div class="bh-grid__item item">
      <bh-button
        primary
        rounded
        size="medium">Medium</bh-button>
    </div>
    <div class="bh-grid__item item">
      <bh-button
        primary
        transparent
        size="large">Large</bh-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ButtonSizes',
};
</script>
