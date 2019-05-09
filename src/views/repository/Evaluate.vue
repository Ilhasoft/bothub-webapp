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
            <h2 class="evaluate__content-header__title">Test your data set</h2>
            <div class="evaluate__content-header__language-select">
              <languages-list
                v-model="currentLanguage"
                title="Select your language"
                full-size
                open-position="bottom-left" />
            </div>
          </div>
          <div class="evaluate__navigation">
            <a
              v-for="(name, i) in links"
              :key="i"
              :class="{'active': i === getCurrentTab}"
              @click="setCurrentTab(i)">{{ name }}</a>
          </div>
          <div class="evaluate__content-wrapper">
            <base-evaluate-examples
              v-if="getCurrentTab === 0"
              :repository="repository"
              :filter-by-language="currentLanguage"
              @created="updateRepository(true)"/>
            <base-evaluate-versions
              v-else-if="getCurrentTab === 1"
              :repository="repository" />
            <base-evaluate-results
              v-else
              :result-id="currentResultId"
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
  </repository-view-base>
</template>

<script>
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import BaseEvaluateExamples from '@/components/repository/repository-evaluate/BaseEvaluateExamples';
import BaseEvaluateResults from '@/components/repository/repository-evaluate/BaseEvaluateResults';
import BaseEvaluateVersions from '@/components/repository/repository-evaluate/BaseEvaluateVersions';
import RepositoryBase from './Base';
import LanguagesList from '@/components/shared/LanguagesList';
import { mapGetters, mapActions } from 'vuex';

import LoginForm from '@/components/auth/LoginForm';


export default {
  name: 'RepositoryEvaluate',
  components: {
    RepositoryViewBase,
    LoginForm,
    BaseEvaluateExamples,
    LanguagesList,
    BaseEvaluateResults,
    BaseEvaluateVersions,
  },
  extends: RepositoryBase,
  data() {
    return {
      currentLanguage: '',
      showRunEvaluate: false,
      links: ['Sentences', 'Versions', 'Results'],
      currentResultId: null,
    };
  },
  computed: {
    ...mapGetters([
      'getEvaluateResultId',
      'getCurrentTab',
    ]),
  },
  watch: {
    getEvaluateResultId(id) {
      this.currentResultId = id;
    },
    currentLanguage(language) {
      this.setEvaluateLanguage(language);
    },
  },
  methods: {
    ...mapActions([
      'setEvaluateLanguage',
      'updateCurrentTab',
    ]),
    addEvaluateSentence() {
      this.addEvaluateSentenceModalOpen = true;
      this.showRunEvaluate = false;
    },
    setCurrentTab(value) {
      this.updateCurrentTab(value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/colors.scss';
@import '~bh/src/assets/scss/variables.scss';


.evaluate {
  &__navigation {
    display: flex;
    justify-content: center;
    overflow: hidden;
    border-bottom: 1px solid $color-grey;
    margin-top: 5rem;

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
