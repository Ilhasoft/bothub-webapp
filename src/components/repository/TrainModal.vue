<template>
  <bh-modal :open.sync="openValue">
    <div class="train-modal">
      <h1 class="title is-3">Train Status</h1>
      <div
        v-for="(requirements, lang) in requirementsToTrain"
        :key="lang">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>{{ lang | languageVerbose }} is not ready to train</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(requirement, i) in requirements"
              :key="i">
              <td>{{ requirement }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="train-modal__buttons">
        <bh-button
          :disabled="!readyForTrain"
          primary>
          <bh-icon />
          <span>Train</span>
        </bh-button>
      </div>
    </div>
  </bh-modal>
</template>

<script>
export default {
  name: 'TrainModal',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    readyForTrain: {
      type: Boolean,
      required: true,
    },
    requirementsToTrain: {
      type: Object,
      required: true,
    },
    languagesReadyForTrain: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      openValue: this.open,
    };
  },
  watch: {
    openValue(value) {
      this.$emit('update:open', value);
    },
  },
};
</script>

<style lang="scss" scoped>
.train-modal {
  padding: .5rem;

  &__buttons {
    margin-top: 1rem;
    text-align: right;

    > * {
      display: inline-block;
    }
  }
}
</style>
