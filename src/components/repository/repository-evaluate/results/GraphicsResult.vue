<template>
  <div class="graphics-results">
    <div class="graphics-results__wrapper">
      <h2 class="graphics-results__title">
        Evaluate output
        <span v-if="version">
          (Test #{{ version }})
        </span>
      </h2>
      <p>
        For more information about test results, see our <a href="">documentation here</a>.
      </p>

      <div class="graphics-results__info">
        <h3 class="graphics-results__title">
          Precision and recall reports
        </h3>
        <p>
          A perfect precision score of 1.0 means that every test
          result was positive (but says nothing about whether all
          positive results were retrieved) whereas a perfect
          recall score of 1.0 means that all positive results
          were retrieved by the search (but says nothing about
          how many false positives were also retrieved).
        </p>
        <p>
          Read more about in
          <a href="">our documentation</a>.
        </p>
      </div>

      <div>
        <h5 class="graphics-results__title">
          Intent report
        </h5>
        <div
          v-if="!loadingIntentsChart"
          class="graphics-results__charts__loading">
          <bh-loading />
        </div>
        <canvas
          id="intentsChart"
          class="graphics-results__charts"/>
      </div>
      <div>
        <h5 class="graphics-results__title">
          Entities
        </h5>
        <div
          v-if="!loadingEntitiesChart"
          class="graphics-results__charts__loading">
          <bh-loading />
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
          Intent confusion matrix
        </h3>
        <p>
          The confusion matrix shows you which intents
          are mistaken for others. Read more about it in
          <a href="">our documentation</a>.
        </p>
      </div>
      <div class="graphics-results__charts">
        <div
          v-if="!chartData.matrix_chart"
          class="graphics-results__charts__loading">
          <bh-loading />
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
          Intent confidence distribution
        </h3>
        <p>
          The histogram allows you to visualize the
          confidence distribution for all predictions, with the volume of
          correct and incorrect predictions being displayed by green and red bars respectively.
          Improving the quality of your training data will move the
          green histogram bars to the right and
          the red histogram bars to the left of the plot.
        </p>
        <p>Read more about it in
          <a href="">our documentation</a>.
        </p>
      </div>
      <div class="graphics-results__charts">
        <div
          v-if="!chartData.confidence_chart"
          class="graphics-results__charts__loading">
          <bh-loading />
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

export default {
  name: 'GraphicsResult',
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
