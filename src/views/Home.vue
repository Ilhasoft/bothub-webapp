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
        <div class="bh-grid home__keep-inline ">
          <div class="bh-grid__item">
            <categories-list v-model="currentCategory" />
          </div>
          <div class="bh-grid__item bh-grid__item--grow-0">
            <languages-list v-model="currentLanguage" />
          </div>
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
import LanguagesList from '@/components/shared/LanguagesList';
import Pagination from '@/components-v1/shared/Pagination';
import RepositoryCard from '@/components/repository/RepositoryCard';


export default {
  name: 'Home',
  components: {
    Layout,
    CategoriesList,
    Pagination,
    LanguagesList,
  },
  data() {
    return {
      RepositoryCard,
      currentLanguage: '',
      currentCategory: 0,
      repositoryList: null,
      search: '',
    };
  },
  watch: {
    currentLanguage() {
      this.updateRepositoryList();
    },
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

      if (this.currentCategory === 0) {
        this.repositoryList = await this.searchRepositories({
          language: this.currentLanguage,
          search,
        });
      } else if (this.currentCategory > 0) {
        this.repositoryList = await this.searchRepositories({
          categories: this.currentCategory,
          language: this.currentLanguage,
          search,
        });
      } else {
        this.repositoryList = await this.searchRepositories({
          search,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/utilities.scss';
@import '~bh/src/assets/scss/variables.scss';


.home {
  margin: auto;
  max-width: $max-repository-card-width;

  &__keep-inline {
    @media screen and (max-width: $mobile-width) {
      flex-direction: row;
    }
  }
}
</style>
