<template>
  <div class="bh-grid">
    <div class="bh-grid__item">
      <bh-icon-button
        slot="trigger"
        value="botinho"
        size="normal"
        @click="buttonClicked()" />
    </div>
    <div class="bh-grid__item">
      <bh-icon-button
        slot="trigger"
        value="account"
        size="normal"
        @click="buttonClicked()" />
    </div>
    <div class="bh-grid__item">
      <bh-icon-button
        slot="trigger"
        value="earth"
        size="normal"
        @click="buttonClicked()" />
    </div>
    <div class="bh-grid__item">
      <bh-icon-button
        slot="trigger"
        value="dots-horizontal"
        size="normal"
        @click="buttonClicked()" />
    </div>
    <div class="bh-grid__item">
      <bh-icon-button
        slot="trigger"
        value="close"
        size="normal"
        @click="buttonClicked()" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IconButtonExamples',
  methods: {
    buttonClicked() {
      alert('Button Clicked');
    },
  },
};
</script>
