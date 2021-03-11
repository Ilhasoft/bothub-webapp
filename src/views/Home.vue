<template>
  <div class="home">
    <section class="home__header">
        <unnnic-card
          title="Biblioteca de Inteligências"
          icon="layout-dashboard-2"
          type="title"
          scheme="aux-blue"/>
    </section>

    <home-tab-navigation @changeTabValue="howTabIsShown = $event"/>

    <home-intelligence-from-project
      v-show="howTabIsShown === 0"
      :repositoryList="repositoryLists.mine"/>

    <home-intelligence-from-org
      v-show="howTabIsShown === 1"
      :repositoryList="repositoryLists.org"/>

    <home-intelligence-from-community
      v-show="howTabIsShown === 2"
      :repositoryList="repositoryLists.community"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
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
      repositoryLists: {
        mine: { empty: null },
        org: { empty: null },
        community: { empty: null },
      },
    };
  },
  computed: {
    ...mapGetters([
      'activeTutorial',
    ]),
  },
  mounted(){
    this.getOrgsRepositories()
    this.getMineRepositories()
    this.getCommunityRepositories()
  },
  methods: {
    ...mapActions([
      'getMyRepositories',
      'getContributingRepositories',
      'getUsingRepositories',
      'searchRepositories',
    ]),
    async getCommunityRepositories(){
      const { data: { results } } = await this.searchRepositories()
      this.repositoryLists.community = results
    },
    async getOrgsRepositories(){
      const { data: { results } } = await this.getContributingRepositories()
      this.repositoryLists.org = results
    },
    async getMineRepositories(){
      const { data: { results } } = await this.getMyRepositories()
      this.repositoryLists.mine = results
    }
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/utilities.scss';
@import '~@/assets/scss/variables.scss';
@import '~unnic-system-beta/dist/unnnic.css';
@import '~unnic-system-beta/src/assets/scss/unnnic.scss';


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
