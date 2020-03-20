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
              {{ $t('webapp.evaluate.detailed_results') }}
            </h2>
            <div class="evaluate__content-header__wrapper">
              <div class="evaluate__content-header__wrapper__language-select">
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
          </div>
          <div class="evaluate__divider" />
          <div class="evaluate__content-wrapper">
            <base-evaluate-results
              :result-id="resultId"
              :repository="repository"
              :filter-by-language="currentLanguage" />
          </div>
        </div>
        <div
          v-else
          class="
                bh-grid">
          <div class="bh-grid__item">
            <div class="bh-notification bh-notification--warning">
              {{ $t('webapp.evaluate.you_can_not_edit') }}
              <request-authorization-modal
                v-if="repository"
                :open.sync="requestAuthorizationModalOpen"
                :repository-uuid="repository.uuid"
                @requestDispatched="onAuthorizationRequested()" />
              <a
                class="evaluate__navigation__requestAuthorization"
                @click="openRequestAuthorizationModal">
                {{ $t('webapp.layout.request_authorization') }}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="bh-grid">
        <div class="bh-grid__item">
          <div class="bh-notification bh-notification--info">
            {{ $t('webapp.evaluate.login') }}
          </div>
          <login-form hide-forgot-password />
        </div>
      </div>
    </div>
  </repository-view-base>
</template>

<script>
import RequestAuthorizationModal from '@/components/repository/RequestAuthorizationModal';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import BaseEvaluateResults from '@/components/repository/repository-evaluate/BaseEvaluateResults';
import { mapActions, mapState, mapGetters } from 'vuex';
import { LANGUAGES } from '@/utils';

import LoginForm from '@/components/auth/LoginForm';
import RepositoryBase from './Base';


export default {
  name: 'RepositoryResult',
  components: {
    RepositoryViewBase,
    LoginForm,
    BaseEvaluateResults,
    RequestAuthorizationModal,
  },
  extends: RepositoryBase,
  data() {
    return {
      currentLanguage: '',
      languages: [],
      evaluating: false,
      error: {},
      requestAuthorizationModalOpen: false,
    };
  },
  computed: {
    ...mapState({
      selectedRepository: state => state.Repository.selectedRepository,
      repositoryVersion: state => state.Repository.repositoryVersion,
    }),
    ...mapGetters([
      'getEvaluateLanguage',
    ]),
    resultId() {
      return parseInt(this.$route.params.resultId, 10);
    },
    version() {
      return parseInt(this.$route.params.version, 10);
    },
  },
  watch: {
    currentLanguage(language) {
      this.setEvaluateLanguage(language);
    },
    selectedRepository() {
      this.getExamples();
      if (this.currentLanguage === '') {
        this.currentLanguage = this.selectedRepository.language;
      }
    },
  },
  methods: {
    ...mapActions([
      'setEvaluateLanguage',
      'getEvaluateExample',
    ]),
    getExamples() {
      this.getEvaluateExample({
        id: this.selectedRepository.uuid,
      }).then(() => {
        this.languages = Object.keys(this.selectedRepository.evaluate_languages_count)
          .map((lang, index) => ({
            id: index + 1,
            value: lang,
            title: `${LANGUAGES[lang]} (${this.selectedRepository.evaluate_languages_count[lang]} test sentences)`,
          }));
      });
    },
    openRequestAuthorizationModal() {
      this.requestAuthorizationModalOpen = true;
    },
    onAuthorizationRequested() {
      this.requestAuthorizationModalOpen = false;
      this.$bhToastNotification({
        message: 'Request made! Wait for review of an admin.',
        type: 'success',
      });
      this.updateRepository(false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/colors.scss';
@import '~bh/src/assets/scss/variables.scss';


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
