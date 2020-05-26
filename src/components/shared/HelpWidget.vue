<template>
  <b-icon
    class="help-widget-icon"
    icon="help-circle"
    @click.native="open()" />
</template>

<script>
import lighthouse from '@/utils/plugins/lighthouse';

export default {
  mounted() {
    lighthouse.addLighthouse();
  },
  methods: {
    open() {
      lighthouse.setPanelHidden(false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
.help-widget-icon {
    color: $color-grey-dark;
    cursor: pointer;
}
</style>
