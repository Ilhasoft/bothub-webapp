<template>
  <b-modal :active="open" :can-cancel="false">
    <div id="tour-training-step-7" :is-previous-disabled="true" :is-finish-disabled="true">
      <div class="train-modal">
        <div class="train-modal__close">
          <b-icon icon="close" class="train-modal__close__icon" @click.native="closeModal()" />
        </div>
        <div class="train-modal__container">
          <strong v-if="repositoryTrain" class="train-modal__text-warning">
            {{ $t("webapp.train_modal.ready_for_train_title") }}</strong
          >
          <strong v-else class="train-modal__text-warning">
            {{ $t("webapp.train_modal.language_warning") }}</strong
          >
          <div
            v-if="
              requirementsToTrainStatus ||
                languagesWarningsStatus ||
                languageAvailableToTrain.length === 0
            "
            class="train-modal__wrapper"
          >
            <p v-if="repositoryTrain" class="train-modal__wrapper__subtitle">
              {{ $t("webapp.train_modal.ready_for_train_subtitle") }}
            </p>
            <p v-else-if="languageAvailableToTrain.length === 0">
              {{ $t("webapp.train_modal.language_available") }}
            </p>
            <p v-else class="train-modal__wrapper__subtitle">
              {{ $t("webapp.train_modal.missing_requirements") }}
            </p>
            <div class="train-modal__wrapper__content">
              <div v-if="requirementsToTrainStatus">
                <div
                  v-for="(requirements, lang) in requirementsToTrain"
                  :key="lang"
                  class="train-modal__wrapper__content__content-requirements"
                >
                  <div
                    v-for="(requirement, i) in requirements"
                    :key="i"
                    class="train-modal__wrapper__content__content-requirements__item"
                  >
                    <div class="train-modal__wrapper__content__content-requirements__item__field">
                      <b-tag type="is-primary" rounded>{{ lang }}</b-tag>
                    </div>
                    <p>
                      <strong
                        class="train-modal__wrapper__content__content-requirements__item__text"
                      >
                        {{ firstText(requirement) }}
                      </strong>
                      <br />
                      <span>{{ secondText(requirement) }}</span>
                    </p>
                    <b-icon
                      icon="close"
                      class="train-modal__wrapper__content__content-requirements__item__icon"
                      @click.native="closeModal()"
                    />
                  </div>
                </div>
              </div>
              <div v-if="languagesWarningsStatus">
                <div class="train-modal__wrapper__content__content-requirements">
                  <div
                    v-for="(warnings, lang) in languagesWarnings"
                    :key="lang"
                    class="train-modal__wrapper__content__content-requirements__item"
                  >
                    <div class="train-modal__wrapper__content__content-requirements__item__field">
                      <b-tag type="is-primary" rounded>{{ lang }}</b-tag>
                    </div>
                    <p v-for="(warning, index) in warnings" :key="index">
                      <strong>{{ firstText(warning) }}</strong>
                      <br />
                      <span>{{ secondText(warning) }}</span>
                    </p>
                    <b-icon
                      icon="close"
                      class="train-modal__wrapper__content__content-requirements__item__icon"
                      @click.native="closeModal()"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="train-modal__buttons">
              <b-button
                ref="closeBtn"
                type="is-primary"
                class="train-modal__buttons__style"
                @click="closeModal()"
              >
                <span>{{ $t("webapp.train_modal.cancel") }}</span>
              </b-button>
              <b-button
                v-if="repositoryTrain"
                ref="trainBtn"
                type="is-primary"
                class="train-modal__buttons__style"
                @click="dispatchTrain()"
              >
                <span>{{ $t("webapp.train_modal.train") }}</span>
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LanguageBadge from '@/components/shared/LanguageBadge';

export default {
  name: 'TrainModal',
  components: {
    LanguageBadge
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    requirementsToTrain: {
      type: Object,
      required: true
    },
    languagesWarnings: {
      type: Object,
      required: true
    },
    languageAvailableToTrain: {
      type: Array,
      required: true
    },
    training: {
      type: Boolean,
      default: false
    },
    repositoryTrain: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      blockedNextStepTutorial: false,
      repositoryStatus: {}
    };
  },
  computed: {
    ...mapGetters([
      'activeTutorial',
      'getCheckRepositoryTrain',
      'getSelectedVersionRepository',
      'getSelectedVersion'
    ]),
    requirementsToTrainStatus() {
      return Object.keys(this.requirementsToTrain).length !== 0;
    },
    languagesWarningsStatus() {
      return Object.keys(this.languagesWarnings).length !== 0;
    }
  },
  methods: {
    ...mapActions(['setRepositoryTraining', 'getRepositoryStatus']),
    firstText(requirement) {
      const initalText = requirement.split('\n');
      return initalText[0];
    },
    secondText(requirement) {
      const initalText = requirement.split('\n');
      return initalText[1];
    },
    closeModal() {
      if (this.activeTutorial === 'training') {
        this.$emit('resetTutorial');
      }
      this.$emit('closeTrainModal');
    },
    dispatchTrain() {
      this.$emit('proceedTrain');
      this.$emit('closeTrainModal');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/colors.scss";
@import "~@/assets/scss/variables.scss";

::-webkit-scrollbar {
  width: 0.6rem;
}

::-webkit-scrollbar-track {
  background: #e9e9ec;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: $color-primary;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: $color-primary;
}

:not(.quick-test) {
  pointer-events: visible;
}

.train-modal {
  max-height: 33.438rem;
  width: 41.563rem;
  background-color: $color-white;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 0.5rem;
  margin: auto;
  font-family: $font-family;

  &__close {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 1rem 1rem 0 0;
    cursor: pointer;
    &__icon {
      color: $color-grey;
    }
  }

  &__container {
    padding: 1rem 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__text-ready-train {
    font-size: 20px;
    color: $color-primary;
  }

  &__text-warning {
    font-size: 28px;
  }

  &__wrapper {
    padding: 1rem;

    &__subtitle {
      margin-bottom: 1.5rem;
    }

    &__content {
      overflow: auto;
      max-height: 13.75rem;

      &__content-requirements {
        &__item {
          display: flex;
          justify-content: space-between;
          padding: 2.1rem 1rem;
          align-items: center;
          margin: 0 1rem 0.6rem 0;
          height: 4.063rem;
          border: 1.5px solid $color-danger;
          background-color: $color-fake-white;
          border-radius: 0.375rem;
          &__icon {
            color: $color-danger;
            padding-left: 1rem;
          }

          &__field {
            width: 2.9rem;
            display: flex;
            padding-right: 1rem;
            font-weight: $font-weight-bolder;
            justify-content: center;
            align-items: center;
          }

          &__text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
            max-width: 28rem;
          }
        }
      }
    }
  }

  &__buttons {
    margin: 1rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    &__style {
      box-shadow: 0px 3px 6px #00000029;
      width: 6rem;
      height: 2.688rem;
      font-weight: $font-weight-bolder;
      font-family: $font-family;
      margin: 0 1rem;
    }
  }
}
</style>
