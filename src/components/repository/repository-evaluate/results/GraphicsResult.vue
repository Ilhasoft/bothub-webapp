<template>
  <div class="graphics-results">
    <div class="graphics-results__wrapper">
      <h2 class="graphics-results__title">
        {{ $t('webapp.result.evaluate_output') }}
        <span v-if="version">
          ({{ $t('webapp.result.test') }} #{{ version }})
        </span>
      </h2>
      <p>
        {{ $t('webapp.result.evaluate_output_text') }}
        <a
          target="_blank"
          href="https://docs.ilhasoft.mobi/bothub/testing-process">{{ $t('webapp.result.documentation') }}</a>.
      </p>

      <div class="graphics-results__info">
        <h3 class="graphics-results__title">
          {{ $t('webapp.result.recall_reports') }}
        </h3>
        <p> {{ $t('webapp.result.recall_reports_text') }} </p>
        <p>
          {{ $t('webapp.result.see_more_in') }}
          <a
            target="_blank"
            href="https://docs.ilhasoft.mobi/bothub/testing-process#precision_and_recall_reports">{{ $t('webapp.result.documentation') }}</a>.
        </p>
      </div>

      <div>
        <h5 class="graphics-results__title">
          {{ $t('webapp.result.intent_report') }}
        </h5>
        <div
          v-if="!loadingIntentsChart"
          class="graphics-results__charts__loading">
          <Loading/>
        </div>
        <canvas
          id="intentsChart"
          class="graphics-results__charts"/>
      </div>
      <div>
        <h5 class="graphics-results__title">
          {{ $tc('webapp.result.entity', 2) }}
        </h5>
        <div
          v-if="!loadingEntitiesChart"
          class="graphics-results__charts__loading">
          <Loading/>
        </div>
        <canvas
          id="entitiesChart"
          ref="entitiesChart"
          class="graphics-results__charts"/>
      </div>
    </div>
    <div>
      <div class="graphics-results__info">
        <h3 class="graphics-results__title">
          {{ $t('webapp.result.intent_confusion_matrix') }}
        </h3>
        <p>
          {{ $t('webapp.result.intent_confusion_matrix_text') }}
          <a
            target="_blank"
            href="https://docs.ilhasoft.mobi/bothub/testing-process#intent_confusion_matrix">{{ $t('webapp.result.documentation') }}</a>.
        </p>
      </div>
      <div class="graphics-results__charts">
        <div
          v-if="!chartData.matrix_chart"
          class="graphics-results__charts__loading">
          <Loading/>
        </div>
        <img
          v-if="chartData.matrix_chart"
          :src="chartData.matrix_chart"
          alt="chart1">
      </div>
    </div>
    <div>
      <div class="graphics-results__info">
        <h3 class="graphics-results__title">
          {{ $t('webapp.result.intent_confidence_distribution') }}
        </h3>
        <p>{{ $t('webapp.result.intent_confidence_distribution_text') }}</p>
        <p>{{ $t('webapp.result.see_more_in') }}
          <a
            target="_blank"
            href="https://docs.ilhasoft.mobi/bothub/testing-process#intent_confidence_distribution">{{ $t('webapp.result.documentation') }}</a>.
        </p>
      </div>
      <div class="graphics-results__charts">
        <div
          v-if="!chartData.confidence_chart"
          class="graphics-results__charts__loading">
          <Loading/>
        </div>
        <img
          v-if="chartData.confidence_chart"
          :src="chartData.confidence_chart"
          alt="chart2">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Chart from 'chart.js';
import Loading from '@/components/shared/Loading';

export default {
  name: 'GraphicsResult',
  components: {
    Loading,
  },
  props: {
    chartData: {
      type: Object,
      default: null,
    },
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
      if (this.chartData) {
        this.chartData.intents_list.forEach((element) => {
          intentsName.push(element.intent);
          intentsPrecision.push(element.score.precision * 100);
          intentsRecall.push(element.score.recall * 100);
        });
      }
      new Promise(() => {
      // eslint-disable-next-line
        const intentChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: intentsName,
            datasets: [
              {
                label: 'Precision',
                data: intentsPrecision,
                backgroundColor: '#2BBFAC',
              },
              {
                label: 'Recal',
                data: intentsRecall,
                backgroundColor: '#4E4871',
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
              }],
              xAxes: [{
                barPercentage: 0.6,
              }],
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
      if (this.chartData) {
        this.chartData.entities_list.forEach((entity) => {
          entitiesName.push(entity.entity);
          entitiesPrecision.push(entity.score.precision * 100);
          entitiesRecall.push(entity.score.recall * 100);
        });
      }
      new Promise(() => {
      // eslint-disable-next-line
        const entitieChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: entitiesName,
            datasets: [
              {
                label: 'Precision',
                data: entitiesPrecision,
                backgroundColor: '#2BBFAC',
              },
              {
                label: 'Recall',
                data: entitiesRecall,
                backgroundColor: '#4E4871',
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
              }],
              xAxes: [{
                barPercentage: 0.6,
              }],
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
.graphics-results {
  margin: 0 auto;

  &__title {
    margin: 2rem 0 0.5rem;
    font-weight: 700;
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
