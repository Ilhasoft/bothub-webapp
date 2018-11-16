<template>
  <layout>
    <div slot="center">
      <bh-text
        v-model="search"
        placeholder="search for bots"
      >
        <div slot="append">
          <bh-icon-button
            size="small"
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
          <div v-if="repositoriesList">
            <repository-card
              v-for="repository in repositoriesList.toArray()"
              :key="repository.uuid"
              :repository="repository" />
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
import Layout from '@/components/shared/Layout';
import CategoriesList from '@/components/shared/CategoriesList';
import RepositoryCard from '@/components/repository/RepositoryCard';
import RepositoriesList from '@/collections/repositories';


export default {
  name: 'Home',
  components: {
    Layout,
    CategoriesList,
    RepositoryCard,
  },
  data() {
    return {
      currentCategory: 0,
      repositoriesList: null,
      search: '',
    };
  },
  watch: {
    currentCategory() {
      this.updateRepositoriesList();
    },
    search() {
      this.updateRepositoriesList();
    },
    $route() {
      this.currentCategory = this.$route.query.category || 0;
    },
  },
  mounted() {
    this.repositoriesList = new RepositoriesList();
    this.updateRepositoriesList();
  },
  methods: {
    async updateRepositoriesList() {
      this.repositoriesList.page(1).fetch();
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
