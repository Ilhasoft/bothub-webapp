<template>
  <home-intelligence-container>
    <div class="home-intelligences-from-project">
      <section class="home-intelligences-from-project__content"
      v-if="projectList.length === 0">
        <div class="home-intelligences-from-project__content__text">
          <p>
            {{ $t("webapp.intelligences_lib.unused_projects") }}
          </p>
        </div>
        <div class="home-intelligences-from-project__content__button">
          <unnnic-button type="secondary" iconLeft="add-1" @click="createNewIntelligence()">
            {{ $t("webapp.intelligences_lib.new_intelligence") }}
          </unnnic-button>
        </div>
      </section>
      <div v-else class="home-intelligences-from-project__cards">
        <home-repository-card
          v-for="list in projectList"
          :key="list.uuid"
          :repository-detail="list"
        />
        <infinite-scroll v-show="!isComplete" @intersect="getProjectList()" />
      </div>
    </div>
  </home-intelligence-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import HomeRepositoryCard from '@/components/repository/home/HomeRepositoryCard';
import HomeIntelligenceContainer from '@/components/repository/home/HomeIntelligenceContainer';
import infiniteScroll from '@/components/shared/infiniteScroll';

export default {
  name: 'HomeIntelligenceFromProject',
  components: { HomeRepositoryCard, HomeIntelligenceContainer, infiniteScroll },
  data() {
    return {
      projectList: [],
      page: 0,
      isComplete: false,
      error: null,
      openModal: false,
      modalInfo: {}
    };
  },
  computed: {
    ...mapGetters(['getProjectSelected']),
  },
  mounted(){
    this.getProjectList();
  },
  methods: {
    ...mapActions(['searchProjectWithFlow']),
    async getProjectList() {
      try {
        const { data } = await this.searchProjectWithFlow({
          limit: 21,
          offset: this.page,
          projectUUID: this.getProjectSelected
        });

        console.log('lista', data)
        this.page += 21;
        this.projectList = [...this.projectList, ...data.results];
        this.isComplete = data.next == null;
      } catch (err) {
        this.error = err;
      }
    },
    createNewIntelligence() {
      this.$router.push({
        name: 'new'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@weni/unnnic-system/dist/unnnic.css";
@import "~@weni/unnnic-system/src/assets/scss/unnnic.scss";

.home-intelligences-from-project {
  &__content {
    margin: auto;
    width: 50%;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;

    &__text {
      margin-bottom: 2.25rem;
    }

    &__button * {
      width: 21.625rem;
    }
  }

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
