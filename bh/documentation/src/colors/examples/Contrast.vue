<template>
  <div class="bh-grid">
    <div class="bh-grid__item">
      <div class="contrast-colors__test">
        <div class="text-color-gray">lighter-grey</div>
        <div class="background-color-gray">
          <div class="text-color-gray-dark">grey</div>
          <div class="background-color-gray-dark">
            <div class="text-color-fake-black">fake-black</div>
            <div class="background-color-fake-black" />
          </div>
        </div>
      </div>
    </div>
    <div class="bh-grid__item">
      <div class="contrast-colors__test">
        <div class="text-color-fake-black">fake-black</div>
        <div class="background-color-fake-black">
          <div class="text-color-gray-dark">grey</div>
          <div class="background-color-gray-dark">
            <div class="text-color-gray">lighter-grey</div>
            <div class="background-color-gray" />
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
