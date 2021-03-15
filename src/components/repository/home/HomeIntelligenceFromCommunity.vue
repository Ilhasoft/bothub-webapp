<template>
  <home-intelligence-container>
  <div class="home-intelligences-from-community">
    <div class="home-intelligences-from-community__cards">
        <home-repository-card
          v-for="list in repositoryCommunityList"
          :key="list.uuid"
          :repository-detail="list"/>
      </div>
      <Observer @intersect="getCommunityRepositories"/>
  </div>
  </home-intelligence-container>
</template>
<script>
import { mapActions } from 'vuex';
import HomeRepositoryCard from '@/components/repository/home/HomeRepositoryCard';
import HomeIntelligenceContainer from '@/components/repository/home/HomeIntelligenceContainer';
import Observer from '@/components/repository/home/Observer';

export default {
  name: 'HomeIntelligenceFromCommunity',
  components: { HomeRepositoryCard, HomeIntelligenceContainer, Observer },
  data(){
    return {
      repositoryCommunityList: [],
      observer: null,
      page: 0
    }
  },
  methods: {
    ...mapActions([
      'searchRepositories',
    ]),
    async getCommunityRepositories(){
      const { data: { results } } = await this.searchRepositories({
        limit: 21,
        offset: this.page
      })

      this.page += 21
      this.repositoryCommunityList = [...this.repositoryCommunityList, ...results]
    },
  }
}
</script>

<style lang="scss" scoped>
@import '~unnic-system-beta/dist/unnnic.css';
@import '~unnic-system-beta/src/assets/scss/unnnic.scss';

.home-intelligences-from-community{
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
