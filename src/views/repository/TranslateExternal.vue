<template>
  <repository-view-base
    :repository="repository"
    :quick-test="false"
    :error-code="errorCode">
    <div class="translate-description">
      <h1>{{ $t('webapp.translate.title_translate') }}</h1>
      <p>{{ $t('webapp.translate.subtitle_translate') }}</p>
    </div>
    <div class="repository-translate__list">
      <div class="repository-translate__list__search">
        <!-- <auto-translate
          :token="token"
          translate-to="fr"/> -->
        <translation-sentence-status
          :key="translateUpdate"
          :external-token="token"
          :initial-data="sentenceFilter.key"
          class="repository-translate__list__search__status"
          @search="onFilter"/>
        <filter-examples
          :intents="[]"
          :entities="[]"
          @queryStringFormated="onSearch($event)"/>
      </div>
      <translate-list
        :external-token="token"
        :query="query"
        @translated="examplesTranslated()"
        @isLoadingContent="loadingList = $event"/>
    </div>
  </repository-view-base>
</template>

<script>
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import TranslateList from '@/components/translate/TranslateList';
import RepositoryBase from './Base';
import FilterExamples from '@/components/repository/repository-evaluate/example/FilterEvaluateExample';
import TranslationSentenceStatus from '@/components/translate/TranslationSentenceStatus';
import AutoTranslate from '@/components/translate/AutoTranslate';

export default {
  name: 'RepositoryTranslateExternal',
  components: {
    FilterExamples,
    RepositoryViewBase,
    TranslateList,
    TranslationSentenceStatus,
    AutoTranslate,
  },
  extends: RepositoryBase,
  data() {
    return {
      translateUpdate: false,
      querySchema: {},
      errors: '',
      errorMessage: '',
      eventClick: false,
      eventClickFinish: false,
      loadingList: true,
      hasPhrases: false,
      allTranslations: false,
      query: {},
      sentenceFilter: { key: null, query: null },
    };
  },
  computed: {
    token() {
      return this.$route.params.token;
    },
  },
  watch: {
    querySchema() {
      this.updateQuery();
    },
  },
  methods: {
    examplesTranslated() {
      this.translateUpdate = !this.translateUpdate;
    },
    onSearch(value) {
      this.querySchema = { ...value };
    },
    onFilter({ key, query }) {
      this.sentenceFilter = { key, query };
    },
    updateQuery() {
      this.query = {
        ...this.querySchema.intent ? { intent: this.querySchema.intent } : {},
        ...this.querySchema.entity ? { entity: this.querySchema.entity } : {},
        ...this.querySchema.search ? { search: this.querySchema.search } : {},
        ...this.sentenceFilter.query,
      };
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

.repository-translate {
  background-color: $color-white;
  display:flex;
   flex-direction: column;
  justify-content: space-around;
  align-items: center;


  &__list{
    margin-left: 0.3rem;
  &__search {
    margin: 0.5rem;

    &__status {
      margin: 3rem 0 4.4rem 0;
    }
  }
  }
}

.translate-description{
  margin-left: 0.8rem;
  margin-top: $between-subtitle-content;
  h1{
    font-size: 28px;
    margin-bottom: $between-title-subtitle;
    color: $color-fake-black;
    font-family: $font-family;
    font-weight: $font-weight-bolder;
  }
  p{
    margin-bottom: $between-subtitle-content;
    color: $color-fake-black;
    font-family: $font-family;
    font-size: $font-size
  }
}

</style>
