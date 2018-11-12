<template>
  <layout>
    <div slot="center">
      <bh-text
        v-model="search"
      >
        <div slot="append">
          <bh-icon-button
            class="text-color-grey-dark"
            value="magnify" />
        </div>
      </bh-text>
    </div>
    <div class="home">
      <div class="bh-grid bh-grid--column">
        <div class="bh-grid__item bh-grid__item--nested">
          <categories-list v-model="currentCategory" />
        </div>
        <div class="bh-grid__item">
          <pagination
            v-if="repositoryList"
            :item-component="RepositoryCard"
            :list="repositoryList" />
          <p
            v-if="repositoryList && repositoryList.empty"
            class="has-text-centered">Repositories not found.</p>
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
import { mapActions } from 'vuex';
import Layout from '@/components/shared/Layout';
import CategoriesList from '@/components/shared/CategoriesList';
import Pagination from '@/components-v1/shared/Pagination';
import RepositoryCard from '@/components/repository/RepositoryCard';


export default {
  name: 'Home',
  components: {
    Layout,
    CategoriesList,
    Pagination,
  },
  data() {
    return {
      RepositoryCard,
      currentCategory: 0,
      repositoryList: null,
      search: '',
    };
  },
  watch: {
    currentCategory() {
      this.updateRepositoryList();
    },
    search() {
      this.updateRepositoryList();
    },
    $route() {
      this.currentCategory = this.$route.query.category || 0;
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

      this.repositoryList = this.currentCategory > 0
        ? await this.searchRepositories({ categories: [this.currentCategory], search })
        : await this.searchRepositories({ search });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/utilities.scss';


.home {
  margin: auto;
  max-width: $max-repository-card-width;
}
</style>
