<template>
  <div class="home">
    <section class="home__header">
        <unnnic-card
          :title="$t('webapp.intelligences_lib.title')"
          icon="layout-dashboard-2"
          type="title"
          scheme="aux-blue"/>
    </section>

    <home-tab-navigation @changeTabValue="howTabIsShown = $event"/>

    <home-intelligence-from-project
      v-show="howTabIsShown === 0"/>

    <home-intelligence-from-org
      v-show="howTabIsShown === 1"/>

    <home-intelligence-from-community
      v-show="howTabIsShown === 2"/>
  </div>
</template>

<script>
import HomeTabNavigation from '@/components/repository/home/HomeTabNavigation';
import HomeIntelligenceFromProject from '@/components/repository/home/HomeIntelligenceFromProject';
import HomeIntelligenceFromCommunity from '../components/repository/home/HomeIntelligenceFromCommunity';
import HomeIntelligenceFromOrg from '../components/repository/home/HomeIntelligenceFromOrg';

export default {
  name: 'Home',
  components: {
    HomeTabNavigation,
    HomeIntelligenceFromProject,
    HomeIntelligenceFromOrg,
    HomeIntelligenceFromCommunity
  },
  data() {
    return {
      howTabIsShown: 0,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/utilities.scss';
@import '~@/assets/scss/variables.scss';
@import '~@weni/unnnic-system/dist/unnnic.css';
@import '~@weni/unnnic-system/src/assets/scss/unnnic.scss';

.home {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: $unnnic-color-background-snow;

    &__header{
      padding: $unnnic-inline-md;
    }
}
</style>
