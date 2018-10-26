<template>
  <div class="bh-grid">
    <div class="bh-grid__item">
      <div class="contrast-colors__test">
        <div class="text-color-lighter-grey">lighter-grey</div>
        <div class="background-color-lighter-grey">
          <div class="text-color-grey">grey</div>
          <div class="background-color-grey">
            <div class="text-color-bolder-grey">bolder-grey</div>
            <div class="background-color-bolder-grey" />
          </div>
        </div>
      </div>
    </div>
    <div class="bh-grid__item">
      <div class="contrast-colors__test">
        <div class="text-color-bolder-grey">bolder-grey</div>
        <div class="background-color-bolder-grey">
          <div class="text-color-grey">grey</div>
          <div class="background-color-grey">
            <div class="text-color-lighter-grey">lighter-grey</div>
            <div class="background-color-lighter-grey" />
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
