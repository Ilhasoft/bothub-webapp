<template>
  <div class="example-entities__wrapper">
    <div
      v-if="entitiesList.length > 0"
      class="example-entities">
      <entity-tag
        v-for="entity in uniqueEntities"
        :key="entity.entity"
        :color-class="colorOnly && colorOnly !== entity.entity ? 'entity-selected' : entity.class"
        :group="entity.group"
        :highlighted="entity.entity === highlighted"
        :entity-name="entity.entity"
        @mouseenter.native.stop="$emit('update:highlighted', entity.entity)"
        @mouseleave.native.stop="$emit('update:highlighted', null)"
      />
    </div>
    <div class="example-infos level is-mobile">
      <div class="level-left">
        <div
          v-if="intent"
          class="level-item has-text-grey">
          <strong>{{ $t('webapp.evaluate.intent') }}:&nbsp;</strong>
          <span>{{ intent }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EntityTag from '@/components/repository/repository-evaluate/example/EntityTag';

export default {
  name: 'ExampleInfo',
  components: {
    EntityTag,
  },
  props: {
    entitiesList: {
      type: Array,
      default: () => ([]),
    },
    intent: {
      type: String,
      default: '',
    },
    highlighted: {
      type: String,
      default: null,
    },
    colorOnly: {
      type: String,
      default: null,
    },
  },
  computed: {
    uniqueEntities() {
      const entityDict = this.entitiesList.reduce((dict, entity) => {
        if (!dict[entity.entity]) {
          // eslint-disable-next-line no-param-reassign
          dict[entity.entity] = {
            entity: entity.entity,
            class: entity.class,
            group: entity.group,
          };
        }
        return dict;
      }, {});
      return Object.values(entityDict);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/utilities.scss';

.example {
  $radius: .5rem;

  margin: 1rem .5rem;
  overflow: visible;
  background-color: $white-bis;
  border-radius: $radius;

  &-text {
    display: flex;
    padding: 1rem 2rem;
    margin-bottom: 4px;
    background-color: $white-ter;
    border-radius: $radius;
    transition: box-shadow .2s ease;

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
    padding: .25rem .5rem .3rem 1rem;
  }

  &-entities {

    &__wrapper {
      margin: 0 0 0 0.8rem;
    }

    > * {
      margin: 0 .5rem 0 0;

      &:last-child {
        margin: 0;
      }
    }
  }
}
</style>
