<template>
  <div class="home-intelligences-container">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'HomeIntelligenceContainer',
};
</script>

<style lang="scss" scoped>
@import "~@weni/unnnic-system/dist/unnnic.css";
@import "~@weni/unnnic-system/src/assets/scss/unnnic.scss";

.home-intelligences-container {
  height: 63vh;
  overflow-y: auto;
  overflow-x: hidden;
  margin: $unnnic-inline-md;
  background-color: $unnnic-color-background-snow;
}
</style>
