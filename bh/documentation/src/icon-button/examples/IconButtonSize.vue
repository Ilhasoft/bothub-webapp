<template>
  <div class="bh-grid">
    <div class="bh-grid__item item">
      <bh-icon-button
        slot="trigger"
        value="dots-horizontal"
        size="small" />
    </div>
    <div class="bh-grid__item item">
      <bh-icon-button
        slot="trigger"
        value="dots-horizontal"
        size="normal" />
    </div>
    <div class="bh-grid__item item">
      <bh-icon-button
        slot="trigger"
        value="dots-horizontal"
        size="medium" />
    </div>
    <div class="bh-grid__item item">
      <bh-icon-button
        slot="trigger"
        value="dots-horizontal"
        size="large" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IconButtonSize',
};
</script>
