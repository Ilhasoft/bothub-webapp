<template>
  <home-intelligence-container>
    <div class="home-intelligences-from-community">
      <div class="home-intelligences-from-community__cards">
        <home-repository-card
          v-for="list in repositoryCommunityList"
          :key="list.uuid"
          :repository-detail="list"
          @dispatchShowModal="showModal($event)"
        />
      </div>
      <infinite-scroll
        v-show="!isComplete"
        @intersect="getCommunityRepositories()"
      />
    </div>
    <modal-container
      :info-modal="modalInfo"
      :show-modal="openModal"
      @closeModal="openModal = false">
    </modal-container>
  </home-intelligence-container>
</template>
<script>
import { mapActions } from 'vuex';
import HomeRepositoryCard from '@/components/repository/home/HomeRepositoryCard';
import HomeIntelligenceContainer from '@/components/repository/home/HomeIntelligenceContainer';
import infiniteScroll from '@/components/shared/infiniteScroll';
import ModalContainer from '@/components/repository/home/ModalContainer';

export default {
  name: 'HomeIntelligenceFromCommunity',
  components: { HomeRepositoryCard, HomeIntelligenceContainer, infiniteScroll, ModalContainer },
  data() {
    return {
      repositoryCommunityList: [],
      page: 0,
      isComplete: false,
      error: null,
      openModal: false,
      modalInfo: {
      }
    };
  },
  methods: {
    ...mapActions(['searchRepositories']),
    showModal(value){
      this.openModal = true
      this.modalInfo = { ...value }
    },
    async getCommunityRepositories() {
      try {
        const { data } = await this.searchRepositories({
          limit: 21,
          offset: this.page,
        });
        this.page += 21;
        this.repositoryCommunityList = [
          ...this.repositoryCommunityList,
          ...data.results,
        ];
        this.isComplete = data.next == null;
      } catch (err) {
        this.error = err;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@weni/unnnic-system/dist/unnnic.css";
@import "~@weni/unnnic-system/src/assets/scss/unnnic.scss";

.home-intelligences-from-community {
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
