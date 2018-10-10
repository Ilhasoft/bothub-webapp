<template>
  <div>
    <div class="bh-grid">
      <div class="bh-grid__item">
        <bh-button primary>Primary Button</bh-button>
      </div>
      <div class="bh-grid__item">
        <bh-button
          primary
          inverted>Primary Inverted Button</bh-button>
      </div>
      <div class="bh-grid__item">
        <bh-button
          primary
          transparent>Primary Transparent Button</bh-button>
      </div>
      <div class="bh-grid__item">
        <bh-button secondary>Secondary Button</bh-button>
      </div>
      <div class="bh-grid__item">
        <bh-button rounded>Rounded Button</bh-button>
      </div>
      <div class="bh-grid__item">
        <bh-button
          primary
          tooltip-hover="i'm Tooltip">Button Tooltip</bh-button>
      </div>
      <div class="bh-grid__item">
        <bh-button
          disabled>Disabled Button</bh-button>
      </div>
    </div>
    <bh-button
      full-width>
      Full Width Button
    </bh-button>
  </div>
</template>

<script>
export default {
  name: 'SimpleButton',
};
</script>
