<template>
  <bh-modal :open.sync="openValue">
    <div class="train-modal">
      <h1>Train Status</h1>
      <div
        v-for="(requirements, lang) in requirementsToTrain"
        :key="lang">
        <table>
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
      <div v-if="Object.keys(requirementsToTrain).length === 0">
        <p>You don't have any pendency to train.</p>
      </div>
      <div class="bh-grid bh-grid--space-between train-modal__buttons">
        <div class="train-modal__flags">
          <div
            v-for="(langReadyForTrain, lang) in languagesReadyForTrain"
            :key="lang"
            class="train-modal__flags__item">
            <bh-language-flag :language="lang" />
            <bh-icon
              :value="langReadyForTrain ? 'check' : 'exclamation'"
              :class="{
                'train-modal__flags__item__status': true,
                'train-modal__flags__item__status--ready': langReadyForTrain,
              }"
              size="small" />
          </div>
        </div>
        <div>
          <bh-button
            :disabled="!readyForTrain"
            primary
            @click="$emit('train')">
            <bh-icon
              :value="training ? 'refresh' : 'school'"
              :class="training && 'icon-spin' || null" />
            <span>Train</span>
          </bh-button>
        </div>
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
    training: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      openValue: this.open,
    };
  },
  watch: {
    open(value) {
      this.openValue = value;
    },
    openValue(value) {
      this.$emit('update:open', value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/colors.scss';


.train-modal {
  padding: .5rem;

  &__buttons {
    margin-top: 1rem;
  }

  $flags-margin: .25rem;
  &__flags {
    display: inline-flex;
    margin: -($flags-margin);

    &__item {
      margin: $flags-margin;

      &__status {
        vertical-align: middle;
        margin-left: -.25rem;
        color: $color-grey;

        &--ready {
          color: $color-primary;
        }
      }
    }
  }
}
</style>
