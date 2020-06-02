<template>
  <div>
    <div
      v-if="entitiesList.length > 0"
      class="example-entities">
      <b-tag
        v-for="(entity, i) in entitiesList"
        :key="i"
        :class="entity.class"
        rounded>
        <span
          v-if="entity.label"
          v-html="$t('webapp.evaluate.entity_is_group',
                     { entity: entity.entity, group: entity.label })" />
        <strong v-else>{{ entity.entity }}</strong>
      </b-tag>
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
export default {
  name: 'ExampleInfo',
  props: {
    entitiesList: {
      type: Array,
      default: () => ([]),
    },
    intent: {
      type: String,
      default: '',
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
    > * {
      margin: 0 .5rem 0 0;

      &:last-child {
        margin: 0;
      }
    }
  }
}
</style>
