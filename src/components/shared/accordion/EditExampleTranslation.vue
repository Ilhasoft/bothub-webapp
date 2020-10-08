<template>
  <div
    class="translation" >
    <div class="columns">
      <div class="translation__language">
        <language-badge
          :language="languageEdit"/>
      </div>
      <div class="column translation__text__container">
        <b-field
          :message="errors.text || errors.language">
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
          constrict-entities
          @addedEntity="onEntityAdded" />
        <b-field :message="errors.entities" />
      </div>
      <div class="translation__icons column is-2">
        <span>
          <b-button
            class="translation__icon"
            icon-right="close-thick"
            @click.native.stop="cancelEditSentence" />
          <b-button
            :disabled="submitting"
            class="translation__icon">
            <b-icon
              :icon="submitting ? 'refresh' : 'check-bold'"
              :class="{
                'translation__icon': true,
                'icon-spin': submitting
              }"
              size="is-small"
              @click.native.stop="onSubmit" />
          </b-button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import EditExampleBase from './EditExampleBase';
import ExampleTextWithHighlightedEntitiesInput from '@/components/inputs/ExampleTextWithHighlightedEntitiesInput';
import SentenceAccordion from '@/components/shared/accordion/SentenceAccordion';
import LanguageBadge from '@/components/shared/LanguageBadge';
import ExampleEntitySmallInput from '@/components/example/ExampleEntitySmallInput';

export default {
  name: 'EditExampleTranslation',
  components: {
    SentenceAccordion,
    ExampleTextWithHighlightedEntitiesInput,
    LanguageBadge,
    ExampleEntitySmallInput,
  },
  extends: EditExampleBase,
  props: {
    id: {
      type: [Number, String],
      default: null,
    },
  },
  data() {
    return {
      allEntitiesInput: [],
    };
  },
  computed: {
    addEntityHelpText() {
      if (!(this.getAllEntities && this.getAllEntities.length > 0)) return this.$t('webapp.translate.no_entities');
      if (this.textSelected === null) return this.$t('webapp.trainings.select_text');
      return this.entityButtonText;
    },
    allEntities() {
      return this.allEntitiesInput;
    },
  },
  methods: {
    ...mapActions([
      'editTranslation',
    ]),
    async onSubmit() {
      this.submitting = true;
      const entities = this.allEntities.map(({
        start, end, entity, value,
      }) => ({
        start, end, entity, value,
      }));
      try {
        const edited = await this.editTranslation({
          translationId: this.id,
          text: this.text,
          entities,
          language: this.languageEdit,
          originalExample: this.sentenceId,
        });
        this.$emit('edited', edited.data);
        this.$buefy.toast.open({
          message: this.$t('webapp.translate.translation_edited'),
          type: 'is-success',
        });
      } catch (e) {
        this.errors = e.response.data;
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';

.icon {
    color: $color-grey-dark
}

.translation {
  padding: 0.75rem 0.75rem 1.5rem 0.75rem;

    &__icon-container {
      display: flex;
      align-items: center;
      .icon {
        margin-top: 1rem;
      }
    }

  &__text {
    margin-bottom: 0.5rem;

    &__container {
      padding: 0.75rem 0;
    }
  }

  &__language {
    margin: 0 0.25rem 0 1rem;
    padding: 0.75rem;
  }

  &__icons {
      text-align: right;
      color: $color-grey-dark;
  }

  &__icon {
    background-color: $color-grey-dark;
    color: white;
  }
}
</style>
