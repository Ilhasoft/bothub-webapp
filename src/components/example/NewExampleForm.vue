<template>
  <div>
    <div class="columns is-variable is-1">
      <div class="column">
        <form @submit.prevent="onSubmit()">
          <div class="columns is-variable is-2">
            <div class="column is-three-fifths">
              <bh-field
                label
                :errors="errors.text || errors.language">
                <example-text-with-highlighted-entities-input
                  ref="textInput"
                  v-model="text"
                  size="medium"
                  placeholder="Add a sentence"
                  :entities="preparedEntities"
                  :formatters="textFormatters"
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
                label="Intent"
                helpText="When your bot receives a message, your bot can use a
                          recognizer to examine the message and determine intent."
                :errors="errors.intent">
                <bh-autocomplete
                  v-model="intent"
                  size="medium"
                  placeholder="Intent"
                  :data="repository.intents"
                  :formatters="intentFormatters" />
              </bh-field>
            </div>
            <div class="column is-narrow">
              <bh-field label>
                <bh-button
                  primary
                  type="submit"
                  :disabled="!isValid"
                  :tooltipHover="!isValid ? validationErrors : null"
                  size="medium">Submit</bh-button>
              </bh-field>
            </div>
          </div>
        </form>
      </div>
    </div>
    <bh-field :errors="errors.entities">
      <div
        v-if="entities.length > 0"
        class="columns is-variable is-1">
        <div class="column">
          <entities-badges-input
            editEntityEnable
            :entities="preparedEntities"
            @remove="removeEntity($event)"
            @edit="editEntity($event)" />
        </div>
      </div>
    </bh-field>
    <div class="columns is-variable is-1">
      <div class="column is-narrow">
        <new-entity-input
          ref="newEntityInput"
          :repository="repository"
          :text="text"
          :textSelected="textSelected"
          :availableEntities="repository.entities"
          :labels="labels"
          @newEntity="addNewEntity($event)" />
      </div>
    </div>
  </div>
</template>

<script>
import ExampleTextWithHighlightedEntitiesInput from '@/components/inputs/ExampleTextWithHighlightedEntitiesInput';
import NewEntityInput from '@/components/inputs/NewEntityInput';
import EntitiesBadgesInput from '@/components/inputs/EntitiesBadgesInput';
import LanguageAppendSelectInput from '@/components/inputs/LanguageAppendSelectInput';

import { mapActions } from 'vuex';
import { formatters as bhFormatters } from 'bh/utils';
import { formatters } from '@/utils';


const components = {
  ExampleTextWithHighlightedEntitiesInput,
  NewEntityInput,
  EntitiesBadgesInput,
  LanguageAppendSelectInput,
};

export default {
  name: 'NewExampleForm',
  components,
  props: {
    repository: [Object, String],
    required: true,
  },
  watch: {
    text(text, oldText) {
      this.validateEntities(text, oldText);
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

      if (!this.intent && this.entities.length === 0) {
        errors.push('Set a intent or one entity');
      }

      return errors;
    },
    isValid() {
      return this.validationErrors.length === 0;
    },
    labels() {
      return this.entities.reduce((current, { entity, label, pristineLabel }) => {
        if (label || pristineLabel) {
          return Object.assign(current, { [entity]: label || pristineLabel });
        }
        return current;
      }, {});
    },
    preparedEntities() {
      return this.entities
        .map(({
          label,
          pristineLabel,
          entity,
          ...others
        }) => (this.labels[entity]
          ? {
            label: this.labels[entity],
            entity,
            ...others,
          }
          : {
            entity,
            ...others,
          }))
        .sort((a, b) => (a.start - b.start));
    },
    textFormatters() {
      return [
        bhFormatters.trimStart(),
        bhFormatters.removeBreakLines(),
        bhFormatters.removeMultipleWhiteSpaces(),
      ];
    },
    intentFormatters() {
      return [
        formatters.bothubItemKey(),
      ];
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
        entities: entities
          .map(({
            start,
            end,
            entity,
            label,
          }) => (label
            ? {
              start,
              end,
              entity,
              label,
            }
            : {
              start,
              end,
              entity,
            })),
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
    addNewEntity(entity) {
      this.entities.push(entity);
      this.$refs.textInput.clearSelected();
    },
    validateEntities(text, oldText) {
      /*
        Entity follow text,
        based in https://github.com/RasaHQ/rasa-nlu-trainer/blob/master/src/components/TextEditor.js
      */
      this.entities.forEach((entity, i) => {
        const oldEntityText = oldText.substring(entity.start, entity.end);

        const findClosestStart = (lastMatch) => {
          if (lastMatch === undefined) {
            const index = text.indexOf(oldEntityText);
            return index === -1
              ? index
              : findClosestStart(index);
          }

          const from = lastMatch + oldEntityText.length;
          const index = text.indexOf(oldEntityText, from);

          if (index === -1) {
            return lastMatch;
          }

          const prevDiff = Math.abs(entity.start - lastMatch);
          const nextDiff = Math.abs(entity.start - index);

          return prevDiff < nextDiff
            ? lastMatch
            : findClosestStart(index);
        };

        const start = findClosestStart();
        if (start === -1) {
          this.entities[i] = false;
          return false;
        }

        this.entities[i].start = start;
        this.entities[i].end = start + oldEntityText.length;
        return true;
      });
      this.entities = this.entities.filter(value => !!value);
    },
    findEntityIndex(entity) {
      return this.entities.reduce((currentIndex, e, index) => {
        if (e.start === entity.start
            && e.end === entity.end
            && e.entity === entity.entity) {
          if (e.label || entity.label) {
            if (e.label !== entity.label) {
              return currentIndex;
            }
          }

          return index;
        }
        return currentIndex;
      }, -1);
    },
    removeEntity(entity) {
      const entityIndex = this.findEntityIndex(entity);
      this.entities.splice(entityIndex, 1);
    },
    async editEntity(entity) {
      this.removeEntity(entity);
      await this.$nextTick();
      this.$refs.textInput.emitTextSelected({
        selectionStart: entity.start,
        selectionEnd: entity.end,
      });
      await this.$nextTick();
      this.$refs.newEntityInput.fillEdit(
        entity.entity,
        entity.label,
        entity.pristineLabel,
      );
    },
    async onSubmit() {
      this.errors = {};
      this.submitting = true;

      try {
        await this.newExample({
          repository: this.repository.uuid || this.repository,
          ...this.data,
        });

        this.text = '';
        this.language = this.repository.language;
        this.intent = '';
        this.entities = [];
        this.submitting = false;

        this.$emit('created');
        return true;
      } catch (error) {
        const data = error.response && error.response.data;
        if (data) {
          this.errors = data;
        }
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
