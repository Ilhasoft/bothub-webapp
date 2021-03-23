<template>
  <div>
    <div class="results-container" v-if="evaluateResultsById[0]">
    <div class="results-container__detail">
      <div class="results-container__detail__header" id="non-printable">
        <div class="results-container__detail__header__description">
            <h2 class="results-container__detail__title">
            <span v-if="hasComparation">
              {{ $t('webapp.result.comparison_of_results') }}
            </span>
            <span v-else>
            {{ $t('webapp.result.evaluate_output') }}
              ({{ $t('webapp.result.test') }} #{{ evaluateResultsById[0] }})
            </span>
          </h2>
            <evaluate-type-tag v-show="!hasComparation" :evaluateType="crossValidation"
              class="results-container__detail__evaluate-tag"/>
        </div>
        <div>
          <b-button
          type="is-primary"
          class="results-container__button" @click="downloadEvaluate()">
            {{ $t('webapp.result.download') }}
            </b-button>
        </div>
      </div>

        <p>
          {{ $t('webapp.result.evaluate_output_text') }}
          <a
          :href="checkDocLanguage.results"
            target="_blank">{{ $t('webapp.result.documentation') }}</a>.
        </p>
      </div>
      <div v-show="!hasComparation">
          <h2 class="results-container__text">
            {{ $t('webapp.evaluate.detailed_results') }}
          </h2>
          <evaluate-result-example-list
            :id="evaluateResultsById[0]"
            :query="query" />
      </div>
      <graphics-result
        :chart-data="resultsData"/>
    </div>
  <p v-else>{{ $t('webapp.evaluate.not_have_results') }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import GraphicsResult from '@/components/repository/repository-evaluate/results/GraphicsResult';
import EvaluateResultExampleList from '@/components/repository/repository-evaluate/results/EvaluateResultExampleList';
import { exampleSearchToDicty, exampleSearchToString } from '@/utils/index';
import EvaluateTypeTag from '@/components/repository/repository-evaluate/results/EvaluateTypeTag';
import I18n from '@/utils/plugins/i18n';

export default {
  name: 'BaseEvaluateResults',
  components: {
    GraphicsResult,
    EvaluateResultExampleList,
    EvaluateTypeTag
  },
  props: {
    repository: {
      type: Object,
      required: true,
    },
    evaluateResultsById: {
      type: Array,
      default: () => []
    },
    filterByLanguage: {
      type: String,
      default: '',
    },
    crossValidation: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      querySchema: {},
      query: {},
      resultsData: [],
    };
  },
  computed: {
    hasComparation(){
      const hasSecondId = this.$route.params.resultsecondId
      return !!hasSecondId
    },
    checkDocLanguage() {
      if (I18n.locale === 'pt-BR') {
        return {
          results: 'https://docs.ilhasoft.mobi/l/pt/testes-categoria/testes#resultados',
        };
      }
      return {
        results: 'https://docs.ilhasoft.mobi/l/en/testing-category/testing-your-intelligence#results',
      };
    },
  },
  watch: {
    filterByLanguage() {
      this.onSearch();
    },
  },
  mounted() {
    this.getResults();
  },
  methods: {
    ...mapActions([
      'getResultsData',
    ]),
    downloadEvaluate() {
      window.print()
    },
    async getResults() {
      if (this.evaluateResultsById){
        this.evaluateResultsById.map(async id => {
          if (id){
            const { data } = await this.getResultsData({
              repositoryUuid: this.repository.uuid,
              resultId: id,
            });
            this.resultsData.push(data);
          }
        })
      }
    },
    onSearch(value) {
      Object.assign(this.querySchema, value);

      if (!this.querySchema.intent) {
        delete this.querySchema.intent;
      }
      if (!this.querySchema.entitie) {
        delete this.querySchema.entitie;
      }
      if (!this.querySchema.label) {
        delete this.querySchema.label;
      }
      const formatedQueryString = exampleSearchToString(this.querySchema);
      this.query = exampleSearchToDicty(formatedQueryString);
      this.query.language = this.filterByLanguage;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

.results-container {

  &__detail {
    display: flex;
    flex-direction: column;

    &__header{
      display: flex;
      justify-content: space-between;

      &__description{
        display: flex;
      }
    }
      &__title {
        font-size: 1.75rem;
        font-weight: $font-weight-medium;
        color: $color-fake-black;
        margin-bottom: $between-title-subtitle;
      }
    &__evaluate-tag{
      margin-top: 0.3rem;
      margin-left: 1rem;
    }
  }
    &__text {
      margin-top: 2rem;
      font-size: 1.75rem;
      font-weight: $font-weight-medium;
      color: $color-fake-black;
      margin-bottom: $between-title-subtitle;
    }
     &__button {
          width: 179px;
          height: 36px;
          font-family: $font-family;
          font-size: $font-size;
          color: $color-white;
      }
}
</style>
