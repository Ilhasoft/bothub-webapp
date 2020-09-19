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
              {{ $t('webapp.evaluate.header_title') }}
            </h2>
            <p>{{ $t('webapp.evaluate.header_title_p') }}</p>
            <p>{{ $t('webapp.evaluate.header_title_p2') }}</p>
            <div class="evaluate__content-header__wrapper">
              <div
                class="evaluate__content-header__wrapper__language-select">
                <p>
                  <strong>
                    {{ $t('webapp.evaluate.header_title_lang') }}
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
                id="tour-evaluate-step-5"
                ref="runNewTestButton"
                :is-finish-disabled="true"
                :is-previous-disabled="true"
                :is-next-disabled="true"
                :loading="evaluating"
                :disabled="evaluating"
                type="is-secondary"
                class="evaluate__content-header__wrapper__btn"
                @click="newEvaluate()">
                {{ $t('webapp.evaluate.run_test') }}
              </b-button>
            </div>
          </div>
          <div class="evaluate__divider" />
          <div class="evaluate__content-wrapper">
            <base-evaluate-examples
              :filter-by-language="currentLanguage"
              @created="updateTrainingStatus()"
              @deleted="updateTrainingStatus()"
              @eventStep="dispatchClick()"
              @eventError="dispatchSkip()"/>
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
          {{ $t('webapp.evaluate.login') }}
        </b-notification>
        <login-form hide-forgot-password />
      </div>
    </div>
    <tour
      v-if="activeTutorial === 'evaluate'"
      :step-count="7"
      :next-event="eventClick"
      :finish-event="eventClickFinish"
      :reset-tutorial="eventReset"
      :skip-event="eventSkip"
      name="evaluate"/>
  </repository-view-base>
</template>

<script>
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import BaseEvaluateExamples from '@/components/repository/repository-evaluate/BaseEvaluateExamples';
import AuthorizationRequestNotification from '@/components/repository/AuthorizationRequestNotification';
import { mapActions, mapState, mapGetters } from 'vuex';
import { LANGUAGES } from '@/utils';
import Tour from '@/components/Tour';
import LoginForm from '@/components/auth/LoginForm';
import RepositoryBase from './Base';

export default {
  name: 'RepositoryEvaluate',
  components: {
    RepositoryViewBase,
    LoginForm,
    BaseEvaluateExamples,
    AuthorizationRequestNotification,
    Tour,
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
    };
  },
  computed: {
    ...mapState({
      resultId: state => state.Repository.evaluateResultId,
      selectedRepository: state => state.Repository.selectedRepository,
    }),
    ...mapGetters({
      getEvaluateLanguage: 'getEvaluateLanguage',
      repositoryVersion: 'getSelectedVersion',
      activeTutorial: 'activeTutorial',
    }),
    languages() {
      if (!this.selectedRepository || !this.selectedRepository.evaluate_languages_count) return [];
      return Object.keys(this.selectedRepository.evaluate_languages_count)
        .map((lang, index) => ({
          id: index + 1,
          value: lang,
          title: `${LANGUAGES[lang]} (${this.selectedRepository.evaluate_languages_count[lang]} ${this.$t('webapp.evaluate.get_examples_test_sentences')})`,
        }));
    },
  },
  watch: {
    currentLanguage(language) {
      this.setEvaluateLanguage(language);
    },
    selectedRepository() {
      if (this.currentLanguage === '') {
        this.currentLanguage = this.selectedRepository.language;
      }
    },
  },
  methods: {
    ...mapActions([
      'setEvaluateLanguage',
      'runNewEvaluate',
      'getTrainingStatus',
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
    async updateTrainingStatus() {
      const trainStatus = await this.getTrainingStatus({
        repositoryUUID: this.repository.uuid,
        version: this.repositoryVersion,
      });
      if (trainStatus) {
        Object.assign(this.repository, trainStatus);
      }
    },
    async newEvaluate() {
      this.evaluating = true;
      try {
        const result = await this.runNewEvaluate({
          repositoryUUID: this.repository.uuid,
          language: this.getEvaluateLanguage,
          version: this.repositoryVersion,
        });
        this.evaluating = false;
        this.$router.push({
          name: 'repository-result',
          params: {
            ownerNickname: this.repository.owner.nickname,
            slug: this.repository.slug,
            resultId: result.data.evaluate_id,
            version: result.data.evaluate_version,
          },
        });
        return true;
      } catch (error) {
        this.dispatchReset();
        this.error = error.response.data;
        this.evaluating = false;
        this.$buefy.toast.open({
          message: `${this.error.detail || this.$t('webapp.evaluate.default_error')} `,
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
    }

    &__wrapper {
      display: flex;
      align-items: flex-end;
      margin-top: 1rem;

      &__language-select {
        flex: 1;
        margin-right: .5rem;
        text-align: left;
      }
    }
  }

  &__content-wrapper {
    max-width: 100%;
    margin: 0 auto;
  }
}
</style>
