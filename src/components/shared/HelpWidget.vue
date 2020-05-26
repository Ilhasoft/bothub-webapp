<template>
  <b-icon
    class="help-widget-icon"
    icon="help-circle"
    @click.native="open()" />
</template>

<script>
import lighthouse from '@/utils/plugins/lighthouse';

export default {
  name: 'HelpWidget',
  props: {
    articleId: {
      type: String,
      default: null,
    },
  },
  mounted() {
    lighthouse.addLighthouse();
  },
  beforeDestroy() {
    lighthouse.setPanelHidden(true);
  },
  methods: {
    open() {
      lighthouse.setPanelHidden(false);
      lighthouse.navigateToArticle(this.articleId);
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
