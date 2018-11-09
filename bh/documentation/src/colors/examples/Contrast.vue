<template>
  <div class="bh-grid">
    <div class="bh-grid__item">
      <div class="contrast-colors__test">
        <div class="background-color-grey-light">
          <p class="text-color-grey-darker">grey light</p>
          <div class="background-color-grey">
            <p class="text-color-dark">grey</p>
            <div class="background-color-grey-dark">
              <p class="text-color-grey">grey dark</p>
              <div class="background-color-grey-darker">
                <p class="text-color-grey-light"> grey darker</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bh-grid__item">
      <div class="contrast-colors__test">
        <div class="background-color-grey-darker">
          <p class="text-color-grey-light"> grey darker</p>
          <div class="background-color-grey-dark">
            <p class="text-color-grey">grey dark</p>
            <div class="background-color-grey">
              <p class="text-color-dark">grey</p>
              <div class="background-color-grey-light">
                <p class="text-color-grey-darker">grey light</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContrastColors',
};
</script>

<style lang="scss" scoped>
.contrast-colors {
  &__test {
    div {
      padding: 1rem;
    }
  }
}
</style>
