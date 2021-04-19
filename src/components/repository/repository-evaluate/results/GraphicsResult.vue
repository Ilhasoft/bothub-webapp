<template>
  <div class="graphics-results">
    <div>
      <div class="graphics-results__info">
        <h3 class="graphics-results__title">
          {{ $t('webapp.result.f1_score') }}
        </h3>
        <p> {{ $t('webapp.result.f1_score_text') }} </p>
        <p>
          {{ $t('webapp.result.see_more_in') }}
          <a
            :href="checkDocLanguage.precision_recall"
            target="_blank">{{ $t('webapp.result.documentation') }}</a>.
        </p>
      </div>

      <div>
        <h5 class="graphics-results__subtitle">
          {{ $t('webapp.result.intent_report') }}
        </h5>
        <div
          v-show="!loadingIntentsChart"
          class="graphics-results__charts__loading">
          <loading/>
        </div>
        <p class="graphics-results__subtitle__center" v-show="loadingIntentsChart">
          {{ $t('webapp.result.graphic_subtitle') }}
        </p>
        <canvas
          id="intentsChart"
          class="graphics-results__charts"/>
      </div>
      <div>
        <h5 class="graphics-results__subtitle">
          {{ $t('webapp.result.entity_report') }}
        </h5>
        <div
          v-show="!loadingEntitiesChart"
          class="graphics-results__charts__loading">
          <loading/>
        </div>
       <p class="graphics-results__subtitle__center" v-show="loadingIntentsChart">
          {{ $t('webapp.result.graphic_subtitle') }}
        </p>
        <canvas
          id="entitiesChart"
          ref="entitiesChart"
          class="graphics-results__charts"/>
      </div>
    </div>
    <div v-show="!hasComparation">
      <div class="graphics-results__info">
        <h3 class="graphics-results__title">
          {{ $t('webapp.result.intent_confusion_matrix') }}
        </h3>
        <p>
          {{ $t('webapp.result.intent_confusion_matrix_text') }}
          <a
            :href="checkDocLanguage.matrix"
            target="_blank">{{ $t('webapp.result.documentation') }}</a>.
        </p>
      </div>
      <div class="graphics-results__charts">
        <div
          v-if="checkMatrixChart === ''"
          class="graphics-results__charts__loading">
          <loading/>
        </div>
        <img
          v-else
          :src="checkMatrixChart"
          alt="chart1">
      </div>
    </div>
    <div v-show="!hasComparation">
      <div class="graphics-results__info">
        <h3 class="graphics-results__title">
          {{ $t('webapp.result.intent_confidence_distribution') }}
        </h3>
        <p>{{ $t('webapp.result.intent_confidence_distribution_text') }}</p>
        <p>{{ $t('webapp.result.see_more_in') }}
          <a
            :href="checkDocLanguage.confidence"
            target="_blank">{{ $t('webapp.result.documentation') }}</a>.
        </p>
      </div>
      <div class="graphics-results__charts">
        <div
          v-if="checkConfidenceChart === ''"
          class="graphics-results__charts__loading">
          <loading/>
        </div>
        <img
          v-else
          :src="checkConfidenceChart"
          alt="chart2">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Chart from 'chart.js';
import Loading from '@/components/shared/Loading';
import I18n from '@/utils/plugins/i18n';
import EvaluateTypeTag from '@/components/repository/repository-evaluate/results/EvaluateTypeTag';

