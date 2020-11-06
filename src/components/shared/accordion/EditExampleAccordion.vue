<template>
  <sentence-accordion
    :open.sync="isOpen"
    :custom-accordion="!custom"
    :class="custom ? 'custom-accordion' : ''"
    align="top">
    <language-badge
      slot="check"
      :language="languageEdit"
      main />
    <div
      slot="header"
      class="edit-sentence">
      <form>
        <b-field
          :errors="errors.text || errors.language">
          <example-text-with-highlighted-entities-input
            ref="textInput"
            v-model="text"
            :entities="allEntities"
            :placeholder="$t('webapp.example.enter_sentence')"
            size="normal"
            @textSelected="setTextSelected($event)"
            @entityEdited="onEditEntity($event)"
            @entityAdded="onEntityAdded()"
          />
        </b-field>
        <example-entity-small-input
          v-model="allEntitiesInput"
          :text="text"
          :available-entities="getAllEntities"
          :entities="entities"
          :text-selected="textSelected"
          :class="allEntitiesInput.length !== 0 && custom ? 'input-custom-style' : ''"
          @addedEntity="onEntityAdded"/>
        <b-field
          :message="errors.entities"
          type="is-danger" />
      </form>
    </div>
    <div
      slot="options"
      class="edit-sentence__options">
      <b-field
        :message="errors.non_field_errors"
        :type="{ 'is-danger': errors.non_field_errors && errors.non_field_errors.length > 0 }"
        horizontal
        addons>
        <div class="edit-sentence__icon-container--intent">
          {{ $t('webapp.example.intent') }}: <tr />
        </div>
        <b-autocomplete
          v-model="intent"
          :data="optionsIntents"
          :placeholder="$t('webapp.example.intent')"
          max-height="120px"
          dropdown-position="bottom"
          open-on-focus
          @input="intent = intentFormatters(intent)" />

        <div
          v-show="!custom"
          class="edit-sentence__icon-container edit-sentence__icon-container--intent">

          <b-button
            class="edit-sentence__icon"
            icon-right="close-thick"
            @click.native.stop="cancelEditSentence" />
          <b-tooltip
            :active="!isValid"
            :label="validationErrorsString">
            <b-button
              :disabled="submitting"
              class="edit-sentence__icon">
              <b-icon
                :icon="submitting ? 'refresh' : 'check-bold'"
                :class="{
                  'edit-sentence__icon': true,
                  'icon-spin': submitting
                }"
                size="is-small"
                @click.native.stop="onSubmit" />
            </b-button>
          </b-tooltip>
        </div>

      </b-field>
    </div>

    <div slot="body">
      <slot name="body" />
    </div>

  </sentence-accordion>
</template>

<script>
import EditExampleBase from './EditExampleBase';
import ExampleTextWithHighlightedEntitiesInput from '@/components/inputs/ExampleTextWithHighlightedEntitiesInput';
import SentenceAccordion from '@/components/shared/accordion/SentenceAccordion';
import LanguageBadge from '@/components/shared/LanguageBadge';
import ExampleEntitySmallInput from '@/components/example/ExampleEntitySmallInput';

export default {
  name: 'EditExampleAccordion',
  components: {
    SentenceAccordion,
    ExampleTextWithHighlightedEntitiesInput,
    LanguageBadge,
    ExampleEntitySmallInput,
  },
  extends: EditExampleBase,
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    custom: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpen: this.open,
      allEntitiesInput: [],
    };
  },
  computed: {
    addEntityHelpText() {
      if (this.textSelected === null) return this.$t('webapp.trainings.select_text');
      return this.entityButtonText;
    },
    allEntities() {
      return this.allEntitiesInput;
    },
    filterIntents() {
      if (this.intents !== null) {
        return this.repository.intents_list.filter(intent => intent
          .toString()
          .toLowerCase()
          .indexOf(this.intent.toLowerCase()) >= 0);
      }
      return [];
    },
    optionsIntents() {
      return this.filterIntents.map(intent => intent);
    },
  },
  watch: {
    open() {
      this.isOpen = this.open;
    },
    isOpen() {
      this.$emit('update:open', this.isOpen);
    },
    text() {
      this.$emit('textInput', this.text);
    },
    allEntitiesInput() {
      this.$emit('entitiesInput', this.allEntitiesInput);
    },
    intent() {
      this.$emit('intentInput', this.intent);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';

.icon {
  color: $color-grey-dark;
}
.input-custom-style{
  max-height: 150px;
  max-width: 100px;
}
.edit-sentence {
    width: 100%;
    margin: 0 1rem 1rem 0;

    &__input {
        margin-right: 0.5rem;
        &__label {
            font-size: 12px;
        }
    }

      &__icon {
        background-color: $color-grey-dark;
        color: white;
      }

    &__icon-container {

      > * {
        margin-left: 0.25rem;
      }

      .icon {
        margin-top: 1.75rem;
      }

      &--intent {
        display: flex;
        align-items: center;
        height: 100%;
        .icon {
          margin-top: 0;
        }
    }
  }
    &__options{
    width: 40rem;
  }
}
.custom-accordion{
  max-width: 100%;
}
</style>
