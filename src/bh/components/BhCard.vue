<template>
  <div class="bh-card">
    <slot />
    <div
      v-if="$slots.right"
      class="bh-card__right">
      <slot name="right"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BhCard',
};
</script>
<style lang="scss">

.bh {
  &-card {
    display: flex;
    flex-direction: row;
    border: 1px solid rgba(207, 213, 217, 1);
    border-radius: 4px;
    box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.16);
  }
}
</style>
