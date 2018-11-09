<template>
  <div class="bh-grid">
    <div class="bh-grid__item item">
      <bh-loading />
    </div>
    <div class="bh-grid__item item">
      <bh-loading class="text-color-grey-dark" />
    </div>
    <div class="bh-grid__item item">
      <bh-loading class="text-color-primary" />
    </div>
    <div class="bh-grid__item item">
      <bh-loading class="text-color-secondary" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingColorsExample',
};
</script>
