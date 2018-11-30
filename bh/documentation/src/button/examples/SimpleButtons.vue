<template>
  <div>
    <div class="simple-buttons__list">
      <bh-button primary>Primary Button</bh-button>
      <bh-button secondary>Secondary Button</bh-button>
      <bh-button color="info">Info Button</bh-button>
      <bh-button color="warning">Warning Button</bh-button>
      <bh-button color="danger">Danger Button</bh-button>
      <bh-button
        primary
        inverted>Primary Inverted Button</bh-button>
      <bh-button
        secondary
        inverted>Secondary Inverted Button</bh-button>
      <bh-button
        primary
        transparent>Primary Transparent Button</bh-button>
      <bh-button
        secondary
        transparent>Secondary Transparent Button</bh-button>
      <bh-button
        primary
        rounded>Primary Rounded Button</bh-button>
      <bh-button rounded>Rounded Button</bh-button>
      <bh-button
        primary
        tooltip-hover="I'm Tooltip">Button Tooltip</bh-button>
      <bh-button disabled>Disabled Button</bh-button>
      <bh-button>Button</bh-button>
    </div>
    <div class="simple-buttons__list">
      <div>
        <bh-button full-width>
          Full Width Button
        </bh-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimpleButton',
};
</script>

<style lang="scss" scoped>
.simple-buttons {
  &__list {
    $margin: .5rem;

    margin: -($margin);

    > * {
      margin: $margin;
    }
  }
}
</style>
