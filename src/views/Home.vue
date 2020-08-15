<template>
  <layout>
    <div slot="center">
      <b-input
        v-model="search"
        :placeholder="$t('webapp.layout.search_bots')"
        no-border
        icon-right="magnify"
      />
    </div>
    <div class="home">
      <div class=" home__search">
        <categories-list v-model="currentCategory" />
        <languages-list
          v-model="currentLanguage"
          open-position="bottom-left" />
      </div>
      <div>
        <repository-card-list
          :category="currentCategory"
          :language="currentLanguage"
          :search="search"
          @cardList="getCardList($event)"
        />
      </div>
    </div>
    <tour
      v-if="activeTutorial === 'create_intelligence' && repositoryList !== null"
      :step-count="3"
      name="create_intelligence"/>
  </layout>
</template>

<script>
import { mapGetters } from 'vuex';
import Layout from '@/components/shared/Layout';
import CategoriesList from '@/components/shared/CategoriesList';
import LanguagesList from '@/components/shared/LanguagesList';
import RepositoryCardList from '@/components/repository/RepositoryCardList';
import Tour from '@/components/Tour';

export default {
  name: 'Home',
  components: {
    Layout,
    CategoriesList,
    LanguagesList,
    RepositoryCardList,
    Tour,
  },
  data() {
    return {
      currentLanguage: '',
      currentCategory: 0,
      repositoryList: null,
      search: '',
    };
  },
  computed: {
    ...mapGetters([
      'activeTutorial',
    ]),
  },
  methods: {
    async getCardList(value) {
      this.repositoryList = await value.updateItems(1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/utilities.scss';
@import '~@/assets/scss/variables.scss';


.home {
  margin: auto;
  max-width: $max-repository-card-width;

  &__search {
    display: flex;
    justify-content: flex-end;
    max-width: $max-repository-card-width;
    padding: 1.2rem 1rem;
    margin: auto;

    > * {
      margin-left: 0.625rem;
    }

    @media screen and (max-width: $mobile-width) {
      justify-content: center;
      flex-wrap: wrap;
    }
  }
}
</style>
