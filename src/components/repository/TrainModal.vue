<template>
  <bh-modal
    :open.sync="openValue"
    :title="$t('webapp.train_modal.training_status')">
    <div
      id="tour-training-step-7"
      :is-previous-disabled="true"
      :is-finish-disabled="true"
      class="container">
      <div
        class="train-modal">
        <div class="bh-grid bh-grid--column">
          <strong
            v-if="requirementsToTrainStatus"
            class="text-color-danger text-center bh-grid__item">
            {{ $t('webapp.train_modal.language_warning') }}</strong>
          <strong
            v-if="readyForTrain && !requirementsToTrainStatus"
            class="text-color-primary text-center bh-grid__item">
            {{ $t('webapp.train_modal.status_ok') }}</strong>
          <div
            v-if="requirementsToTrainStatus || languagesWarningsStatus"
            class="train-modal__wrapper bh-grid__item--nested">
            <div v-if="requirementsToTrainStatus">
              <strong>{{ $t('webapp.train_modal.missing_requirements') }}</strong>
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
              <strong>{{ $t('webapp.train_modal.warnings') }}</strong>
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
          :disabled="training"
          primary
          @click="train()">
          <bh-icon
            :value="training ? 'refresh' : 'school'"
            :class="training && 'icon-spin' || null" />
          <span>{{ $t('webapp.train_modal.train') }}</span>
        </bh-button>
        <bh-button
          v-else
          ref="closeBtn"
          primary
          @click="closeModal()">
          <span>{{ $t('webapp.train_modal.ok') }}</span>
        </bh-button >
      </div>
    </div>
  </bh-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
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
      blockedNextStepTutorial: false,
      repositoryStatus: {},
    };
  },
  computed: {
    ...mapGetters([
      'activeTutorial',
      'getRepositoryTraining',
      'getSelectedVersionRepository',
      'getSelectedVersion',
    ]),
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
    ...mapActions([
      'setRepositoryTraining',
      'getRepositoryStatus',
    ]),
    async train() {
      await this.getTrainingStatus();
      await this.setRepositoryTraining(true);
      this.$emit('train');
    },
    async getTrainingStatus() {
      const { data } = await this.getRepositoryStatus({
        repositoryUUID: this.getSelectedVersionRepository,
        repositoryVersion: this.getSelectedVersion,
      });
      this.repositoryStatus = data;
    },
    closeModal() {
      if (this.activeTutorial === 'training') {
        this.$emit('resetTutorial');
      }
      this.$emit('update:open', false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/colors.scss';
.container{
  padding-bottom: 0.5rem;
}

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
