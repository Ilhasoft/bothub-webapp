<template>
  <edit-example-translation
    v-if="editing"
    :id="id"
    :entities="entities"
    :text-to-edit="text"
    :sentence-id="id"
    :language-edit="language"
    :get-all-entities="allEntities"
    @cancel="editing = false" />
  <div
    v-else
    class="translation" >
    <div class="columns">
      <div class="column is-1 translation__language">
        <language-badge
          :language="language"/>
      </div>
      <div class="column translation__text__container">
        <highlighted-text
          :text="text"
          :entities="currentEntities"
          :highlighted="highlighted"
          class="translation__text" />
        <div
          v-if="entitiesList.length > 0"
          class="translation__entities">
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
import { getEntityColor } from '@/utils/entitiesColors';
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
  },
  data() {
    return {
      loadingOriginal: false,
      original: null,
      showingOriginal: false,
      deleteDialog: null,
      highlighted: null,
      editing: false,
    };
  },
  computed: {
    currentEntities() {
      return this.showingOriginal
        ? this.original.entities
        : this.entities;
    },
    entitiesList() {
      return getEntitiesList(this.currentEntities);
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
    getEntityClass(entity) {
      const color = getEntityColor(
        entity,
        this.repository.entities || this.repository.entities_list,
        this.currentEntities,
      );
      return `entity-${color}`;
    },
    deleteThisTranslation() {
      return new Promise((resolve, reject) => {
        this.deleteDialog = this.$buefy.dialog.confirm({
          message: 'Are you sure? The translation will be deleted.',
          confirmText: 'Delete',
          type: 'is-danger',
          onConfirm: async () => {
            await this.deleteTranslation({ translationId: this.id });
            this.$emit('deleted');
            resolve();
          },
          onCancel: () => {
            /* istanbul ignore next */
            reject();
          },
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';

.translation {
  padding: 0.7rem;

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
