<template>
  <b-modal
    :active="open"
    :can-cancel="false"
    :width="665">
    <div
      id="tour-training-step-7"
      :is-previous-disabled="true"
      :is-finish-disabled="true">
      <div
        class="train-modal">
        <div
          class="train-modal__close">
          <b-icon
            icon="close"
            class="train-modal__close__icon"
            @click.native="closeModal()"/>
        </div>
        <div class="train-modal__container">
          <strong
            class="train-modal__text-warning">
            {{ $t('webapp.train_modal.language_warning') }}</strong>
          <div
            v-if="requirementsToTrainStatus || languagesWarningsStatus"
            class="train-modal__wrapper">
            <p class="train-modal__wrapper__subtitle">
              {{ $t('webapp.train_modal.missing_requirements') }}
            </p>
            <div class="train-modal__wrapper__content">
              <div v-if="requirementsToTrainStatus">
                <div
                  v-for="(requirements, lang) in requirementsToTrain"
                  :key="lang"
                  class="train-modal__wrapper__content__content-requirements">
                  <div
                    v-for="(requirement, i) in requirements"
                    :key="i"
                    class="train-modal__wrapper__content__content-requirements__item">
                    <p>
                      <strong>{{ firstText(requirement) }}</strong>
                      <br>
                      <span>{{ secondText(requirement) }}</span>
                    </p>
                    <div>
                      <b-icon
                        icon="close"
                        class="train-modal__wrapper__content__content-requirements__item__icon"
                        @click.native="closeModal()"/>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="languagesWarningsStatus">
                <div class="train-modal__wrapper__content__content-requirements">
                  <div
                    v-for="(warnings, lang) in languagesWarnings"
                    :key="lang"
                    class="train-modal__wrapper__content__content-requirements__item">
                    <p
                      v-for="(warning, index) in warnings"
                      :key="index">
                      <strong>{{ firstText(warning) }}</strong>
                      <br>
                      <span>{{ secondText(warning) }}</span>
                    </p>
                    <div>
                      <b-icon
                        icon="close"
                        class="train-modal__wrapper__content__content-requirements__item__icon"
                        @click.native="closeModal()"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="train-modal__buttons">
              <b-button
                ref="closeBtn"
                type="is-primary"
                class="train-modal__buttons__style"
                @click="closeModal()">
                <span>{{ $t('webapp.train_modal.ok') }}</span>
              </b-button >
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
    LanguageBadge,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
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
      blockedNextStepTutorial: false,
      repositoryStatus: {},
    };
  },
  computed: {
    ...mapGetters([
      'activeTutorial',
      'getCheckRepositoryTrain',
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
  methods: {
    ...mapActions([
      'setRepositoryTraining',
      'getRepositoryStatus',
    ]),
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
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

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
  background: $color-primary-dark;
}

:not(.quick-test) {
  pointer-events: visible;
}
.train-modal {
  max-height: 535px;
  background-color: $color-white;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 8px;


  &__close{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 1rem 1rem 0 0;
    cursor: pointer;
    &__icon{
      color: $color-grey;
    }
  }

  &__container{
    padding: 1rem 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__text-ready-train{
    font-size: 20px;
    color: $color-primary;
  }

  &__text-warning{
    font-size: 28px;
  }

  &__wrapper {
    padding: 1rem;


    &__subtitle{
      margin-bottom: 1.5rem;
    }

    &__content{
      overflow: auto;
      max-height: 220px;

      &__content-requirements {

        &__item {
          display: flex;
          justify-content: space-between;
          padding: 2.1rem 1rem;
          align-items: center;
          margin: 0 1rem 0.6rem 0;
          height: 65px;
          border: 1.5px solid $color-danger;
          background-color: $color-fake-white;
          border-radius: 6px;
            &__icon{
              color:$color-danger;
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

    &__style{
      box-shadow: 0px 3px 6px #00000029;
      width: 96px;
      height: 43px;
      font-weight: $font-weight-bolder;
    }
  }

}
</style>
