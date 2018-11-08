<template>
  <div class="bh-grid">
    <div class="bh-grid__item">
      <div class="contrast-colors__test">
        <div class="background-color-gray-light">
          <p class="text-color-gray-darker">Gray light</p>
          <div class="background-color-gray">
            <p class="text-color-dark">Gray</p>
            <div class="background-color-gray-dark">
              <p class="text-color-gray">Gray dark</p>
              <div class="background-color-gray-darker">
                <p class="text-color-gray-light"> Gray darker</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bh-grid__item">
      <div class="contrast-colors__test">
        <div class="background-color-gray-darker">
          <p class="text-color-gray-light"> Gray darker</p>
          <div class="background-color-gray-dark">
            <p class="text-color-gray">Gray dark</p>
            <div class="background-color-gray">
              <p class="text-color-dark">Gray</p>
              <div class="background-color-gray-light">
                <p class="text-color-gray-darker">Gray light</p>
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
