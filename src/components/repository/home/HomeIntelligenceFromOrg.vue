<template>
<home-intelligence-container>
  <div class="home-intelligences-from-org">
    <div class="home-intelligences-from-org__cards">
        <home-repository-card
          v-for="list in repositoryList"
          :key="list.uuid"
          :repository-detail="list"/>
      </div>
  </div>
</home-intelligence-container>
</template>
<script>
import HomeRepositoryCard from '@/components/repository/home/HomeRepositoryCard';
import HomeIntelligenceContainer from '@/components/repository/home/HomeIntelligenceContainer';

export default {
  name: 'HomeIntelligenceFromOrg',
  components: { HomeRepositoryCard, HomeIntelligenceContainer },
  props: {
    repositoryList: {
      type: [Object, Array],
      default: null,
    }
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
    grid-template-columns: repeat(3, 32%);
  }
}

</style>
