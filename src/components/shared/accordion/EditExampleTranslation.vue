<template>
  <div
    class="translation" >
    <div class="columns">
      <div class="column is-1 translation__language">
        <language-badge
          :language="languageEdit"/>
      </div>
      <div class="column translation__text__container">
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
        <div
          class="translation__entities">
          <b-field
            grouped
            group-multiline>
            <div
              v-for="(entity, index) in entitiesToEdit"
              :key="`entity-${index}`"
              class="translation__input translation__icon-container">
              <b-field>
                <span
                  slot="label"
                  class="translation__input__label"
                  v-html="$t('webapp.example.text_is', {text: highlightedText(entity) })" />
                <b-select
                  v-model="entity.entity"
                  expanded
                  size="is-small"
                  @input="entitiesToEdit[index].entity = intentFormatters(entity.entity)">
                  <option
                    v-for="entity in (getAllEntities || [])"
                    :key="entity">
                    {{ entity }}
                  </option>
                </b-select>
              </b-field>
              <div class="translation__icon-container">
                <b-icon
                  class="clickable"
                  size="is-small"
                  icon="close"
                  @click.native.stop="removeEntity(entity, index)"/>
              </div>
            </div>
            <div
              v-for="(entity, index) in pendingEntities"
              :key="`pending-entity-${index}`"
              class="translation__input translation__icon-container">
              <b-field>
                <span
                  slot="label"
                  class="translation__input__label"
                  v-html="$t('webapp.example.text_is', {text: highlightedText(entity) })" />
                <b-select
                  v-model="entity.entity"
                  expanded
                  size="is-small"
                  @input="pendingEntities[index].entity = intentFormatters(entity.entity)"
                  @select="elevateToEntity(entity, index)"
                  @icon-right-click="removePendingEntity(entity, index)">
                  <option
                    v-for="entity in (getAllEntities || [])"
                    :key="entity">
                    {{ entity }}
                  </option>
                </b-select>
              </b-field>
              <div class="translation__icon-container">
                <b-icon
                  class="clickable"
                  size="is-small"
                  icon="close"
                  @click.native.stop="removePendingEntity(entity, index)"/>
              </div>
              <b-field
                :message="errors.entities"
                type="is-danger" />
            </div>
            <div class="translation__icon-container">
              <b-icon
                :disabled="textSelected === null"
                :class="{clickable: true,
                         'icon-disabled': textSelected === null}"
                icon="card-plus"
                @click.native.stop="addPendingEntity"
              />
            </div>
          </b-field>
        </div>
      </div>
      <div class="translation__icons column is-2">
        <span>
          <b-icon
            icon="close"
            class="clickable"
            size="is-small"
            @click.native.stop="cancelEditSentence" />

          <b-icon
            :icon="submitting ? 'refresh' : 'check'"
            :class="{clickable: true,
                     'icon-spin': submitting,
                     'icon-disabled': submitting }"
            size="is-small"
            @click.native.stop="onSubmit" />
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

export default {
  name: 'EditExampleTranslation',
  components: {
    SentenceAccordion,
    ExampleTextWithHighlightedEntitiesInput,
    LanguageBadge,
  },
  extends: EditExampleBase,
  props: {
    id: {
      type: [Number, String],
      default: null,
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
        await this.editTranslation({
          translationId: this.id,
          text: this.text,
          entities,
          language: this.languageEdit,
          originalExample: this.sentenceId,
        });
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

    &__input {
      margin-right: 0.5rem;
        &__label {
            font-size: 12px;
        }
    }

  &__text {
    margin-bottom: 0.5rem;

    &__container {
      padding: 0.75rem 0;
    }
  }

  &__language {
    max-width: 5rem;
    margin: 0 0.25rem;
  }

  &__icons {
      text-align: right;
      color: $color-grey-dark;
  }

  &__entities {
    > * {
      margin: 0 8px 0 0;

      &:last-child {
        margin: 0;
      }
    }
  }
}
</style>
