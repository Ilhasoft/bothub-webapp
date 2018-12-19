<template>
  <bh-modal
    :open.sync="openValue"
    title="Training Status">
    <div class="train-modal">
      <div class="bh-grid bh-grid--column">
        <strong
          v-if="requirementsToTrainStatus"
          class="text-color-danger text-center bh-grid__item">
          One or more languages cannot be trained in the moment.</strong>
        <strong
          v-if="readyForTrain && !requirementsToTrainStatus"
          class="text-color-primary text-center bh-grid__item">
          Your bot is ready to be trained!</strong>
        <div
          v-if="requirementsToTrainStatus || languagesWarningsStatus"
          class="train-modal__wrapper bh-grid__item--nested">
          <div v-if="requirementsToTrainStatus">
            <strong>Missing requirements</strong>
            <div class="train-modal__wrapper__content-requirements">
              <div
                v-for="(requirements, lang) in requirementsToTrain"
                :key="lang"
                class="train-modal__wrapper__content__item">
                <p
                  v-for="(requirement, i) in requirements"
                  :key="i">
                  <span>{{ requirement }}</span>
                  <language-badge
                    :language="lang"
                    class="train-modal__wrapper__content__item__flag"/>
                </p>
              </div>
            </div>
          </div>
          <div v-if="languagesWarningsStatus">
            <strong>Warnings</strong>
            <div class="train-modal__wrapper__content-warnings">
              <div
                v-for="(warnings, lang) in languagesWarnings"
                :key="lang"
                class="train-modal__wrapper__content__item">
                <p
                  v-for="(warning, index) in warnings"
                  :key="index">
                  <span>{{ warning }}</span>
                  <language-badge
                    :language="lang"
                    class="train-modal__wrapper__content__item__flag" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bh-grid__item text-center train-modal__buttons">
      <bh-button
        v-if="readyForTrain"
        primary
        @click="$emit('train')">
        <bh-icon
          :value="training ? 'refresh' : 'school'"
          :class="training && 'icon-spin' || null" />
        <span>Train</span>
      </bh-button>
      <bh-button
        v-else
        ref="closeBtn"
        primary
        @click="closeModal()">
        <span>Ok</span>
      </bh-button>
    </div>
  </bh-modal>
</template>

<script>
import LanguageBadge from '@/components/shared/LanguageBadge';


export default {
  name: 'TrainModal',
  components: {
    LanguageBadge,
  },
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
    languagesWarnings: {
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
  computed: {
    requirementsToTrainStatus() {
      return Object.keys(this.requirementsToTrain).length !== 0;
    },
    languagesWarningsStatus() {
      return Object.keys(this.languagesWarnings).length !== 0;
    },
  },
  watch: {
    open(value) {
      this.openValue = value;
    },
    openValue(value) {
      this.$emit('update:open', value);
    },
  },
  methods: {
    closeModal() {
      this.$emit('update:open', false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/colors.scss';


.train-modal {
  &__wrapper {
    background-color: $color-fake-white;
    padding: 1.5rem;
    margin: 1rem 0;

    &__content-requirements {
      padding: .5rem;

      &__item {
        margin: .5rem;

        &__flag {
          margin: .25rem;
        }
      }
    }

    &__content-warnings {
      padding: .5rem .5rem 0 .5rem;

      &__item {
        margin: .5rem;

        &__flag {
          margin: .25rem;
        }
      }
    }
  }

  &__buttons {
    margin-bottom: 1.5rem;
  }
}
</style>
