<template>
  <sentence-accordion :open.sync="isOpen">
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
        <b-field
          grouped
          group-multiline>
          <div
            v-for="(entity, index) in entitiesToEdit"
            :key="`entity-${index}`"
            class="edit-sentence__input">
            <b-field >
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
                size="is-small"
                class="edit-sentence-input"
                @input="entitiesToEdit[index].entity = intentFormatters(entity.entity)"
                @icon-right-click="removeEntity(entity, index)"
              />
            </b-field>
          </div>
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
                size="is-small"
                icon-right-clickable
                open-on-focus
                @input="pendingEntities[index].entity = intentFormatters(entity.entity)"
                @select="elevateToEntity(entity, index)"
                @icon-right-click="removePendingEntity(entity, index)"
              />
            </b-field>
            <b-field
              :message="errors.entities"
              type="is-danger" />
          </div>
        </b-field>
        <b-icon
          :disabled="textSelected === null"
          icon="plus"
          class="clickable"
          @click.native.stop="addPendingEntity"
        />
      </form>
    </div>

    <div
      slot="options">
      <b-field
        :message="errors.non_field_errors"
        :type="{ 'is-danger': errors.non_field_errors && errors.non_field_errors.length > 0 }"
        :label="`${$t('webapp.example.intent')}:`"
        horizontal>
        <b-autocomplete
          v-model="intent"
          :data="repository.intents_list || []"
          :placeholder="$t('webapp.example.intent')"
          dropdown-position="bottom"
          size="is-small"
          open-on-focus
          @input="intent = intentFormatters(intent)" />
      </b-field>
      <div>
        <b-icon
          icon="close"
          class="clickable"
          size="is-small"
          @click.native.stop="cancelEditSentence" />

        <b-tooltip
          :active="!isValid"
          :label="validationErrorsString">
          <b-icon
            :disabled="!isValid || submitting"
            :icon="submitting ? 'refresh' : 'check'"
            :class="{clickable: true, 'icon-spin': submitting }"
            size="is-small"
            @click.native.stop="onSubmit" />
        </b-tooltip>
      </div>
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

export default {
  name: 'EditExampleAccordion',
  components: {
    SentenceAccordion,
    ExampleTextWithHighlightedEntitiesInput,
    LanguageBadge,
  },
  extends: EditExampleBase,
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpen: this.open,
    };
  },
  watch: {
    open() {
      this.isOpen = this.open;
    },
    isOpen() {
      this.$emit('update:open', this.isOpen);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';

.edit-sentence {
    width: 100%;
    margin: 1rem;

    &__input {
        margin-right: 0.5rem;
        &__label {
            font-size: 12px;
        }
    }
}
</style>
