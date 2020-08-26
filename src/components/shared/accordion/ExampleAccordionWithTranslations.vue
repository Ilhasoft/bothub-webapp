<template>
  <sentence-accordion :open.sync="open">
    <div slot="check">
      <language-badge
        :language="language"
        main />
    </div>
    <div
      slot="header"
      class="example-item__header">
      <highlighted-text
        :text="text"
        :entities="entities"
        :highlighted="highlighted" />
      <div class="example-item__entities">
        <entity-tag
          v-for="entity in entities"
          :entity-name="entity.entity"
          :key="entity.entity"
          :highlighted="highlighted === entity.entity"
          :group="entity.group"
          @mouseenter.native.stop="highlighted = entity.entity"
          @mouseleave.native.stop="highlighted = null" />
      </div>
    </div>
    <div
      slot="options"
      class="example-item__faded">
      <span class="example-item__intent">
        <strong class="example-item__faded"> {{ $t('webapp.evaluate.intent') }}: </strong>
        {{ intent }}
      </span>
      <span>
        <b-icon
          class="clickable"
          size="is-small"
          icon="pencil" />
        <b-icon
          class="clickable"
          size="is-small"
          icon="delete" />
      </span>
    </div>
  </sentence-accordion>
</template>

<script>
import SentenceAccordion from '@/components/shared/accordion/SentenceAccordion';
import HighlightedText from '@/components/shared/HighlightedText';
import LanguageBadge from '@/components/shared/LanguageBadge';
import EntityTag from '@/components/repository/repository-evaluate/example/EntityTag';
import { mapState, mapActions } from 'vuex';
import { getEntityColor } from '@/utils/entitiesColors';

export default {
  name: 'ExampleAccordionWithTranslations',
  components: {
    SentenceAccordion,
    HighlightedText,
    LanguageBadge,
    EntityTag,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      default: '',
    },
    entities: {
      type: Array,
      default: () => ([]),
    },
    intent: {
      type: String,
      default: '',
    },
    training: {
      type: Boolean,
      default: false,
    },
    language: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      open: false,
      editing: false,
      highlighted: null,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
    .example-item {
        &__header {
            > * :not(:last-child) {
                margin-bottom: 0.5rem;
            }
        }

        &__entities {
            > * {
                margin-right: 0.3rem;
            }
        }

        &__faded {
            color: $color-grey-dark;
        }

        &__intent {
            margin-right: 1rem;
        }
    }
</style>
