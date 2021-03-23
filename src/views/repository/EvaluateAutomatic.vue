<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">
    <div v-if="repository">
      <div v-if="authenticated">
        <div
          v-if="repository.authorization.can_write"
          class="evaluate">
          <div class="evaluate__content-header">
            <h2 class="evaluate__content-header__title">
              {{ $t('webapp.evaluate-automatic.header_title') }}
            </h2>
            <p>{{ $t('webapp.evaluate-automatic.header_title_p') }}</p>
            <p>{{ $t('webapp.evaluate-automatic.header_title_p2') }}</p>
            <div class="evaluate__content-header__wrapper">
              <div
                class="evaluate__content-header__wrapper__language-select">
                <p class="evaluate__content-header__wrapper__language-select__text">
                  <strong>
                    {{ $t('webapp.evaluate-automatic.header_title_lang') }}
                  </strong>
                </p>
                <div
                  id="tour-evaluate-step-1"
                  :is-previous-disabled="true">
                  <b-select
                    v-model="currentLanguage"
                    expanded>
                    <option
                      v-for="language in languages"
                      :key="language.id"
                      :selected="language.value === currentLanguage"
                      :value="language.value">
                      {{ language.title }}
                    </option>
                  </b-select>
                </div>
              </div>
              <b-button
                ref="runNewTestAutomaticButton"
                :is-finish-disabled="true"
                :is-previous-disabled="true"
                :is-next-disabled="true"
                :loading="evaluating"
                :disabled="evaluating"
                type="is-secondary"
                class="evaluate__content-header__wrapper__button"
                @click="newEvaluate()">
                {{ $t('webapp.evaluate-automatic.run_test') }}
              </b-button>
            </div>
            <progress-stages v-if="evaluateProgress" :progress-value="progress"/>
          </div>
        </div>
        <div class="evaluate__container">
          <div class="evaluate__item">
            <authorization-request-notification
              v-if="repository && !repository.authorization.can_write"
              :available="!repository.available_request_authorization"
              :repository-uuid="repository.uuid"
              @onAuthorizationRequested="updateRepository(false)" />
          </div>
        </div>
      </div>
      <div
        v-else>
        <b-notification
          :closable="false"
          type="is-info">
          {{ $t('webapp.evaluate-automatic.login') }}
        </b-notification>
        <login-form hide-forgot-password />
      </div>
    </div>
  </repository-view-base>
</template>

<script>
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import AuthorizationRequestNotification from '@/components/repository/AuthorizationRequestNotification';
import { mapActions, mapState, mapGetters } from 'vuex';
import { LANGUAGES } from '@/utils';
import LoginForm from '@/components/auth/LoginForm';
import RepositoryBase from './Base';
import ProgressStages from '@/components/shared/ProgressStages';

