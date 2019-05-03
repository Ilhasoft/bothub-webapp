<template>
  <div
    class="graphics-results bh-grid bh-grid--column">
    <div class="bh-grid__item graphics-results_wrapper">
      <h2 class="graphic-results">Intents</h2>
      <canvas
        v-if="chartData"
        id="intentsChart"
        class="graphics-results__charts"/>
      <bh-loading
        v-else
        class="text-color-primary"/>
    </div>
    <div class="bh-grid__item">
      <h2>Entities</h2>
      <canvas
        id="entitiesChart"
        class="graphics-results__charts"/>
    </div>
    <div class="bh-grid__item">
      <h2>Intent confusion matrix</h2>
      <div class="graphics-results__charts">
        <img
          :src="chartData.matrix_chart"
          alt="chart1">
      </div>
    </div>
    <div class="bh-grid__item">
      <h2>Intent confidence distribution</h2>
      <div class="graphics-results__charts">
        <img
          :src="chartData.confidence_chart"
          alt="chart2">
      </div>
    </div>
  </div>
</template>

<script>
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
    };
  },
  watch: {
    chartData() {
      this.createIntentChart();
      this.createEntitiesChart();
    },
  },
  methods: {
    createIntentChart() {
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

      const ctx = document.getElementById('intentsChart');
      // eslint-disable-next-line
      const intentChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: intentsName,
          datasets: [
            {
              label: 'Precision',
              data: intentsPrecision,
              backgroundColor: '#00c853',
            },
            {
              label: 'Recal',
              data: intentsRecall,
              backgroundColor: 'red',
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
    },
    createEntitiesChart() {
      const ctx = document.getElementById('entitiesChart');
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
      // eslint-disable-next-line
      const entitieChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: entitiesName,
          datasets: [
            {
              label: 'Precision',
              data: entitiesPrecision,
              backgroundColor: '#00c853',
            },
            {
              label: 'Recall',
              data: entitiesRecall,
              backgroundColor: 'red',
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
    },
  },
};
</script>

<style lang="scss" scoped>
.graphics-results {
  width: 80%;
  margin: 0 auto;

  &__charts {
    text-align: center;
  }
}
</style>
