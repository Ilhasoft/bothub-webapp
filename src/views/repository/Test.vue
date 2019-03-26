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
                class="test__content-header__buttons"
                primary>Run your test</bh-button>
            </div>
          </div>
          <hr>
          <sentences-test
            :repository="repository"
            :filter-by-language="currentLanguage"/>
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
    <new-sentence-test-modal
      :repository="repository"
      :open.sync="addTestSentenceModalOpen"
      @created="onExampleTestCreated()"/>
  </repository-view-base>
</template>

<script>
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import SentencesTest from '@/components/repository/test-sentences/SentencesTest';
import NewSentenceTestModal from '@/components/repository/test-sentences/sentences/NewSentenceTestModal';
import RepositoryBase from './Base';
import LanguagesList from '@/components/shared/LanguagesList';

import LoginForm from '@/components/auth/LoginForm';


export default {
  name: 'RepositoryTest',
  components: {
    RepositoryViewBase,
    LoginForm,
    SentencesTest,
    NewSentenceTestModal,
    LanguagesList,
  },
  extends: RepositoryBase,
  data() {
    return {
      addTestSentenceModalOpen: false,
      currentLanguage: '',
    };
  },
  methods: {
    addTestSentence() {
      this.addTestSentenceModalOpen = true;
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
  }
}
</style>
