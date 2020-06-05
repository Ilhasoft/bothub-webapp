<template>
  <div class="edit-sentence">
    <form @submit.prevent="onSubmit">
      <div class="bh-grid">
        <div class="bh-grid__item--grow-3 edit-sentence__input">
          <bh-field
            :errors="errors.text || errors.language"
            label="Sentence">
            <example-text-with-highlighted-entities-input
              ref="textInput"
              v-model="text"
              :entities="entitiesToEdit"
              :available-entities="entitiesToEdit"
              :formatters="textFormatters"
              :placeholder="$t('webapp.example.enter_sentence')"
              size="normal"
              @textSelected="setTextSelected($event)"
              @entityEdited="onEditEntity($event)"
              @entityAdded="onEntityAdded()"
            />
          </bh-field>
        </div>
        <div class="bh-grid__item edit-sentence__input">
          <bh-field
            :errors="errors.non_field_errors"
            label="Intent"
            help-text="When your bot receives a message, your bot can use a
                    recognizer to examine the message and determine intent.">
            <bh-autocomplete
              v-model="intent"
              :data="repository.intents_list || []"
              :formatters="intentFormatters"
              :placeholder="$t('webapp.example.intent')"
              size="normal" />
          </bh-field>
        </div>
      </div>
      <div
        v-for="(entity, index) in entitiesToEdit"
        :key="`entity-${index}`"
        class="bh-grid">
        <div class="edit-sentence__input">
          <bh-field
            :errors="entitiesError(index)">
            <label for="">
              <strong>{{ highlightedText(entity) }}</strong> is
            </label>
            <bh-autocomplete
              :data="repository.entities_list || []"
              :formatters="intentFormatters"
              v-model="entity.entity"
              :placeholder="$t('webapp.example.entity')"
              class="edit-sentence-input"
              size="normal"
            >
              <span slot="append">
                <bh-icon-button
                  value="close"
                  size="small"
                  @click.prevent.stop="removeEntity(entity, index)"
                />
              </span>
            </bh-autocomplete>
          </bh-field>
        </div>
      </div>
      <div
        v-for="(entity, index) in pendingEntities"
        :key="`pending-entity-${index}`"
        class="bh-grid">
        <div class="edit-sentence__input">
          <label for="">
            <strong>{{ highlightedText(entity) }}</strong> is
          </label>
          <bh-autocomplete
            :data="entitiesOptions"
            :formatters="intentFormatters"
            v-model="entity.entity"
            :placeholder="$t('webapp.example.entity')"
            class="edit-sentence-input"
            size="normal"
            @selected="elevateToEntity(entity, index)"
          >
            <span slot="append">
              <bh-icon-button
                value="close"
                size="small"
                @click.prevent.stop="removePendingEntity(entity, index)"
              />
            </span>
          </bh-autocomplete>
        </div>
      </div>
      <div
        class="edit-sentence__btn-wrapper">
        <bh-button
          :disabled="textSelected === null"
          rounded
          primary
          @click.prevent.stop="addPendingEntity"
        >
          {{ entityButtonText }}
        </bh-button>
        <div>
          <bh-button
            primary
            @click="cancelEditSentence">
            Cancel
          </bh-button>
          <bh-button
            :disabled="!isValid || submitting"
            :tooltip-hover="!isValid ? validationErrors : null"
            :loading="submitting"
            secondary
            type="submit">
            <slot v-if="!submitting">Save</slot>
          </bh-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from 'vue';
import BH from 'bh';
import { mapState, mapActions, mapGetters } from 'vuex';
import { getEntityColor } from '@/utils/entitiesColors';
import { formatters } from '@/utils';
import ExampleTextWithHighlightedEntitiesInput from '@/components/inputs/ExampleTextWithHighlightedEntitiesInput';

