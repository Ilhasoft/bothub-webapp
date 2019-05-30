<template>
  <div class="colors-palette">
    <div class="background-color-primary-darker">
      <span>primary darker</span>
    </div>
    <div class="background-color-primary-dark">
      <span>primary dark</span>
    </div>
    <div class="background-color-primary">
      <span>primary</span>
    </div>
    <div class="background-color-primary-light">
      <span>primary light</span>
    </div>
    <div class="background-color-secondary-darker">
      <span>secondary darker</span>
    </div>
    <div class="background-color-secondary">
      <span>secondary</span>
    </div>
    <div class="background-color-secondary-light">
      <span>secondary light</span>
    </div>
    <div class="background-color-grey-darker">
      <span>grey darker</span>
    </div>
    <div class="background-color-grey-dark">
      <span>grey dark</span>
    </div>
    <div class="background-color-grey">
      <span>grey</span>
    </div>
    <div class="background-color-grey-light">
      <span>grey light</span>
    </div>
    <div class="background-color-fake-black">
      <span>fake black</span>
    </div>
    <div class="background-color-fake-white">
      <span>fake white</span>
    </div>
    <div class="background-color-danger">
      <span>danger</span>
    </div>
    <div class="background-color-warning">
      <span>warning</span>
    </div>
    <div class="background-color-info">
      <span>info</span>
    </div>
    <div class="background-color-success">
      <span>success</span>
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
    border-radius: 5rem;

    span {
      padding: .5rem;
    }
  }
}
</style>
