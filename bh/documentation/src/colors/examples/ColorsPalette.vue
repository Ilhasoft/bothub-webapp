<template>
  <div class="colors-palette">
    <div class="background-color-primary">
      <span>primary</span>
    </div>
    <div class="background-color-secondary">
      <span>secondary</span>
    </div>
    <div class="background-color-danger">
      <span>danger</span>
    </div>
    <div class="background-color-info">
      <span>info</span>
    </div>
    <div class="background-color-warning">
      <span>warning</span>
    </div>
    <div class="background-color-lighter-grey">
      <span>lighter-grey</span>
    </div>
    <div class="background-color-grey">
      <span>grey</span>
    </div>
    <div class="background-color-bolder-grey">
      <span>bolder-grey</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColorsPalette',
};
</script>

<style lang="scss" scoped>
$margin: .5rem;

.colors-palette {
  display: flex;
  flex-wrap: wrap;
  margin: -($margin);

  & > * {
    padding: 2rem;
    margin: $margin;

    span {
      padding: .5rem;
      background-color: rgba(255, 255, 255, .5);
    }
  }
}
</style>
