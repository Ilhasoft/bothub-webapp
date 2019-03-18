<template>
  <div class="example">
    <div class="example-text">
      <div class="example-text__main">
        <highlighted-text
          :text="text"
          :entities="entities"
          :all-entities="repository.entities || repository.entities_list" />
      </div>
      <div class="example-text__right">
        <language-badge :language="language" />
      </div>
    </div>
    <div
      v-if="entitiesList.length > 0"
      class="example-entities">
      <b-tag
        v-for="(entity, i) in entitiesList"
        :key="i"
        :class="entity.class"
        rounded>
        <strong>{{ entity.value }}</strong>
        <span v-if="entity.label">is</span>
        <strong v-if="entity.label">{{ entity.label }}</strong>
      </b-tag>
    </div>
    <div class="example-infos level is-mobile">
      <div class="level-left">
        <div
          v-if="intent"
          class="level-item has-text-grey">
          <strong>Intent:&nbsp;</strong>
          <span>{{ intent }}</span>
        </div>
        <div class="level-item has-text-grey-light">
          {{ created_at | moment('from') }}
        </div>
      </div>
      <div
        v-if="repository.authorization && repository.authorization.can_contribute"
        class="level-right">
        <div class="level-item">
          <a
            :href="`#delete-example-${id}`"
            class="has-text-danger"
            @click.prevent="deleteThisExample()">
            <b-icon icon="delete" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getEntitiesList } from '@/utils';
import { getEntityColor } from '@/utils/entitiesColors';
import { mapActions } from 'vuex';
import HighlightedText from '@/components-v1/shared/HighlightedText';
import LanguageBadge from '@/components/shared/LanguageBadge';


export default {
  name: 'ExampleItem',
  components: {
    HighlightedText,
    LanguageBadge,
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
    language: {
      type: String,
      default: null,
    },
    intent: {
      type: String,
      default: '',
    },
    entities: {
      type: Array,
      default: /* istanbul ignore next */ () => ([]),
    },
    created_at: {
      type: String,
      default: '',
    },
    repository: {
      type: Object,
      default: /* istanbul ignore next */ () => ({}),
    },
  },
  data() {
    return {
      deleteDialog: null,
    };
  },
  computed: {
    entitiesList() {
      return getEntitiesList(this.entities)
        .map(entity => ({
          value: entity,
          class: this.getEntityClass(entity),
          label: this.getEntityLabel(entity),
        }));
    },
  },
  methods: {
    ...mapActions([
      'deleteExampleTest',
    ]),
    getEntityClass(entity) {
      const color = getEntityColor(
        entity,
        this.repository.entities || this.repository.entities_list,
        this.entities,
      );
      return `entity-${color}`;
    },
    getEntityLabel(entityName) {
      return this.entities.reduce((current, e) => {
        if (e.entity === entityName) {
          return e.label;
        }
        return current;
      }, 'unlabeled');
    },
    deleteThisExample() {
      return new Promise((resolve, reject) => {
        this.deleteDialog = this.$dialog.confirm({
          message: 'Are you sure? The example will be deleted.',
          confirmText: 'Delete',
          type: 'is-danger',
          onConfirm: async () => {
            await this.deleteExampleTest({ id: this.id });
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
@import '~@/assets/scss/utilities.scss';

.example {
  $radius: 8px;

  margin: 16px 8px;
  background-color: $white-bis;
  border-radius: $radius;
  overflow: visible;

  &:hover {
    .example-text {
      background-color: $white;
      box-shadow: 0 2px 8px rgba(100, 100, 100, .5);
    }
  }

  &-text {
    display: flex;
    padding: 8px 16px;
    background-color: $white-ter;
    border-radius: $radius;
    transition: box-shadow .2s ease;
    margin-bottom: 4px;

    &__main {
      flex-grow: 1;
      font-size: 1.25rem;
    }

    &__rigth {
      flex-grow: 0;
    }
  }

  &-entities,
  &-infos {
    padding: 4px 8px 4px 16px;
  }

  &-entities {
    > * {
      margin: 0 8px 0 0;

      &:last-child {
        margin: 0;
      }
    }
  }
}
</style>
