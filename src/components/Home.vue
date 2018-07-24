<template>
  <layout>
    <header>
      <h1 class="title has-text-white has-text-centered">Robot Society</h1>
      <h2 class="subtitle has-text-white has-text-weight-light has-text-centered">TRAIN YOURS!</h2>
    </header>
    <div class="container">
      <search-bar v-model="search" />
    </div>
    <div class="wrapper">
      <categories-list
        :current="currentCategory"
        v-model="currentCategory" />
      <div class="container">
        <pagination
          v-if="repositoryList"
          class="repository-list"
          :itemComponent="repositoryItemElem"
          :list="repositoryList" />
        <p
          v-if="repositoryList && repositoryList.empty"
          class="has-text-centered">Repositories not found.</p>
      </div>
    </div>
  </layout>
</template>

<script>
import { mapActions } from 'vuex';
import Layout from '@/components/shared/Layout';
import SearchBar from '@/components/shared/SearchBar';
import CategoriesList from '@/components/shared/CategoriesList';
import Pagination from '@/components/shared/Pagination';
import RepositoryCard from '@/components/repository/RepositoryCard';

const components = {
  Layout,
  SearchBar,
  CategoriesList,
  Pagination,
};

export default {
  name: 'Home',
  components,
  mounted() {
    this.updateRepositoryList();
  },
  watch: {
    currentCategory() {
      this.updateRepositoryList();
    },
    search() {
      this.updateRepositoryList();
    },
  },
  data() {
    return {
      currentCategory: 0,
      search: '',
      repositoryItemElem: RepositoryCard,
      repositoryList: null,
    };
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
header {
  margin-bottom: 3rem;
  padding: 0 8px;
}

.wrapper {
  margin-top: -25px;
  background-color: #f8f8f8;
  min-height: 400px;
  padding: calc(25px + 1.5rem) 8px 8px;
}

.repository-list {
  margin: 1.5rem 0;
}
</style>
