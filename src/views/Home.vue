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
          <repository-card
            v-for="repository in repositoriesList.toArray()"
            :key="repository.uuid"
            :repository="repository" />
          <loading v-if="repositoriesList.loading" />
          <p v-else-if="repositoriesList.isEmpty()">Repositories not found.</p>
          <div
            v-if="!repositoriesList.isEmpty() && !repositoriesList.isLastPage()"
            class="next has-text-centered">
            <button
              :disabled="repositoriesList.loading"
              class="button is-primary"
              @click="nextPage()">More</button>
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
import Loading from '@/components-v1/shared/Loading';
import RepositoriesList from '@/collections/repositories';


export default {
  name: 'Home',
  components: {
    Layout,
    CategoriesList,
    RepositoryCard,
    Loading,
  },
  data() {
    return {
      currentCategory: 0,
      repositoriesList: new RepositoriesList(),
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
    this.updateRepositoriesList();
  },
  methods: {
    async updateRepositoriesList() {
      this.repositoriesList = new RepositoriesList();
      if (this.currentCategory) {
        this.repositoriesList.filter.categories = this.currentCategory;
      }
      this.repositoriesList.fetch();
    },
    async nextPage() {
      this.repositoriesList.fetch();
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
