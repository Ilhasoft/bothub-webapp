<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">
    <div v-if="repository">
      <div v-if="authenticated">
        <div
          v-if="repository.authorization.can_write"
          class="test">
          <div class="test__content-header">
            <h2 class="test__content-header__title">Test your data set</h2>
            <div class="test__content-header__language-select">
              <side-bar/>
              <languages-list
                v-model="currentLanguage"
                title="Select your language"
                full-size
                open-position="bottom-left" />
            </div>
            <div>
              <bh-button
                ref="addSentenceButton"
                class="test__content-header__buttons"
                primary
                @click="addTestSentence()">Add test sentence</bh-button>
              <bh-button
                v-if="!showResults"
                class="test__content-header__buttons"
                primary
                @click="showResults=!showResults">Check test results</bh-button>
              <bh-button
                v-else
                class="test__content-header__buttons"
                primary
                @click="showResults=!showResults">Back to sentences</bh-button>
            </div>
          </div>
          <hr>
          <div class="test__content-wrapper">
            <base-examples-test
              v-if="!showResults"
              :repository="repository"
              :filter-by-language="currentLanguage"/>
            <base-test-results
              v-else
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
              You can not edit this repository
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="bh-grid">
        <div class="bh-grid__item">
          <div class="bh-notification bh-notification--info">
            Sign in to your account to edit this repository.
          </div>
          <login-form hide-forgot-password />
        </div>
      </div>
    </div>
    <new-example-test-modal
      :repository="repository"
      :open.sync="addTestSentenceModalOpen"
      @created="onExampleTestCreated()" />
  </repository-view-base>
</template>

<script>
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import BaseExamplesTest from '@/components/repository/repository-test/BaseExamplesTest';
import BaseTestResults from '@/components/repository/repository-test/BaseTestResults';
import NewExampleTestModal from '@/components/repository/repository-test/example/NewExampleTestModal';
import RepositoryBase from './Base';
import LanguagesList from '@/components/shared/LanguagesList';
import SideBar from '@/components/shared/SideBar';

import LoginForm from '@/components/auth/LoginForm';


export default {
  name: 'RepositoryTest',
  components: {
    RepositoryViewBase,
    LoginForm,
    BaseExamplesTest,
    NewExampleTestModal,
    LanguagesList,
    BaseTestResults,
    SideBar,
  },
  extends: RepositoryBase,
  data() {
    return {
      addTestSentenceModalOpen: false,
      currentLanguage: '',
      showResults: false,
    };
  },
  methods: {
    addTestSentence() {
      this.addTestSentenceModalOpen = true;
      this.showResults = false;
    },
    onExampleTestCreated() {
      this.updateRepository(true);
    },
  },
};
</script>

<style lang="scss" scoped>
.test {
  &__content-header {
    text-align: center;
    margin: 0 auto;
    width: 40%;

    &__buttons {
      margin: 2rem 1rem;
    }

    &__title {
      margin-top: 2rem;
    }
  }

  &__content-wrapper {
    max-width: 100%;
    margin: 0 auto;
  }
}
</style>
