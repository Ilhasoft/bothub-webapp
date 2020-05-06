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
            <h2 class="evaluate__content-header__title">{{ $t('webapp.evaluate.results') }}</h2>
          </div>
          <div class="evaluate__divider" />
          <div class="evaluate__content-wrapper">
            <base-evaluate-versions
              :repository="repository" />
          </div>
        </div>
        <div
          v-else>
          <b-notification
            :closable="false"
            type="is-warning"
            role="alert">
            <div
              class="evaluate__notification">
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
          </b-notification>
        </div>
      </div>
      <div
        v-else>
        <b-notification
          :closable="false"
          class="is-info"
          role="alert">
          {{ $t('webapp.evaluate.login') }}
        </b-notification>
        <login-form hide-forgot-password />
      </div>
    </div>
  </repository-view-base>
</template>

<script>
import RequestAuthorizationModal from '@/components/repository/RequestAuthorizationModal';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import BaseEvaluateVersions from '@/components/repository/repository-evaluate/BaseEvaluateVersions';
import { mapActions, mapState, mapGetters } from 'vuex';

import LoginForm from '@/components/auth/LoginForm';
import RepositoryBase from './Base';


export default {
  name: 'RepositoryResults',
  components: {
    RepositoryViewBase,
    LoginForm,
    BaseEvaluateVersions,
    RequestAuthorizationModal,
  },
  extends: RepositoryBase,
  data() {
    return {
      currentLanguage: '',
      evaluating: false,
      error: {},
      requestAuthorizationModalOpen: false,
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
    }),
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
    ]),
    openRequestAuthorizationModal() {
      this.requestAuthorizationModalOpen = true;
    },
    onAuthorizationRequested() {
      this.requestAuthorizationModalOpen = false;
      this.$buefy.toast.open({
        message: this.$t('webapp.layout.authorization_success'),
        type: 'success',
      });
      this.updateRepository(false);
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
        float: right;
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
    &__notification{
    @media screen and (max-width: 50em) {
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
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
