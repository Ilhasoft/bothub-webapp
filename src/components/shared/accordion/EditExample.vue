<template>
  <div class="edit-sentence">
    <form>
      <div class="columns edit-sentence__wrapper">
        <div class="column is-7">
          <b-field
            :errors="errors.text || errors.language"
            :label="$t('webapp.example.sentence')">
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
          </b-field>
        </div>
        <div class="column is-5">
          <b-field
            :message="errors.non_field_errors"
            :type="{ 'is-danger': errors.non_field_errors && errors.non_field_errors.length > 0 }"
            :label="$t('webapp.example.intent')">
            <b-autocomplete
              v-model="intent"
              :data="repository.intents_list || []"
              :placeholder="$t('webapp.example.intent')"
              dropdown-position="bottom"
              open-on-focus
              @input="intent = intentFormatters(intent)" />
          </b-field>
        </div>
      </div>
      <div class="edit-sentence__wrapper">
        <div
          class="edit-sentence__input__wrapper">
          <div
            v-for="(entity, index) in entitiesToEdit"
            :key="`entity-${index}`"
            class="edit-sentence__input">
            <b-field>
              <span
                slot="label"
                class="edit-sentence__input__label"
                v-html="$t('webapp.example.text_is', {text: highlightedText(entity) })" />
              <b-autocomplete
                :data="getAllEntities || []"
                v-model="entity.entity"
                :placeholder="$t('webapp.example.entity')"
                dropdown-position="bottom"
                icon-right="close"
                icon-right-clickable
                open-on-focus
                class="edit-sentence-input"
                @input="entitiesToEdit[index].entity = intentFormatters(entity.entity)"
                @icon-right-click="removeEntity(entity, index)"
              />
            </b-field>
          </div>
        </div>
        <div
          class="edit-sentence__input__wrapper">
          <div
            v-for="(entity, index) in pendingEntities"
            :key="`pending-entity-${index}`"
            class="edit-sentence__input">
            <b-field>
              <span
                slot="label"
                class="edit-sentence__input__label"
                v-html="$t('webapp.example.text_is', {text: highlightedText(entity) })" />
              <b-autocomplete
                :data="getAllEntities || []"
                :custom-formatter="intentFormatters"
                v-model="entity.entity"
                :placeholder="$t('webapp.example.entity')"
                dropdown-position="bottom"
                icon-right="close"
                class="edit-sentence-input"
                icon-right-clickable
                open-on-focus
                @input="pendingEntities[index].entity = intentFormatters(entity.entity)"
                @select="elevateToEntity(entity, index)"
                @icon-right-click="removePendingEntity(entity, index)"
              />
            </b-field>
          </div>
        </div>
        <b-field
          :message="errors.entities"
          type="is-danger" />
      </div>
      <div
        class="edit-sentence__btn-wrapper">
        <b-button
          :disabled="textSelected === null"
          rounded
          type="is-primary"
          @click.prevent.stop="addPendingEntity"
        >
          {{ entityButtonText }}
        </b-button>
        <div>
          <b-button
            class="edit-sentence__btn-wrapper__cancelButton"
            @click="cancelEditSentence">
            {{ $t('webapp.trainings.cancel_button') }}
          </b-button>
          <b-button
            :disabled="!isValid || submitting"
            :tooltip-hover="!isValid ? validationErrors : null"
            :loading="submitting"
            class="edit-sentence__btn-wrapper__saveButton"
            @click="onSubmit">
            <slot v-if="!submitting">{{ $t('webapp.trainings.save_button') }}</slot>
          </b-button>
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
    getAllEntities: {
      type: Array,
      default: () => ([]),
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
    editExample: {
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
    entityButtonText() {
      if (this.textSelected === null) {
        return this.$t('webapp.trainings.add_entity');
      }

      const selected = this.text.slice(this.textSelected.start, this.textSelected.end);

      return `${this.$t('webapp.trainings.add_entity_for')} "${selected}"`;
    },
    intentFormatters() {
      return formatters.bothubItemKey();
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
  methods: {
    ...mapActions([
      'updateEvaluateExample',
      'editSentence',
    ]),
    cancelEditSentence() {
      this.$emit('cancel');
    },
    setTextSelected(value) {
      this.textSelected = value;
    },
    removeEntity(entity, index) {
      this.$nextTick(() => {
        Vue.delete(this.entitiesToEdit, index);
      });
    },
    removePendingEntity(entity, index) {
      this.$nextTick(() => {
        Vue.delete(this.pendingEntities, index);
      });
    },
    addPendingEntity() {
      // It will be added at the end of the list, so we already know its index.
      const newEntity = {
        start: this.textSelected.start,
        end: this.textSelected.end,
        entity: this.intentFormatters(
          this.text.substring(this.textSelected.start, this.textSelected.end),
        ),
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
        if (this.editExample) {
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
@import '~@/assets/scss/colors.scss';

.edit-sentence {

  &__wrapper {
    max-width: 100%;
    margin: 0 1rem;
  }

  &__input {
     margin: 0 .5rem;

     &__wrapper {
       display: flex;
       flex-wrap: wrap;
       padding: 0.25rem;
     }

     &__label /deep/ {
       font-weight: normal;
     }
  }

  &-input {
    margin: .5rem 0;
  }

  &__btn-wrapper{
    display: flex;
    justify-content: space-between;
    margin: 1rem 1.7rem 0.7rem 1.7rem;

    &__cancelButton{
      height: 2.25rem;
      width: 6rem;
      background-color:$color-primary;
      color: $color-white;
    }

    &__saveButton{
      height: 2.25rem;
      width: 6rem;
      background-color:$color-secondary;
      color: $color-white;
    }
  }
}

</style>