export default {
  name: 'EditExample',
  components: {
    ExampleTextWithHighlightedEntitiesInput,
  },
  props: {
    textToEdit: {
      type: String,
      default: '',
    },
    entities: {
      type: Array,
      default: () => ([]),
    },
    intentToEdit: {
      type: String,
      default: '',
    },
    languageEdit: {
      type: String,
      default: '',
    },
    editExampleEntityList: {
      type: Boolean,
      default: false,
    },
    sentenceId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      errors: {},
      textSelected: null,
      text: JSON.parse(JSON.stringify(this.textToEdit)),
      intent: JSON.parse(JSON.stringify(this.intentToEdit)),
      entitiesToEdit: JSON.parse(JSON.stringify(this.entities)),
      pendingEntities: [],
      submitting: false,
      allEntities: [],
    };
  },
  computed: {
    ...mapState({
      repository: state => state.Repository.selectedRepository,
      language: state => state.Repository.evaluateLanguage,
    }),
    ...mapGetters({
      version: 'getSelectedVersion',
    }),
    entitiesOptions() {
      if (this.allEntities !== undefined) {
        return this.allEntities;
      }
      return [];
    },
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
    entitiesError() {
      return (index) => {
        if (index === this.entitiesToEdit.length - 1) {
          return this.errors.entities;
        }

        return [];
      };
    },
    entityButtonText() {
      if (this.textSelected === null) {
        return this.$t('webapp.trainings.add_entity');
      }

      const selected = this.text.slice(this.textSelected.start, this.textSelected.end);

      return `${this.$t('webapp.trainings.add_entity_for')} "${selected}"`;
    },
    intentFormatters() {
      const formattersList = [
        formatters.bothubItemKey(),
      ];
      formattersList.toString = () => 'intentFormatters';
      return formattersList;
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
    highlightedText() {
      return entity => this.text.slice(entity.start, entity.end);
    },
  },
  watch: {
    text(newText, oldText) {
      if (newText !== oldText) {
        this.recomputeEntitiesFor(newText, oldText);
      }
    },
  },
  mounted() {
    this.allEntitiesAvailable();
  },
  methods: {
    ...mapActions([
      'updateEvaluateExample',
      'editSentence',
      'getAllEntities',
    ]),
    async allEntitiesAvailable() {
      try {
        const entities = await this.getAllEntities({
          repositoryUuid: this.repository.uuid,
          repositoryVersion: this.repository.version_default.id,
        });
        this.allEntities = entities.data.results.map(entity => entity.value);
      } catch (error) {
        this.errors = error;
      }
    },
    cancelEditSentence() {
      this.$emit('cancel');
    },
    setTextSelected(value) {
      this.textSelected = value;
    },
    removeEntity(entity, index) {
      Vue.delete(this.entitiesToEdit, index);
    },
    removePendingEntity(entity, index) {
      Vue.delete(this.pendingEntities, index);
    },
    addPendingEntity() {
      // It will be added at the end of the list, so we already know its index.
      const newEntity = {
        start: this.textSelected.start,
        end: this.textSelected.end,
        entity: '',
      };

      this.pendingEntities.push({
        ...newEntity,
        class: '',
      });

      this.textSelected = null;
      this.onEntityAdded();
    },
    elevateToEntity(entity, index) {
      Vue.delete(this.pendingEntities, index);

      const color = getEntityColor(
        entity,
        [...this.entitiesToEdit, entity],
        [],
      );

      this.entitiesToEdit.push({
        ...entity,
        class: `entity-${color}`,
      });

      this.onEntityAdded();
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
    recomputeEntitiesFor(text, oldText) {
      /*
        Entity follow text,
        based in https://github.com/RasaHQ/rasa-nlu-trainer/blob/master/src/components-v1/TextEditor.js
      */
      this.entitiesToEdit.forEach((entity, i) => {
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
          this.entitiesToEdit[i] = false;
          return false;
        }

        this.entitiesToEdit[i].start = start;
        this.entitiesToEdit[i].end = start + oldEntityText.length;
        return true;
      });
      this.entitiesToEdit = this.entitiesToEdit.filter(value => !!value);
    },
    onEntityAdded() {
      if (this.$refs.textInput.clearSelected) {
        /* istanbul ignore next */
        this.$refs.textInput.clearSelected();
      }
    },
    async onSubmit() {
      const entitiesSave = [...this.pendingEntities, ...this.entitiesToEdit];

      this.errors = {};
      this.submitting = true;

      const entitiesResponse = entitiesSave.map((entityValue) => {
        const { start, end, entity } = entityValue;
        return { start, end, entity };
      });

      try {
        if (this.editExampleEntityList) {
          await this.editSentence({
            repository: this.repository.uuid,
            id: this.sentenceId,
            version: this.version,
            text: this.text,
            intent: this.intent,
            entities: entitiesResponse,
            language: this.languageEdit,
          });
        } else {
          await this.updateEvaluateExample({
            repository: this.repository.uuid,
            id: this.sentenceId,
            version: this.version,
            text: this.text,
            intent: this.intent,
            entities: entitiesSave,
            language: this.language,
          });
        }


        if (!this.repository.intents_list.includes(this.intent)) {
          throw new Error('Intent MUST match existing intents for training.');
        }

        this.$emit('saveList');
        return true;
      } catch (error) {
        this.errors.intent = [error.message];

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
.edit-sentence {
  &__input {
     margin: 0 .5rem;
  }

  &-input {
    margin: .5rem 0;
  }

  &__btn-wrapper{
    display: flex;
    justify-content: space-between;
    margin: .7rem;
  }
}

</style>