export default {
  name: 'RepositoryEvaluateAutomatic',
  components: {
    RepositoryViewBase,
    LoginForm,
    AuthorizationRequestNotification,
    ProgressStages,
  },
  extends: RepositoryBase,
  data() {
    return {
      currentLanguage: '',
      evaluating: false,
      error: {},
      eventClick: false,
      eventClickFinish: false,
      eventReset: false,
      eventSkip: false,
      evaluateProgress: false,
      progress: 0,
    };
  },
  computed: {
    ...mapState({
      selectedRepository: state => state.Repository.selectedRepository,
    }),
    ...mapGetters({
      repositoryVersion: 'getSelectedVersion',
      activeTutorial: 'activeTutorial',
    }),
    languages() {
      if (!this.selectedRepository || !this.selectedRepository.evaluate_languages_count) return [];
      return Object.keys(this.selectedRepository.evaluate_languages_count)
        .map((lang, index) => ({
          id: index + 1,
          value: lang,
          title: `${LANGUAGES[lang]}`,
        }));
    },
    repositoryUUID() {
      if (!this.repository || this.repository.uuid === 'null') { return null; }
      return this.repository.uuid;
    },
  },
  watch: {
    selectedRepository() {
      if (this.currentLanguage === '') {
        this.currentLanguage = this.selectedRepository.language;
      }
    },
    async repositoryUUID() {
      if (!this.repositoryUUID) { return; }
      this.checkEvaluateProgress();
    },
  },
  methods: {
    ...mapActions([
      'runNewEvaluateAutomatic',
      'getAutoEvaluateProgress',
    ]),
    dispatchClick() {
      this.eventClick = !this.eventClick;
    },
    dispatchFinish() {
      this.eventClickFinish = !this.eventClickFinish;
    },
    dispatchReset() {
      this.eventReset = !this.eventReset;
    },
    dispatchSkip() {
      this.eventSkip = !this.eventSkip;
    },
    onAuthorizationRequested() {
      this.requestAuthorizationModalOpen = false;
      this.$buefy.toast.open({
        message: this.$t('webapp.layout.authorization_success'),
        type: 'success',
      });
      this.updateRepository(false);
    },
    async checkEvaluateProgress(inProgress = false) {
      const { data } = await this.getAutoEvaluateProgress({
        repositoryUUID: this.repository.uuid,
        repositoryVersion: this.repositoryVersion,
      });

      const [evaluateStatus] = data.results;

      if (!evaluateStatus) {
        this.evaluating = false;
        return;
      }

      if (evaluateStatus.status === 2) {
        this.evaluating = false;
        this.evaluateProgress = false;
        return
      }

      if (evaluateStatus.status !== 2
        || evaluateStatus.status !== 3){
        this.evaluating = true;
        this.evaluateProgress = true;
        this.progress = evaluateStatus.status

        setTimeout(() => {
          this.checkEvaluateProgress(true);
        }, 100000);
      }
    },
    async newEvaluate() {
      this.evaluating = true;
      try {
        await this.runNewEvaluateAutomatic({
          repositoryUUID: this.repository.uuid,
          language: this.currentLanguage,
          version: this.repositoryVersion,
        });
        await this.checkEvaluateProgress()
      } catch (error) {
        this.dispatchReset();
        this.error = error.response.data;
        this.evaluating = false;
        this.$buefy.toast.open({
          message: `${this.error.detail || this.$t('webapp.evaluate-automatic.default_error')} `,
          type: 'is-danger',
          duration: 5000,
        });
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';


.evaluate {

  &__divider {
    height: 1px;
    background-color: #d5d5d5;
    margin: 2.5rem 0 0 0;
  }

  &__navigation {
    display: flex;
    justify-content: center;
    margin-top: 2.5rem;
    overflow: hidden;
    border-bottom: 1px solid $color-grey;

    &__requestAuthorization{
       color: $color-fake-black;
      font-weight: $font-weight-medium;
      text-align: center;
      float: right
    }
    a {
      position: relative;
      display: inline-flex;
      padding: 0 1.5rem 1rem;
      color: $color-grey-dark;
      font-weight: $font-weight-medium;
      text-align: center;

      &:hover,
      &.active {
        color: $color-fake-black;

        &::before {
          $size: 10rem;

          position: absolute;
          content: "";
          width: $size;
          height: $size;
          left: 50%;
          bottom: -($size - .75rem);
          transform: translateX(-50%);
          background-color: $color-primary;
          border-radius: 50%;
          animation: nav-bubble-animation .25s ease;

          @keyframes nav-bubble-animation {
            from {
              bottom: -($size);
            }
            to {
              bottom: -($size - .75rem);
            }
          }
        }
      }
    }
  }

  &__content-header {
    text-align: left;

    &__buttons {
      margin: 2rem 1rem;
    }

    &__title {
      margin-top: 2rem;
      font-size: 1.75rem;
      font-weight: $font-weight-medium;
      color: $color-fake-black;
      margin-bottom: $between-title-subtitle;
    }

    &__wrapper {
      display: flex;
      align-items: flex-end;
      margin-top: 1rem;

      &__language-select {
        flex: 1;
        margin-right: .5rem;
        text-align: left;

        &__text{
          margin-bottom: 1rem;
        }
      }
    }
  }

  &__content-wrapper {
    max-width: 100%;
    margin: 0 auto;
  }
}
</style>
