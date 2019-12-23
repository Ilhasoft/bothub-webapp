<template>
  <div class="dashboard-layout">
    <side-bar @colapse="colapseHandle()" />

    <div :class="colapse ? 'dashboard-layout__main-panel': 'dashboard-layout__main-panel--colapsed'">
      <router-view />
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import SideBar from '@/components/repository/sidebar/SideBar.vue';
// import ContentFooter from "./ContentFooter.vue";
// import DashboardContent from "./Content.vue";
// import MobileMenu from "./MobileMenu";
export default {
  components: {
    SideBar,
    // ContentFooter,
    // DashboardContent,
    // MobileMenu
  },
  data() {
    return {
      linkHeight: 65,
      activeLinkIndex: 0,
      windowWidth: 0,
      isWindows: false,
      hasAutoHeight: false,
      links: [],
      isActive: true,
      colapse: true,
    };
  },
  methods: {
    colapseHandle() {
      this.colapse = !this.colapse;
    },
  },
};
</script>
<style lang="scss">
.dashboard-layout {

  &__main-panel {
    width: calc( 100% - 260px);
    position: relative;
    float: right;

    &--colapsed {
       position: relative;
       float: right;
       width: calc( 100% - 80px);
    }
  }
}
</style>
