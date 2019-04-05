<template>
  <div class="graphics-results bh-grid bh-grid--column">
    <div class="bh-grid__item graphics-results_wrapper">
      <h2 class="graphic-results">Intents</h2>
      <canvas
        id="intentsChart"
        class="graphics-results__charts"/>
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
          src="@/assets/imgs/mock-chart1.png"
          alt="chart1">
      </div>
    </div>
    <div class="bh-grid__item">
      <h2>Intent confidence distribution</h2>
      <div class="graphics-results__charts">
        <img
          src="@/assets/imgs/mock-chart2.png"
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

  },
  data() {
    return {
    };
  },
  mounted() {
    this.createIntentsChart();
    this.createEntitiesChart();
  },
  methods: {
    createIntentsChart() {
      const ctx = document.getElementById('intentsChart');
      // eslint-disable-next-line
      const intentChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['All', 'finances', 'bad_whot', 'health', 'health', 'health', 'health', 'health', 'health', 'health', 'health', 'health', 'health', 'health', 'health', 'health', 'health', 'health'],
          datasets: [
            {
              label: 'Correct',
              data: [67.8, 55, 5, 8, 55, 20, 40, 80, 60, 50, 70, 50, 70, 80, 50, 40, 50],
              backgroundColor: '#00c853',
            },
            {
              label: 'Wrong',
              data: [11.4, 20, 3, 2, 5, 8, 5, 20, 40, 30, 50, 40, 50, 80, 70, 50, 20, 30],
              backgroundColor: 'red',
            },
          ],
        },
        options: {
          scales: {
            xAxes: [{ stacked: true }],
            yAxes: [{ stacked: true }],
          },
        },
      });
    },
    createEntitiesChart() {
      const ctx = document.getElementById('entitiesChart');
      // eslint-disable-next-line
      const entitieChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['All', 'finances', 'bad_whot', 'health', 'health', 'health', 'health', 'health', 'health', 'health', 'health', 'health', 'health', 'health', 'health', 'health', 'health', 'health'],
          datasets: [
            {
              label: 'Correct',
              data: [50, 70, 20, 80, 5, 20, 40, 80, 60, 50, 70, 50, 20, 20, 50, 40, 50],
              backgroundColor: '#00c853',
            },
            {
              label: 'Wrong',
              data: [50, 20, 30, 20, 95, 80, 60, 20, 30, 30, 20, 40, 50, 30, 10, 20, 20],
              backgroundColor: 'red',
            },
          ],
        },
        options: {
          max: 100,
          scales: {
            xAxes: [{ stacked: true }],
            yAxes: [{ stacked: true }],
          },
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.graphics-results {
  max-width: 100%;
  margin:0 auto;
}
</style>
