<template>
<home-intelligence-container>
  <div class="home-intelligences-from-org">
    <div class="home-intelligences-from-org__cards">
        <home-repository-card
          v-for="list in repositoryOrgList"
          :key="list.uuid"
          :repository-detail="list"/>
      </div>
  </div>
</home-intelligence-container>
</template>
<script>
import { mapActions } from 'vuex';
import HomeRepositoryCard from '@/components/repository/home/HomeRepositoryCard';
import HomeIntelligenceContainer from '@/components/repository/home/HomeIntelligenceContainer';

export default {
  name: 'HomeIntelligenceFromOrg',
  components: { HomeRepositoryCard, HomeIntelligenceContainer },
  data(){
    return {
      repositoryOrgList: []
    }
  },
  mounted(){
    this.getOrgsRepositories()
  },
  methods: {
    ...mapActions([
      'getContributingRepositories',
    ]),
    async getOrgsRepositories(){
      const { data: { results } } = await this.getContributingRepositories()
      this.repositoryOrgList = results
    },
  }
}
</script>

<style lang="scss" scoped>
@import '~unnic-system-beta/dist/unnnic.css';
@import '~unnic-system-beta/src/assets/scss/unnnic.scss';

.home-intelligences-from-org{
  &__cards {
    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(4, 24%);
      @media screen and (max-width: 1400px) {
        grid-template-columns: repeat(3, 32%);
      }
  }
}

</style>
