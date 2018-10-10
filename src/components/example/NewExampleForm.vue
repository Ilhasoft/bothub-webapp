<template>
  <div>
    <form
      class="columns is-variable is-2"
      @submit.prevent="onSubmit()">
      <div class="column is-three-fifths">
        <bh-field
          :errors="errors.text || errors.language"
          label>
          <example-text-with-highlighted-entities-input
            ref="textInput"
            v-model="text"
            :entities="entities"
            :available-entities="availableEntities"
            :formatters="textFormatters"
            size="medium"
            placeholder="Add a sentence"
            @textSelected="setTextSelected($event)">
            <language-append-select-input
              slot="append"
              v-model="language"
              class="language-append" />
          </example-text-with-highlighted-entities-input>
        </bh-field>
      </div>
      <div class="column">
        <bh-field
          :errors="errors.intent"
          label="Intent"
          help-text="When your bot receives a message, your bot can use a
                    recognizer to examine the message and determine intent.">
          <bh-autocomplete
            v-model="intent"
            :data="repository.intents || []"
            :formatters="intentFormatters"
            size="medium"
            placeholder="Intent" />
        </bh-field>
      </div>
      <div class="column is-narrow">
        <bh-field label>
          <bh-button
            :disabled="!isValid || submitting "
            :tooltip-hover="!isValid ? validationErrors : null"
            primary
            type="submit"
            size="medium">
            <slot v-if="!submitting">Submit</slot>
            <bh-loading
              v-if="submitting"
              ref="load"
              size="small" />
          </bh-button>
        </bh-field>
      </div>
    </form>
    <div class="columns is-variable is-1">
      <div class="column">
        <bh-field :errors="errors.entities">
          <entities-input
            ref="entitiesInput"
            v-model="entities"
            :repository="repository"
            :text="text"
            :text-selected="textSelected"
            :available-entities="availableEntities"
            :available-labels="availableLabels"
            @entityAdded="onEntityAdded($event)"
            @entityEdited="onEditEntity($event)" />
        </bh-field>
      </div>
    </div>
  </div>
</template>

<script>
import ExampleTextWithHighlightedEntitiesInput from '@/components/inputs/ExampleTextWithHighlightedEntitiesInput';
import EntitiesInput from '@/components/inputs/EntitiesInput';
import LanguageAppendSelectInput from '@/components/inputs/LanguageAppendSelectInput';

import { mapActions } from 'vuex';
import { formatters as bhFormatters } from 'bh/utils';
import { formatters } from '@/utils';


const components = {
  ExampleTextWithHighlightedEntitiesInput,
  EntitiesInput,
  LanguageAppendSelectInput,
};

export default {
  name: 'NewExampleForm',
  components,
  props: {
    repository: {
      type: [Object, String],
      required: true,
    },
  },
  data() {
    return {
      textSelected: null,
      text: '',
      language: this.repository.language,
      intent: '',
      entities: [],
      errors: {},
      submitting: false,
    };
  },
  computed: {
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
        bhFormatters.trimStart(),
        bhFormatters.removeBreakLines(),
        bhFormatters.removeMultipleWhiteSpaces(),
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
      const repositoryEntities = this.repository.entities || [];
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
  methods: {
    ...mapActions([
      'newExample',
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
    async onSubmit() {
      this.errors = {};
      this.submitting = true;
      if (this.$refs.entitiesInput.clearEntityForm) {
        this.$refs.entitiesInput.clearEntityForm();
      }

      try {
        await this.newExample({
          repository: this.repository.uuid || this.repository,
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
  },
};
</script>

<style lang="scss" scoped>
.language-append {
  flex-grow: 0;
}
</style>
