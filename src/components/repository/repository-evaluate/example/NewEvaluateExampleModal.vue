<template>
  <bh-modal
    :open.sync="openValue"
    title="Add a new test sentence!">
    <div class="new-example-form-modal">
      <form
        @submit.prevent="onSubmit()">
        <div class="bh-grid">
          <div class="bh-grid__item bh-grid__item--grow-3">
            <bh-field
              :errors="errors.text || errors.language"
              label>
              <example-text-with-highlighted-entities-input
                ref="textInput"
                v-model="text"
                :entities="entities"
                :available-entities="dataAvailableEntities"
                :formatters="textFormatters"
                size="medium"
                placeholder="Add a sentence"
                @textSelected="setTextSelected($event)">
                <language-append-select-input
                  slot="append"
                  :value="getEvaluateLanguage"
                  class="language-append"
                  @input="setLanguage($event)" />
              </example-text-with-highlighted-entities-input>
            </bh-field>
          </div>
          <div class="bh-grid__item">
            <bh-field
              :errors="errors.non_field_errors"
              label="Intent"
              help-text="When your bot receives a message, your bot can use a
                    recognizer to examine the message and determine intent.">
              <bh-autocomplete
                v-model="intent"
                :data="repository.intents_list || []"
                :formatters="intentFormatters"
                size="medium"
                placeholder="Intent" />
            </bh-field>
          </div>
        </div>
        <bh-field
          :errors="errors.entities"
          class="align-space-left">
          <entities-input
            ref="entitiesInput"
            v-model="entities"
            :available-add-label="false"
            :repository="repository"
            :text="text"
            :text-selected="textSelected"
            :available-entities="dataAvailableEntities"
            :available-labels="availableLabels"
            :entities-for-edit="[]"
            @entityAdded="onEntityAdded()"
            @entityEdited="onEditEntity($event)" />
        </bh-field>
        <div class="bh-grid new-example-form-modal__buttons-wrapper">
          <bh-button
            ref="saveSentenceButton"
            :disabled="!isValid || submitting "
            :tooltip-hover="!isValid ? validationErrors : null"
            :loading="submitting"
            class="new-example-form-modal__buttons-wrapper__button"
            primary
            size="medium"
            @click="submitFormAndClose()">
            <slot v-if="!submitting">Save sentence</slot>
          </bh-button>
          <bh-button
            :disabled="!isValid || submitting "
            :tooltip-hover="!isValid ? validationErrors : null"
            :loading="submitting"
            primary
            class="new-example-form-modal__buttons-wrapper__button"
            size="medium"
            type="submit">
            <slot v-if="!submitting">Save and add another</slot>
          </bh-button>
        </div>
      </form>
    </div>
  </bh-modal>
</template>

<script>
import ExampleTextWithHighlightedEntitiesInput from '@/components/inputs/ExampleTextWithHighlightedEntitiesInput';
import EntitiesInput from '@/components/inputs/EntitiesInput';
import LanguageAppendSelectInput from '@/components/inputs/LanguageAppendSelectInput';
import { mapActions, mapGetters } from 'vuex';
import BH from 'bh';
import { formatters } from '@/utils';


export default {
  name: 'NewEvaluateExampleModal',
  components: {
    ExampleTextWithHighlightedEntitiesInput,
    EntitiesInput,
    LanguageAppendSelectInput,
  },
  props: {
    repository: {
      type: Object,
      required: true,
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      textSelected: null,
      text: '',
      language: '',
      intent: '',
      entities: [],
      errors: {},
      submitting: false,
      openValue: this.open,
      dataAvailableEntities: this.availableEntities || [],
    };
  },
  computed: {
    ...mapGetters([
      'getEvaluateLanguage',
    ]),
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
  watch: {
    open(value) {
      this.openValue = value;
      this.language = this.getEvaluateLanguage;
    },
    openValue(value) {
      this.$emit('update:open', value);
    },
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
    setLanguage(value) {
      this.language = value;
    },
    async onSubmit() {
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
.new-example-form-modal {
  margin: 0 1rem;

  &__buttons-wrapper {
    justify-content: center;

    &__button {
    margin: 2rem 1rem;
    }
  }
}
.language-append {
  flex-grow: 0;
}

.align-space-left {
  margin-left: .75rem;
}
</style>
