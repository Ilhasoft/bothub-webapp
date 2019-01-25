<template>
  <div class="bh-grid bh-grid--column">
    <div class="bh-grid__item">
      <bh-button
        primary
        @click="previous()">Previous</bh-button>
      <bh-button
        primary
        @click="next()">Next</bh-button>
    </div>
    <div class="bh-grid__item">
      <bh-stepper
        :steps="steps"
        :current-step="currentValue"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActionStepperExample',
  data() {
    return {
      steps: 4,
      currentValue: 1,
    };
  },
  methods: {
    next() {
      if (this.currentValue < this.steps) {
        this.currentValue += 1;
      }
    },
    previous() {
      if (this.currentValue !== 1) {
        this.currentValue -= 1;
      }
    },
  },
};
</script>
