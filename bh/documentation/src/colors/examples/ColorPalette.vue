<template>
  <div class="colors-palette">
    <div class="background-color-primary">
      <span>primary</span>
    </div>
    <div class="background-primary-darker">
      <span>primary-darker</span>
    </div>
    <div class="background-color-primary">
      <span>primary</span>
    </div>
    <div class="background-color-primary-lighter">
      <span>primary-lighter</span>
    </div>
    <div class="background-color-secondary">
      <span>secondary</span>
    </div>
    <div class="background-color-secondary-lighter">
      <span>secondary-lighter</span>
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
    <div class="background-color-fake-white">
      <span>fake-white</span>
    </div>
    <div class="background-color-gray">
      <span>lighter-grey</span>
    </div>
    <div class="background-color-gray-dark">
      <span>grey</span>
    </div>
    <div class="background-color-fake-black">
      <span>fake-black</span>
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
    }
  }
}
</style>
