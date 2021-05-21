<template>
  <home-intelligence-container>
    <div class="loading" v-if="loading">
      <h1>{{ $t("webapp.infinite_scroll.title") }}...</h1>
    </div>
    <div class="home-intelligences-from-project" v-else>
      <section class="home-intelligences-from-project__content" v-if="checkProjectLength">
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
      <div class="home-intelligences-from-project__cards" v-else>
        <home-repository-card
          v-for="list in projectList"
          :key="list.uuid"
          :repository-detail="list"
          @dispatchShowModal="showModal($event)"
        />
      </div>
    </div>
    <modal-container
      :info-modal="modalInfo"
      :show-modal="openModal"
      @closeModal="openModal = false"
    >
    </modal-container>
  </home-intelligence-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import HomeRepositoryCard from '@/components/repository/home/HomeRepositoryCard';
import HomeIntelligenceContainer from '@/components/repository/home/HomeIntelligenceContainer';
import ModalContainer from '@/components/repository/home/ModalContainer';

export default {
  name: 'HomeIntelligenceFromProject',
  components: { HomeRepositoryCard, HomeIntelligenceContainer, ModalContainer },
  data() {
    return {
      projectList: [],
      error: null,
      modalInfo: {},
      openModal: false,
      loading: true
    };
  },
  computed: {
    ...mapGetters(['getProjectSelected']),
    checkProjectLength(){
      return this.projectList.length === 0
    },
  },
  mounted() {
    this.getProjectList();
  },
  methods: {
    ...mapActions(['searchProjectWithFlow']),
    showModal(value) {
      this.openModal = true;
      this.modalInfo = { ...value };
    },
    async getProjectList() {
      try {
        const { data } = await this.searchProjectWithFlow({
          projectUUID: this.getProjectSelected
        });
        this.projectList = data;
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
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

.loading {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $unnnic-color-neutral-cloudy;
}
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
