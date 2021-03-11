<template>
  <div class="home-intelligences-container">
      <slot />
  </div>
</template>
<script>
export default {
  name: 'HomeIntelligenceContainer',
  props: {
    repositoryList: {
      type: Array,
      default: null,
    }
  }

}
</script>

<style lang="scss" scoped>
@import '~unnic-system-beta/dist/unnnic.css';
@import '~unnic-system-beta/src/assets/scss/unnnic.scss';

.home-intelligences-container{
  height: 63vh;
  overflow: auto;
  padding: $unnnic-inline-md;
  background-color: $unnnic-color-background-snow;
}

</style>
