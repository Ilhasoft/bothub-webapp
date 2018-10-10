<template>
  <div class="bh-grid">
    <div class="bh-grid__item item">
      <bh-icon-button
        slot="trigger"
        value="dots-horizontal"
        size="small"
        @click="buttonClicked()" />
    </div>
    <div class="bh-grid__item item">
      <bh-icon-button
        slot="trigger"
        value="dots-horizontal"
        size="normal"
        @click="buttonClicked()" />
    </div>
    <div class="bh-grid__item item">
      <bh-icon-button
        slot="trigger"
        value="dots-horizontal"
        size="medium"
        @click="buttonClicked()" />
    </div>
    <div class="bh-grid__item item">
      <bh-icon-button
        slot="trigger"
        value="dots-horizontal"
        size="large"
        @click="buttonClicked()" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IconButtonSize',
  methods: {
    buttonClicked() {
      alert('Button Clicked');
    },
  },
};
</script>
