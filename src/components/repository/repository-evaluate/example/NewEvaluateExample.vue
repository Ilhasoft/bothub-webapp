<template>
  <div class="new-sentence">
    <div class="new-sentence__header">
      <h2 class="new-sentence__header__title">Add a new test sentence</h2>
      <span class="new-sentence__header__description">
        Create a bench of test sentences to measure the accuracy of your training.
      </span>
    </div>
    <div class="new-sentence__form">
      <form
        @submit.prevent="submitSentence()">
        <div class="bh-grid">
          <div class="bh-grid__item bh-grid__item--grow-3">
            <bh-field
              :errors="errors.text || errors.language">
              <example-text-with-highlighted-entities-input
                ref="textInput"
                v-model="text"
                :entities="entities"
                :available-entities="entitiesList"
                :formatters="textFormatters"
                size="medium"
                placeholder="Enter your sentence here"
                @textSelected="setTextSelected($event)" />
            </bh-field>
          </div>
          <div class="bh-grid__item">
            <bh-field
              :errors="errors.non_field_errors">
              <bh-autocomplete
                v-model="intent"
                :data="repository.intents_list || []"
                :formatters="intentFormatters"
                size="medium"
                placeholder="Intent" />
            </bh-field>
          </div>
          <div class="bh-grid__item new-sentence__form__submit-btn">
            <bh-button
              ref="saveSentenceButton"
              :disabled="!isValid || submitting "
              :tooltip-hover="!isValid ? validationErrors : null"
              :loading="submitting"
              primary
              size="medium"
              @click="submitSentence()">
              <slot v-if="!submitting">Submit</slot>
            </bh-button>
          </div>
        </div>
        <bh-field
          :errors="errors.entities"
          class="new-sentence__form__entities">
          <entities-input
            ref="entitiesInput"
            v-model="entities"
            :available-add-label="false"
            :repository="repository"
            :text="text"
            :text-selected="textSelected"
            :available-entities="entitiesList"
            :available-labels="availableLabels"
            :entities-for-edit="[]"
            :testing="testing"
            @entityAdded="onEntityAdded()"
            @entityEdited="onEditEntity($event)" />
        </bh-field>
      </form>
    </div>
  </div>
</template>

<script>
import ExampleTextWithHighlightedEntitiesInput from '@/components/inputs/ExampleTextWithHighlightedEntitiesInput';
import EntitiesInput from '@/components/inputs/EntitiesInput';
import { mapActions, mapState } from 'vuex';
import BH from 'bh';
import { formatters } from '@/utils';


export default {
  name: 'NewEvaluateExample',
  components: {
    ExampleTextWithHighlightedEntitiesInput,
    EntitiesInput,
  },
  data() {
    return {
      textSelected: null,
      text: '',
      intent: '',
      entities: [],
      errors: {},
      submitting: false,
      entitiesList: [],
      testing: true,
    };
  },
  computed: {
    ...mapState({
      repository: state => state.Repository.selectedRepository,
      language: state => state.Repository.evaluateLanguage,
    }),
    validationErrors() {
      const errors = [];

      if (!this.text) {
        errors.push('You need type a text to sentence');
      }

      if (!this.intent) {
        errors.push('Intent is required');
      }

      return errors;
    },
    isValid() {
      return this.validationErrors.length === 0;
    },
    textFormatters() {
      const formattersList = [
        BH.utils.formatters.trimStart(),
        BH.utils.formatters.removeBreakLines(),
        BH.utils.formatters.removeMultipleWhiteSpaces(),
      ];
      formattersList.toString = () => 'textFormatters';
      return formattersList;
    },
    intentFormatters() {
      const formattersList = [
        formatters.bothubItemKey(),
      ];
      formattersList.toString = () => 'intentFormatters';
      return formattersList;
    },
    availableEntities() {
      const repositoryEntities = this.repository.entities_list || [];
      const entitiesFlat = this.entities.map(e => e.entity);
      return repositoryEntities
        .concat(entitiesFlat)
        .filter((entity, index, current) => (current.indexOf(entity) === index));
    },
    availableLabels() {
      const repositoryLabels = this.repository.labels_list || [];
      const labelsFlat = this.entities.map(e => e.label);
      return repositoryLabels
        .concat(labelsFlat)
        .filter(label => !!label)
        .filter((label, index, current) => (current.indexOf(label) === index));
    },
    data() {
      const {
        text,
        language,
        intent,
        entities,
      } = this;

      return {
        text,
        language,
        intent,
        entities,
      };
    },
  },
  mounted() {
    this.entitiesList = this.availableEntities;
  },
  methods: {
    ...mapActions([
      'newEvaluateExample',
    ]),
    setTextSelected(value) {
      this.textSelected = value;
    },
    onEntityAdded() {
      if (this.$refs.textInput.clearSelected) {
        /* istanbul ignore next */
        this.$refs.textInput.clearSelected();
      }
    },
    onEditEntity(entity) {
      if (this.$refs.textInput.emitTextSelected) {
        /* istanbul ignore next */
        this.$refs.textInput.emitTextSelected({
          selectionStart: entity.start,
          selectionEnd: entity.end,
        });
      }
    },
    async submitSentence() {
      this.errors = {};
      this.submitting = true;
      if (this.$refs.entitiesInput.clearEntityForm) {
        this.$refs.entitiesInput.clearEntityForm();
      }

      try {
        await this.newEvaluateExample({
          repository: this.repository.uuid,
          ...this.data,
        });
        this.text = '';
        this.intent = '';
        this.entities = [];
        this.submitting = false;

        this.$emit('created');
        return true;
      } catch (error) {
        /* istanbul ignore next */
        const data = error.response && error.response.data;

        /* istanbul ignore next */
        if (data) {
          /* istanbul ignore next */
          this.errors = data;
        }
        /* istanbul ignore next */
        this.submitting = false;
      }
      return false;
    },
    async submitFormAndClose() {
      this.errors = {};
      this.submitting = true;
      if (this.$refs.entitiesInput.clearEntityForm) {
        this.$refs.entitiesInput.clearEntityForm();
      }

      try {
        await this.newEvaluateExample({
          repository: this.repository.uuid,
          ...this.data,
        });

        this.text = '';
        this.intent = '';
        this.entities = [];
        this.submitting = false;

        this.$emit('created');
        this.openValue = false;
        return true;
      } catch (error) {
        /* istanbul ignore next */
        const data = error.response && error.response.data;
        /* istanbul ignore next */
        if (data) {
          /* istanbul ignore next */
          this.errors = data;
        }
        /* istanbul ignore next */
        this.submitting = false;
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.new-sentence {
  width: 80%;
  margin: 3rem auto;

  &__header {
    margin: 0 0.75rem;
  }

  &__form {
    &__submit-btn {
      align-self: center;
    }

    &__entities {
      margin: 0 0.75rem;
    }
  }
}
</style>
