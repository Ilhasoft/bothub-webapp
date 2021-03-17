<template>
  <home-intelligence-container>
    <div class="home-intelligences-from-org">
      <div class="home-intelligences-from-org__cards">
        <unnnic-card
          clickable
          text="Nova Inteligência"
          type="blank"
          icon="add-1"
          class="home-intelligences-from-org__cards__new"
          @click.native="createNewIntelligence()"
        />
        <home-repository-card
          v-for="list in repositoryOrgList"
          :key="list.uuid"
          :repository-detail="list"
        />
      </div>
      <infinite-scroll
        v-show="!isComplete"
        @intersect="getOrgsRepositories()"
      />
    </div>
  </home-intelligence-container>
</template>
<script>
import { mapActions } from 'vuex';
import HomeRepositoryCard from '@/components/repository/home/HomeRepositoryCard';
import HomeIntelligenceContainer from '@/components/repository/home/HomeIntelligenceContainer';
import infiniteScroll from '@/components/shared/infiniteScroll';

export default {
  name: 'HomeIntelligenceFromOrg',
  components: { HomeRepositoryCard, HomeIntelligenceContainer, infiniteScroll },
  data() {
    return {
      repositoryOrgList: [],
      page: 0,
      isComplete: false,
      error: null,
    };
  },
  methods: {
    ...mapActions(['getRepositories']),
    async getOrgsRepositories() {
      try {
        const { data } = await this.getRepositories({
          limit: 20,
          offset: this.page,
          nickname: 'ilhasoft',
        });
        this.page += 20;
        this.repositoryOrgList = [...this.repositoryOrgList, ...data.results];
        this.isComplete = data.next == null;
      } catch (err) {
        this.error = err;
      }
    },
    createNewIntelligence() {
      this.$router.push({
        name: 'new',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~unnic-system-beta/dist/unnnic.css";
@import "~unnic-system-beta/src/assets/scss/unnnic.scss";

.home-intelligences-from-org {
  &__cards {
    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(4, 24%);
    @media screen and (max-width: 1400px) {
      grid-template-columns: repeat(3, 32%);
    }

    &__new {
      height: 16.8125rem;
      margin-bottom: $unnnic-inline-sm;
    }
  }
}
</style>
