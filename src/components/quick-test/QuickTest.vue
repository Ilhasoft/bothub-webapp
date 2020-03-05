<template>
  <div
    v-if="repository"
    class="quick-test">
    <div
      class="quick-test__collapse-button"
      @click="toggle()">
      <b-icon :icon="expanded ? 'chevron-right' : 'chevron-left'" />
      <p class="quick-test__collapse-button__text"> QUICK TEST </p>
    </div>
    <div
      :class="['quick-test__container', expanded ? 'expanded' : 'collapsed']">
      <div class="quick-test__inner-container">
        <div class="quick-test__text-area">
          <div
            v-for="sentence in sentences"
            :key="sentence.id"
            class="quick-test__message">
            <p class="quick-test__message__text">{{ sentence.text }}</p>
            <div
              v-if="hasError(sentence)"
              class="quick-test__message__subtext__container">
              <p class="quick-test__message__subtext">
                An error ocurred, we couldn't analyze your text </p>
            </div>
            <loading v-else-if="isLoading(sentence)" />
            <div
              v-else
              class="quick-test__message__subtext__container">
              <p class="quick-test__message__subtext">
                <span class="quick-test__message__subtext__dot"/>
                <span> <strong>Intent: </strong>
                  {{ sentence.intent.name }} ({{ sentence.intent.confidence | percent }}) </span>
              </p>
              <div class="field is-grouped is-grouped-centered">
                <b-button
                  class="quick-test__message__button"
                  icon-left="chart-pie"
                  @click="debug(sentence)"> Debug </b-button>
                <b-button
                  class="quick-test__message__button"
                  icon-left="file-document-outline"
                  @click="showRawInfo(sentence)"> Raw
                </b-button>
              </div>
            </div>
          </div>
        </div>
        <div class="quick-test__input field has-addons">
          <div class="control">
            <input
              v-model="sentenceInput"
              class="input"
              placeholder="Add a text"
              @keyup.enter="sendMessage" >
          </div>
          <div class="control">
            <b-dropdown
              position="is-top-left"
              aria-role="list">
              <button
                slot="trigger"
                class="button is-text">
                <language-badge
                  v-if="selectedLanguage"
                  :language="selectedLanguage"/>
                <span
                  v-else
                  class="quick-test__input__placeholder"> Select language </span>
                <b-icon icon="menu-down"/>
              </button>
              <b-dropdown-item
                v-for="language in languages"
                :key="language"
                aria-role="listitem"
                @click="setLanguage(language)">
                <language-badge :language="language"/>
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LanguageBadge from '@/components/shared/LanguageBadge';
import RepositoryDebug from '@/components/repository/debug/Debug';
import Loading from '@/components/shared/Loading';
import RawInfo from '@/components/shared/RawInfo';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'QuickTest',
  components: {
    LanguageBadge,
    RepositoryDebug,
    Loading,
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
    };
  },
  computed: {
    ...mapState({
      repositoryVersion: state => state.Repository.repositoryVersion,
    }),
    languages() {
      return Object.keys(this.repository.languages_ready_for_train);
    },
  },
  methods: {
    ...mapActions([
      'analyzeText',
    ]),
    isLoading(sentence) {
      return sentence.intent === null;
    },
    hasError(sentence) {
      return !(sentence.error === null || sentence.error === undefined);
    },
    async sendMessage() {
      if (this.sentenceInput === '' || !this.selectedLanguage) return;
      const id = Date.now();
      this.sentences.push({
        id,
        text: this.sentenceInput,
        intent: null,
        error: null,
      });
      const text = this.sentenceInput;
      this.sentenceInput = '';

      try {
        const response = await this.analyzeText({
          repositoryUUID: this.repository.uuid,
          repositoryVersion: this.repositoryVersion,
          language: this.selectedLanguage,
          text,
        });
        const index = this.sentences.findIndex(entry => entry.id === id);
        this.$set(this.sentences, index, { id, ...response.data });
      } catch (e) {
        const index = this.sentences.findIndex(entry => entry.id === id);
        this.sentences[index].error = e;
      }
    },
    toggle() {
      this.expanded = !this.expanded;
    },
    setLanguage(language) {
      this.selectedLanguage = language;
    },
    showRawInfo(sentence) {
      const { id, ...info } = sentence;
      this.$buefy.modal.open({
        props: { info },
        parent: this,
        component: RawInfo,
        hasModalCard: false,
        trapFocus: true,
      });
    },
    debug(sentence) {
      this.$buefy.modal.open({
        parent: this,
        component: RepositoryDebug,
        props: {
          repositoryUUID: this.repository.uuid,
          version: sentence.repository_version,
          language: sentence.language,
          text: sentence.text,
        },
        hasModalCard: false,
        trapFocus: true,
      });
    },
  },
};
</script>

<style lang="scss" scoped>

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

        &__message {

          margin: 0 0 1.5rem 0;

          &__text {
            margin: 0 1.175rem 0 0;
            color: #707070;
            text-align: left;
            font-weight: bold;
            font-size: 18px;
          }

          &__button {
            margin: 0 1rem 0 0;
            color: #707070;
          }

          &__subtext {
            display: flex;
            vertical-align: middle;
            font-size: 0.75rem;
            color: #707070;
            margin: 0.6rem 0.6rem 0.6rem 1.75rem;

            &__dot {
              margin-right: 0.5rem;
              height: 1rem;
              width: 1rem;
              background-color: #2BBFAC;
              border-radius: 50%;
              display: inline-block;
            }
          }
        }

        &__collapse-button {
          cursor: pointer;
          background-color: #2BBFAC;
          border-radius: 30% 0 0 30%;
          height: 3rem;
          width: 5rem;
          padding: 0.75rem;
          font-weight: bold;
          font-size: 0.6rem;
          color: white;
          text-align: center;
          display: flex;
          margin-top: 3rem;

          &__text {
            margin: 0 auto;;
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
            overflow-y: scroll;
            height: 90%;
        }
    }
</style>