<template>
  <div
    class="quick-test">
    <div
      ref="expandQuickTest"
      class="quick-test__collapse-button"
      @click="toggle()">
      <div
        id="tour-quick_test-step-0"
        :is-next-disabled="true"
        :is-step-blocked="!blockedNextStepTutorial"
        class="quick-test__collapse-button__content">
        <b-icon
          :icon="expanded ? 'chevron-right' : 'chevron-left'"/>
        <p class="quick-test__collapse-button__text">
          {{ $t('webapp.quick_test.quick_test') }}
        </p>
      </div>

    </div>
    <div
      :class="['quick-test__container', expanded ? 'expanded' : 'collapsed']">
      <div class="quick-test__inner-container">
        <div
          v-if="!authenticated"
          class="quick-test__login">
          {{ $t('webapp.quick_test.login_text') }}
          <b-field
            grouped
            class="quick-test__login__buttons">
            <b-button
              type="is-primary"
              @click="signIn()">
              {{ $t('webapp.register_form.signin') }}
            </b-button>
            <b-button
              type="is-primary"
              outlined
              @click="signUp()">
              {{ $t('webapp.landing_page.signup') }}
            </b-button>
          </b-field>
        </div>
        <div
          v-if="authenticated"
          id="tour-quick_test-step-2"
          :is-previous-disabled="true"
          class="quick-test__text-area">
          <quick-test-text
            v-for="sentence in sentences"
            :key="sentence.id"
            :text="sentence.text"
            :language="sentence.language"
            :version="sentence.version"
            :repository-uuid="sentence.repositoryUUID"
            :all-entities="repository.entities" />
        </div>
        <div
          v-if="authenticated"
          id="tour-quick_test-step-1"
          :is-previous-disabled="true"
          :is-next-disabled="true"
          :is-step-blocked="sentences.length === 0"
          class="quick-test__input">
          <text-area-input
            ref="textInput"
            :placeholder="$t('webapp.quick_test.add_a_sentence')"
            v-model="sentenceInput"
            :update-value="selectedLanguage"
            size="small"

            @submit="sendMessage"
          >
            <language-append-select-input
              slot="append"
              v-model="selectedLanguage"
              :languages="languages"
              dropdown-direction="is-top-left"
              class="language-append"
            />
          </text-area-input>
        </div>
      </div>
    </div>
    <tour
      v-if="activeTutorial === 'quick_test'
      && this.$router.currentRoute.name === 'repository-summary'"
      :step-count="3"
      :next-event="eventClick"
      :finish-event="eventClickFinish"
      name="quick_test" />
  </div>
</template>

<script>
import LanguageBadge from '@/components/shared/LanguageBadge';
import { mapGetters } from 'vuex';
import TextAreaInput from '@/components/inputs/TextAreaInput';
import LanguageAppendSelectInput from '@/components/inputs/LanguageAppendSelectInput';
import QuickTestText from '@/components/quick-test/QuickTestText';
import Tour from '@/components/Tour';

export default {
  name: 'QuickTest',
  components: {
    LanguageBadge,
    TextAreaInput,
    LanguageAppendSelectInput,
    QuickTestText,
    Tour,
  },
  props: {
    repository: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      sentenceInput: '',
      sentences: [],
      selectedLanguage: null,
      expanded: false,
      eventClick: false,
      eventClickFinish: false,
      blockedNextStepTutorial: false,
    };
  },
  computed: {
    ...mapGetters({
      repositoryVersion: 'getSelectedVersion',
      authenticated: 'authenticated',
      activeTutorial: 'activeTutorial',
    }),
    languages() {
      if (!this.repository) return [];
      return this.repository.available_languages;
    },
    defaultLanguage() {
      if (!this.repository) return null;
      return this.repository.language;
    },
    repositoryUUID() {
      if (!this.repository) return null;
      return this.repository.uuid;
    },
  },
  watch: {
    defaultLanguage() {
      this.updateRepositoryLanguage();
    },
  },
  mounted() {
    this.updateRepositoryLanguage();
  },
  methods: {
    signIn() {
      this.$router.push({
        name: 'signIn',
      });
    },
    signUp() {
      this.$router.push({
        name: 'signUp',
      });
    },
    dispatchClick() {
      this.eventClick = !this.eventClick;
    },
    dispatchFinish() {
      this.eventClickFinish = !this.eventClickFinish;
    },
    updateRepositoryLanguage() {
      this.selectedLanguage = this.defaultLanguage;
    },
    sendMessage() {
      const sentenceInput = this.sentenceInput.trim();
      if (sentenceInput === '' || !this.selectedLanguage) {
        this.sentenceInput = sentenceInput;
        return;
      }
      const id = Date.now();

      this.sentences.push({
        id,
        text: sentenceInput,
        language: this.selectedLanguage,
        version: this.repositoryVersion,
        repositoryUUID: this.repositoryUUID,
      });
      this.sentenceInput = '';

      if (this.activeTutorial === 'quick_test') {
        this.dispatchClick();
      }
    },
    toggle() {
      this.$emit('expanded');
      this.dispatchClick();
      this.expanded = !this.expanded;
      this.blockedNextStepTutorial = !this.blockedNextStepTutorial;
    },
    setLanguage(language) {
      this.selectedLanguage = language;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
::-webkit-scrollbar {
  width: 0.6rem;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(219, 217, 217, 0.9);
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

  .is-text {
    text-decoration: none;
  }

  .expanded {
    transition: margin-right .3s ease-out;
    margin: 0 1rem 0 0;
  }

  .collapsed {
    transition: margin-right .3s ease-out;
    margin: 0 -16rem 0 0;
  }

    .quick-test {
        display: flex;
        justify-content: flex-end;
        position: fixed;
        bottom: 10%;
        right: 0;
        z-index: 9;
        pointer-events: none;

        &__collapse-button {
          cursor: pointer;
          background-color: #2BBFAC;
          border-radius: 1rem 0 0 1rem;
          height: 3rem;
          width: 5rem;
          padding: 0.75rem;
          font-weight: bold;
          font-size: 0.6rem;
          color: white;
          text-align: center;
          display: flex;
          margin-top: 3rem;
          box-shadow: 0 0 3px 0 rgba(0,0,0,.2);


          &__content{
            display:flex;
          }
          &__text {
            margin: 0 auto;;
          }
        }

        &__login {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          margin: 50% 15%;
          flex-direction: column;

          &__buttons {

            margin: 1rem 0;

            > * {
              margin: 0 0.5rem 0 0;
            }

            :last-child {
              margin: 0;
            }
          }
        }

        &__input {
          margin: 0.5rem;

          &__placeholder {
            font-size: 0.7rem;
          }
        }

        &__container {
          height: 75vh;
          min-height: 400px;
          display: flex;
          align-items: stretch;
          min-width: 16rem;
          max-width: 16rem;
          border: 7px solid #2F343D;
          border-radius: 10px;
          box-shadow: 0 0 10px 0 rgba(0,0,0,.2);
          background-color: #2F343D;
        }
        &__inner-container {
          width: 100%;
          height: 100%;
          border-radius: 10px;
          word-wrap: break-word;
          background-color: white;
          display: flex;
          flex-direction: column;
        }

        &__text-area {
            margin: 1.25rem 0.6rem 0.6rem 1.125rem;
            overflow-y: auto;
            height: 90%;
        }
    }
</style>
