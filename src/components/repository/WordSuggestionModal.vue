<template>
  <section
    class="modal-style">
    <div
      class="modal-style__container">
      <div class="modal-style__container__close">
        <b-icon
          icon="close"
          @click.native="closeModal()"/>
      </div>
      <h3>{{ $t('webapp.word_suggestion.title') }}</h3>
      <p>{{ $t('webapp.word_suggestion.subtitle') }}</p>
      <loading
        v-if="loading"/>
      <div
        v-else
        class="modal-style__container__body">
        <div class="modal-style__container__body__content">
          <div class="modal-style__container__body__content__selects">
            <b-field>
              <div
                v-for="(text, index) in allWords"
                :key="index">
                <b-select
                  v-model="selectWord[index]"
                  :placeholder="wordsTogether[index]"
                  class="select-input">
                  <option
                    v-for="(word, index) in text"
                    :value="word"
                    :key="index">
                    {{ word }}
                  </option>
                </b-select>
              </div>
            </b-field>
          </div>
          <div class="modal-style__container__body__content__icon">
            <b-icon
              icon="check-bold"
              size="is-medium"
              class="icon-style"
              @click.native="addSentence(selectWord)" />
            <b-icon
              class="icon-style"
              size="is-medium"
              icon="close-thick"
              @click.native="clearSelects()" />
          </div>
        </div>
        <b-message
          :active="message.show"
          :type="`is-${message.type}`"
          :duration="3000"
          auto-close>
          {{ message.text }}
        </b-message>

        <edit-suggestion
          :per-page="2"
          :key="updateSuggestion"
          :phrases-variation="phraseList"
          @dispatchDelete="deleteSentence($event)"
          @dispatchSave="modifySentence($event)"/>

        <footer class="modal-style__container__footer">
          <button
            class="button is-primary"
            type="button"
            @click="closeModal">{{ $t('webapp.word_suggestion.cancel') }}</button>
          <button
            :disabled="phraseList.total === 0"
            class="button is-secondary"
            @click="addToTraining"> {{ $t('webapp.word_suggestion.add_training') }}</button>
        </footer>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import EditSuggestion from '@/components/repository/EditSuggestion';
import Loading from '@/components/shared/Loading';

export default {
  name: 'WordSuggestionModal',
  components: {
    EditSuggestion,
    Loading,
  },
  props: {
    detail: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      wordsTogether: '',
      phraseList: {
        items: [],
        total: 0,
      },
      allWords: [],
      selectWord: [],
      updateSuggestion: false,
      loading: false,
      error: null,
      message: {
        type: '',
        show: false,
        text: '',
      },
    };
  },
  computed: {
    ...mapGetters({
      repositoryVersion: 'getSelectedVersion',
      repositoryUUID: 'getCurrentRepository',
    }),
  },
  mounted() {
    this.getWordSuggestion();
    this.manipulateText();
  },
  methods: {
    ...mapActions([
      'getExampleSuggestion',
      'newExample',
      'setUpdateRepository',
    ]),
    manipulateText() {
      this.wordsTogether = this.detail.text.split(' ');
      this.wordsTogether.map(word => this.selectWord.push(word));
    },
    deleteSentence(sentence) {
      this.phraseList.items = this.phraseList.items.filter(oldSentence => (
        sentence.text !== oldSentence.text
      ));
      this.phraseList.total = this.phraseList.items.length;
      this.updateSuggestion = !this.updateSuggestion;
    },
    modifySentence(sentence) {
      this.phraseList.items[sentence.id].text = sentence.text;
    },
    clearSelects() {
      this.selectWord = [];
    },
    async getWordSuggestion() {
      this.loading = true;
      try {
        const { data } = await this.getExampleSuggestion({ id: this.detail.id });
        const suggestions = Object.entries(data.suggestions);
        const words = suggestions.map(suggestion => (
          [suggestion[0],
            [...suggestion[1].similar_words.map(similar => similar[0])]]
        ));
        const filterWords = words.map(word => word.flat());
        this.allWords = filterWords;
      } catch (error) {
        this.error = error;
      }
      this.loading = false;
    },
    addSentence(value) {
      const joinWords = value.join(' ');
      const checkSentence = this.phraseList.items.find(sentence => sentence.text === joinWords);

      if (checkSentence !== undefined || joinWords === '') return;

      this.phraseList.items.push({ text: joinWords });
      this.phraseList.total = this.phraseList.items.length;
    },
    addToTraining() {
      this.loading = true;
      this.phraseList.items.map(async (phrase) => {
        try {
          await this.newExample({
            intent: this.detail.intent,
            text: phrase.text,
            isCorrected: false,
            entities: [],
            language: this.detail.language,
            repository: this.repositoryUUID.uuid,
            repositoryVersion: this.repositoryVersion,
          });
          this.dispatchMessage(
            true,
            'success',
            this.$tc('webapp.word_suggestion.phrase_added', this.phraseList.total),
          );
          this.phraseList.items = [];
          this.phraseList.total = this.phraseList.items.length;
          this.setUpdateRepository(true);
        } catch (error) {
          this.error = error.response.data.detail;
          this.dispatchMessage(true, 'danger', this.error);
        } finally {
          this.loading = false;
        }
      });
    },
    dispatchMessage(show, type, text) {
      this.message.type = type;
      this.message.show = show;
      this.message.text = text;
    },
    closeModal() {
      this.$emit('closeModal');
      this.$parent.close();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/utilities.scss';
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

::-webkit-scrollbar {
    height: 0.5rem;
}

.modal-style{
  display: flex;
  justify-content: center;
  align-items: center;

  &__container{
    width: 567px;
    min-height: 300px;
    padding: 1rem 3rem 1rem;
    background-color: $color-white;
    border-radius: 6px;

    h3{
      font-weight: $font-weight-bolder;
      font-size: 1.75rem;
    }

    &__close{
      width: 100%;
      margin-left: 1.5rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: $color-grey-dark;
      cursor: pointer;
    }

      &__body{
        height: 85%;

        p{
          margin-bottom: $between-subtitle-content;
        }


        &__content{
            display: flex;
            justify-content: space-between;
            margin-top: $between-subtitle-content;

            &__icon {
                display: flex;
                justify-content: space-between;
                width: 20%;

                .icon-style {
                width: 43px;
                height: 40px;
                color: white;
                border-radius: 6px;
                background-color: $color-primary;
                box-shadow: 0px 3px 6px #00000029;
                }

                .icon-style:hover{
                    cursor: pointer;
                    background-color: $color-primary-dark;
                }
            }

            &__selects{
                width: 75%;
                overflow: auto;
                scrollbar-width: none;
                margin-bottom: $between-subtitle-content;

                .select-input{
                    margin-right: 0.3rem;
                }
            }
        }

      }

      &__footer{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1rem;

        button{
            width: 140px;
            height: 43px;
            margin: 0 0.5rem;
            font-weight: $font-weight-bolder;
            font-family: $font-family;
            box-shadow: 0px 3px 6px #00000029;
            white-space: normal;
            word-wrap: break-word;
            line-height: 0.95rem;
        }
      }
  }

}
</style>
