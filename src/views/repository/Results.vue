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
        <authorization-request-notification
          v-else-if="repository"
          :available="!repository.available_request_authorization"
          :repository-uuid="repository.uuid"
          @onAuthorizationRequested="updateRepository(false)" />
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
import AuthorizationRequestNotification from '@/components/repository/AuthorizationRequestNotification';
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
    AuthorizationRequestNotification,
  },
  extends: RepositoryBase,
  data() {
    return {
      currentLanguage: '',
      evaluating: false,
      error: {},
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
    text-decoration: none !important;

     &:hover{
      color: $color-grey-darker !important;
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
