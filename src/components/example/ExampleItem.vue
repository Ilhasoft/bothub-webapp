<template>
  <div class="example">
    <div class="example-text">
      <div
        v-for="(entity, i) in entitiesBlocks"
        :key="i"
        class="example-text-highlighted">
        <span class="example-text-highlighted-before">{{ entity.before }}</span>
        <span :class="`example-text-highlighted-text ${entity.colorClass}`">{{ entity.text }}</span>
      </div>
      <div class="example-text-content">{{ text }}</div>
    </div>
    <div
      v-if="entitiesList.length > 0"
      class="example-entities">
      <b-tag
        rounded
        v-for="(entity, i) in entitiesList"
        :key="i"
        :class="getEntityClass(entity)">{{ entity }}</b-tag>
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
          {{ created_at | moment("from") }}
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

export default {
  name: 'ExampleItem',
  props: {
    id: {
      type: Number,
    },
    text: {
      type: String,
      default: '...',
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
      return getEntitiesList(this.entities);
    },
    entitiesBlocks() {
      return this.entities
        .map(({ start, end, entity }) => {
          const color = getEntityColor(entity, this.entities);
          const colorClass = `entity-${color}`;
          const before = this.text.substring(0, start);
          const text = this.text.substring(start, end);
          return {
            start,
            end,
            colorClass,
            before,
            text,
          };
        });
    },
  },
  methods: {
    ...mapActions([
      'deleteExample',
    ]),
    getEntityClass(entity) {
      return `entity-${getEntityColor(entity, this.entities)}`;
    },
    deleteThisExample() {
      return new Promise((resolve, reject) => {
        this.deleteDialog = this.$dialog.confirm({
          message: 'Are you sure? The example will be deleted.',
          confirmText: 'Delete',
          type: 'is-danger',
          onConfirm: async () => {
            await this.deleteExample({ id: this.id });
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
  background-color: #E3E3E3;
  border-radius: $radius;
  overflow: visible;

  &:hover {
    .example-text {
      background-color: $white;
      box-shadow: 0 2px 8px rgba(100, 100, 100, .5);
    }
  }

  &-text {
    position: relative;
    font-size: 1.25rem;
    background-color: $white-ter;
    border-radius: $radius;
    transition: box-shadow .2s ease;
    min-height: 3rem;

    &-content,
    &-highlighted {
      padding: 8px;
    }

    &-content {
      z-index: 1;
    }

    &-highlighted {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;

      &-before,
      &-text {
        color: rgba(0, 0, 0, 0);
      }

      &-text {
        opacity: .75;
        border-radius: 4px;
      }
    }
  }

  &-entities,
  &-infos {
    padding: 4px 8px;
  }

  &-entities {
    > * {
      margin: 0 8px;

      &:first-child {
        margin: 0;
      }
    }
  }
}
</style>
