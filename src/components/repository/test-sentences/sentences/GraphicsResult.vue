<template>
  <div class="chart-results bh-grid bh-grid--column">
    <div class="bh-grid__item">
      <h1>Intents</h1>
      <canvas
        id="intentsChart"
        class="graphics"/>
    </div>
    <div class="bh-grid__item">
      <h1>Entities</h1>
      <canvas
        id="entitiesChart"
        class="graphics"/>
    </div>
    <div class="bh-grid__item">
      <h1>Intent confusion matrix</h1>
      <img
        src="@/assets/imgs/mock-chart1.png"
        alt="chart1">
    </div>
    <div class="bh-grid__item">
      <h1>Intent confidence distribution</h1>
      <img
        src="@/assets/imgs/mock-chart2.png"
        alt="chart2">
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
      const entitieChart = new Chart(ctx, {
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
  },
};
</script>

<style lang="scss" scoped>
.graphics-results {
  &__charts {
     max-width: 100%;
  }
}
</style>
