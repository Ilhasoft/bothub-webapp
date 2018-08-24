<template>
  <div class="bh-card">
    <slot />
    <div
      v-if="$slots.append"
      class="bh-card">
      <slot name="append"/>
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
