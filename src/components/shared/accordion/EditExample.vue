<template>
  <div class="edit-sentence">
    <form action="">
      <div class="bh-grid">
        <div class="bh-grid__item--grow-3 edit-sentence__input">
          <label for="">
            <strong>Sentence</strong>
          </label>
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
        <div class="bh-grid__item edit-sentence__input">
          <label for="">
            <strong>Intent</strong>
          </label>
          <bh-text
            v-model="intent"
            class="edit-sentence-input"
            size="medium"
            prepend-text="Type something" />
        </div>
      </div>
      <div
        v-for="(entity, index) in entities"
        :key="index"
        class="bh-grid">
        <div class="edit-sentence__input">
          <label for="">
            <strong>{{ highlightedText(entity) }}</strong> is
          </label>
          <bh-autocomplete
            :data="repository.intents_list || []"
            :formatters="intentFormatters"
            :value="entity.entity"
            class="edit-sentence-input"
            size="medium"
            placeholder="Intent">
            <span slot="append">
              <bh-icon-button
                value="close"
                size="small"
                @click.prevent.stop="removeEntity(entity, index)" />
            </span>
          </bh-autocomplete>
        </div>
      </div>
      <div
        class="edit-sentence__btn-wrapper">
        <bh-button rounded>Add entity</bh-button>
        <div>
          <bh-button
            primary
            @click="cancelEditSentence">
            Cancel
          </bh-button>
          <bh-button
            :disabled="!isValid || submitting "
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
import { mapState, mapActions } from 'vuex';
import { formatters } from '@/utils';
import ExampleTextWithHighlightedEntitiesInput from '@/components/inputs/ExampleTextWithHighlightedEntitiesInput';

export default {
  name: 'EditSentence',
  components: {
    ExampleTextWithHighlightedEntitiesInput,
  },
  props: {
    textToEdit: {
      type: String,
      default: '',
    },
    entitiesToEdit: {
      type: Array,
      default: () => ([]),
    },
    entitiesList: {
      type: Array,
      default: () => ([]),
    },
    intentToEdit: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      errors: {},
      textSelected: null,
      text: this.textToEdit,
      intent: this.intentToEdit,
      entities: this.entitiesToEdit,
      submitting: false,
    };
  },
  computed: {
    ...mapState({
      repository: state => state.Repository.selectedRepository,
    }),
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
      return (entity) => {
        return this.text.slice(entity.start, entity.end);
      };
    },
  },
  methods: {
    ...mapActions([
      'updateEvaluateExample',
      'setUpdateRepository',
    ]),
    cancelEditSentence() {
      this.$emit('cancel');
    },
    setTextSelected(value) {
      this.textSelected = value;
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
    removeEntity(entity, index) {
      Vue.delete(this.entities, index);
    },
    isValid() {
      return this.validationErrors.length === 0;
    },
    async onSubmit() {
      this.errors = {};
      this.submitting = true;

      if (this.$refs.entitiesInput.clearEntityForm) {
        this.$refs.entitiesInput.clearEntityForm();
      }

      try {
        await this.updateEvaluateExample({
          repository: this.repository.uuid,
          ...this.data,
        });

        if (!this.repository.intents_list.includes(this.intent)) {
          throw new Error('Intent MUST match existing intents for training.');
        }

        this.text = '';
        this.intent = '';
        this.entities = [];
        this.submitting = false;

        this.setUpdateRepository(true);
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
