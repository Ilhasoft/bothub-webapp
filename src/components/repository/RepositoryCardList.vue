<template>
  <div class="repository-card-list">
    <pagination
      v-if="repositoryList"
      :item-component="exampleItemElem"
      :list="repositoryList"
      :more-button="showMoreButton"
      class="repository-card-list__item" />
    <p
      v-if="repositoryList && repositoryList.empty"
      class="has-text-centered">Repositories not found.</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import Pagination from '@/components/shared/Pagination';
import RepositoryCard from '@/components/repository/RepositoryCard';


export default {
  name: 'RepositoryCardList',
  components: {
    Pagination,
    RepositoryCard,
  },
  props: {
    category: {
      type: Number,
      default: 0,
    },
    language: {
      type: '',
      default: null,
    },
    search: {
      type: '',
      default: null,
    },
    limit: {
      type: '',
      default: null,
    },
    showMoreButton: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      exampleItemElem: RepositoryCard,
      repositoryList: null,
    };
  },
  watch: {
    category() {
      this.updateRepositoryList();
    },
    language() {
      this.updateRepositoryList();
    },
    search() {
      this.updateRepositoryList();
    },
  },
  mounted() {
    this.updateRepositoryList();
  },
  methods: {
    ...mapActions([
      'searchRepositories',
    ]),
    async updateRepositoryList() {
      const { search } = this;
      this.repositoryList = null;

      if (this.category === 0) {
        this.repositoryList = await this.searchRepositories({
          language: this.language,
          search,
          limit: this.limit,
        });
      } else if (this.category > 0) {
        this.repositoryList = await this.searchRepositories({
          categories: this.category,
          language: this.language,
          search,
          limit: this.limit,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/variables.scss';


.repository-card-list {
  &__item {
    display: flex;
    flex-wrap: wrap;
  }

   @media screen and (max-width: $mobile-width) {
    width: 100%;
  }

  &__align-items {
    align-items: center;
  }
}

</style>
