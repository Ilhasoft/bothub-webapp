<template>
  <edit-example-translation
    v-if="editing"
    :id="id"
    :entities="entities"
    :text-to-edit="text"
    :sentence-id="original_example"
    :language-edit="language"
    :get-all-entities="allEntities"
    @edited="onEdit"
    @cancel="editing = false" />
  <div
    v-else
    class="translation" >
    <div class="columns">
      <div class="translation__language">
        <language-badge
          :language="language"/>
      </div>
      <div class="column translation__text__container">
        <highlighted-text
          :text="text"
          :entities="entities"
          :highlighted="highlighted"
          class="translation__text" />
        <div
          class="translation__entities">
          <b-tooltip
            v-if="!has_valid_entities"
            :label="$t('webapp.translate.invalid_entities')"
            multilined
            type="is-warning">
            <b-icon
              size="is-small"
              class="is-warining"
              icon="alert" />
          </b-tooltip>
          <entity-tag
            v-for="(entity, i) in entitiesList"
            :key="i"
            :entity-name="entity"
            :highlighted="highlighted === entity"
            @mouseenter.native.stop="highlighted = entity"
            @mouseleave.native.stop="highlighted = null"
          />
        </div>
      </div>
      <div class="translation__icons column is-2">
        <span>
          <b-icon
            :class="{clickable: true, 'icon-disabled': disableEdit}"
            size="is-small"
            icon="pencil"
            @click.native.stop="editing = true" />
          <b-icon
            class="clickable"
            size="is-small"
            icon="delete"
            @click.native="deleteThisTranslation()" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getEntitiesList } from '@/utils';
import HighlightedText from '@/components/shared/HighlightedText';
import LanguageBadge from '@/components/shared/LanguageBadge';
import EntityTag from '@/components/repository/repository-evaluate/example/EntityTag';
import EditExampleTranslation from '@/components/shared/accordion/EditExampleTranslation';
import { mapActions } from 'vuex';

export default {
  name: 'ExampleTranslation',
  components: {
    HighlightedText,
    EntityTag,
    LanguageBadge,
    EditExampleTranslation,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      default: '...',
    },
    disableEdit: {
      type: Boolean,
      default: false,
    },
    entities: {
      type: Array,
      default: /* istanbul ignore next */ () => ([]),
    },
    from_language: {
      type: String,
      default: '...',
    },
    language: {
      type: String,
      default: '...',
    },
    original_example: {
      type: Number,
      required: true,
    },
    created_at: {
      type: String,
      default: '',
    },
    repository: {
      type: Object,
      default: () => ({}),
    },
    allEntities: {
      type: Array,
      default: () => [],
    },
    has_valid_entities: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      deleteDialog: null,
      highlighted: null,
      editing: false,
    };
  },
  computed: {
    entitiesList() {
      return getEntitiesList(this.entities);
    },
  },
  watch: {
    editing() {
      this.$emit('edit', { id: this.id, editing: this.editing });
    },
  },
  methods: {
    ...mapActions([
      'getExample',
      'deleteTranslation',
    ]),
    onEdit(edited) {
      this.$emit('edited', edited);
      this.editing = false;
    },
    deleteThisTranslation() {
      this.deleteDialog = this.$buefy.dialog.confirm({
        message: this.$t('webapp.translate.translation_delete_confirm', { language: this.language }),
        confirmText: this.$t('webapp.home.delete'),
        cancelText: this.$t('webapp.home.cancel'),
        type: 'is-danger',
        onConfirm: async () => {
          await this.deleteTranslation({ translationId: this.id });
          this.$emit('deleted');
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';

.is-warning {
  color: $color-warning;
}

.translation {
  padding: 0.7rem;

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
