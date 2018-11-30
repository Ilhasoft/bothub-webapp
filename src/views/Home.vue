<template>
  <layout>
    <div slot="center">
      <bh-text
        v-model="search"
        no-border
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
        <div>
          <repository-card-list
            :category="currentCategory"
            :language="currentLanguage"
            :search="search"
          />
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
import Layout from '@/components/shared/Layout';
import CategoriesList from '@/components/shared/CategoriesList';
import LanguagesList from '@/components/shared/LanguagesList';
import RepositoryCardList from '@/components/repository/RepositoryCardList';


export default {
  name: 'Home',
  components: {
    Layout,
    CategoriesList,
    LanguagesList,
    RepositoryCardList,
  },
  data() {
    return {
      currentLanguage: '',
      currentCategory: 0,
      repositoryList: null,
      search: '',
    };
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