export default {
  name: 'GraphicsResult',
  components: {
    Loading,
    EvaluateTypeTag
  },
  props: {
    chartData: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      loadingEntitiesChart: false,
      loadingIntentsChart: false,
    };
  },
  computed: {
    ...mapState({
      version: state => state.Repository.evaluateResultVersion,
    }),
    ...mapGetters({
      evaluateAmount: 'getEvaluatesToCompare',
    }),
    hasComparation(){
      const hasSecondId = this.$route.params.resultsecondId
      return !!hasSecondId
    },
    checkDocLanguage() {
      if (I18n.locale === 'pt-BR') {
        return {
          precision_recall: 'https://docs.ilhasoft.mobi/l/pt/testes-categoria/testes#relat_rios_de_precis_o_e_cobertura_precision_and_recall_reports',
          matrix: 'https://docs.ilhasoft.mobi/l/pt/testes-categoria/testes#matriz_de_confus_o_de_inten_es_intent_confusion_matrix',
          confidence: 'https://docs.ilhasoft.mobi/l/pt/testes-categoria/testes#distribui_o_de_confian_a_de_inten_es_intent_confidence_distribuition',
        };
      }
      return {
        precision_recall: 'https://docs.ilhasoft.mobi/l/en/testing-category/testing-your-intelligence#precision_and_recall_reports',
        matrix: 'https://docs.ilhasoft.mobi/l/en/testing-category/testing-your-intelligence#intent_confusion_matrix',
        confidence: 'https://docs.ilhasoft.mobi/l/en/testing-category/testing-your-intelligence#intent_confidence_distribution',
      };
    },
    checkConfidenceChart(){
      if (this.chartData.length === 0) return false
      return this.chartData[0].confidence_chart
    },
    checkMatrixChart(){
      if (this.chartData.length === 0) return false
      return this.chartData[0].matrix_chart
    }
  },
  watch: {
    chartData() {
      this.updateCharts();
    },
  },
  methods: {
    updateCharts() {
      this.loadingIntentsChart = true;
      this.loadingEntitiesChart = true;
      this.createIntentChart();
      this.createEntitiesChart();
    },
    createIntentChart() {
      const ctx = document.getElementById('intentsChart');

      if (!ctx) return;
      const intentsName = [];
      const intentsPrecision = [];
      const intentsRecall = [];
      const intentsF1Score = [];

      const intentsNameSecond = [];
      const intentsPrecisionSecond = [];
      const intentsRecallSecond = [];
      const intentsF1ScoreSecond = [];

      if (this.chartData) {
        this.chartData[0].intents_list.forEach((element) => {
          intentsName.push(`${element.intent}`);
          intentsPrecision.push(element.score.precision * 100);
          intentsRecall.push(element.score.recall * 100);
          intentsF1Score.push(element.score.f1_score * 100);
        })
        if (this.chartData.length === 2){
          this.chartData[1].intents_list.forEach((element) => {
            intentsNameSecond.push(`${element.intent}`);
            intentsPrecisionSecond.push(element.score.precision * 100);
            intentsRecallSecond.push(element.score.recall * 100);
            intentsF1ScoreSecond.push(element.score.f1_score * 100);
          })
        }
      }
      new Promise(() => {
        const intentChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: intentsName,
            datasets: this.hasComparation ? [
              {
                label: this.$route.params.resultId,
                data: intentsF1Score,
                backgroundColor: '#1289A7',
                barPercentage: 0.6,
                order: 1
              },
              {
                label: this.$route.params.resultsecondId,
                data: intentsF1ScoreSecond,
                backgroundColor: '#2BBFAC',
                barPercentage: 0.6,
                order: 2
              }
            ] : [
              {
                label: `${this.$t('webapp.result.F1_score')}`,
                data: intentsF1Score,
                backgroundColor: '#1289A7',
                barPercentage: 0.6,
              },
              {
                label: `${this.$t('webapp.result.precision')}`,
                data: intentsPrecision,
                backgroundColor: '#009E96',
                hidden: true,
                barPercentage: 0.6,
              },
              {
                label: `${this.$t('webapp.result.recall')}`,
                data: intentsRecall,
                backgroundColor: '#4E4871',
                hidden: true,
                barPercentage: 0.6,
              },
            ],
          },
          options: {
            showLines: false,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  callback(value) {
                    return `${value}%`;
                  },
                },
              }]
            },
          },
        });
      }).then((resolve) => {
        this.loadingIntentsChart = false;
        resolve();
      });
    },
    createEntitiesChart() {
      const ctx = document.getElementById('entitiesChart');

      if (!ctx) return;

      const entitiesName = [];
      const entitiesPrecision = [];
      const entitiesRecall = [];
      const entitiesF1Score = [];

      const entitiesNameSecond = [];
      const entitiesPrecisionSecond = [];
      const entitiesRecallSecond = [];
      const entitiesF1ScoreSecond = [];


      if (this.chartData) {
        this.chartData[0].entities_list.forEach((element) => {
          entitiesName.push(`${element.entity}`);
          entitiesPrecision.push(element.score.precision * 100);
          entitiesRecall.push(element.score.recall * 100);
          entitiesF1Score.push(element.score.f1_score * 100);
        })
        if (this.chartData.length === 2){
          this.chartData[1].entities_list.forEach((element) => {
            entitiesNameSecond.push(`${element.entity}`);
            entitiesPrecisionSecond.push(element.score.precision * 100);
            entitiesRecallSecond.push(element.score.recall * 100);
            entitiesF1ScoreSecond.push(element.score.f1_score * 100);
          })
        }
      }
      new Promise(() => {
        const entitieChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: entitiesName,
            datasets: this.hasComparation ? [
              {
                label: this.$route.params.resultId,
                data: entitiesF1Score,
                backgroundColor: '#1289A7',
                barPercentage: 0.6,
                order: 1
              },
              {
                label: this.$route.params.resultsecondId,
                data: entitiesF1ScoreSecond,
                backgroundColor: '#2BBFAC',
                barPercentage: 0.6,
                order: 2
              }
            ] : [
              {
                label: `${this.$t('webapp.result.F1_score')}`,
                data: entitiesF1Score,
                backgroundColor: '#1289A7',
                barPercentage: 0.6,
              },
              {
                label: `${this.$t('webapp.result.precision')}`,
                data: entitiesPrecision,
                backgroundColor: '#009E96',
                hidden: true,
                barPercentage: 0.6,
              },
              {
                label: `${this.$t('webapp.result.recall')}`,
                data: entitiesRecall,
                backgroundColor: '#4E4871',
                hidden: true,
                barPercentage: 0.6,
              },
            ],
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  callback(value) {
                    return `${value}%`;
                  },
                },
              }]
            },
          },
        });
      }).then((resolve) => {
        this.loadingEntitiesChart = false;
        resolve();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

.graphics-results {
  margin: 0 auto;
  font-family: $font-family;

  &__detail {
    display: flex;
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


  &__title {
    margin: 2rem 0 0.5rem;
    font-size: 1.75rem;
    font-weight: $font-weight-medium;
    color: $color-fake-black;
    margin-bottom: $between-title-subtitle;
  }

  &__subtitle {
    margin: 2rem 0 0.5rem;
    font-family: $font-family;
    font-weight: $font-weight-bolder;

    &__center{
      margin: auto;
      text-align: center;
    }
  }

  &__info {
    margin-bottom: 1rem;
  }

  &__charts {
    text-align: center;

    &__loading {
      width: 100%;
      text-align: center;
    }
  }
}
</style>
