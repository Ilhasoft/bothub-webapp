<template>
  <div>
    <div class="bh-grid bh-grid--multiline">
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
    <div class="bh-grid bh-grid--multiline">
      <div class="bh-grid__item">
        <bh-icon-button
          slot="trigger"
          value="check"
          size="normal"
          @click="buttonClicked()" />
      </div>
      <div class="bh-grid__item">
        <bh-icon-button
          slot="trigger"
          value="code-tags"
          size="normal"
          @click="buttonClicked()" />
      </div>
      <div class="bh-grid__item">
        <bh-icon-button
          slot="trigger"
          value="help-text"
          size="normal"
          @click="buttonClicked()" />
      </div>
      <div class="bh-grid__item">
        <bh-icon-button
          slot="trigger"
          value="exclamation"
          size="normal"
          @click="buttonClicked()" />
      </div>
      <div class="bh-grid__item">
        <bh-icon-button
          slot="trigger"
          value="school"
          size="normal"
          @click="buttonClicked()" />
      </div>
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
