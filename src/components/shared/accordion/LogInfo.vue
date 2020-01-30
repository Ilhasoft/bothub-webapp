<template>
  <div>
    <div class="level">
      <div
        v-if="entitiesList.length > 0"
        class="level-left example-entities">
        <b-tag
          v-for="(entity, i) in entitiesList"
          :key="i"
          :class="entity.class"
          rounded>
          <strong>{{ entity.entity }}</strong>
          <span v-if="entity.label">is</span>
          <strong v-if="entity.label">{{ entity.label }}</strong>
        </b-tag>
      </div>
    </div>
    <div class="example-infos level is-mobile">
      <div class="level-left">
        <div
          v-if="intent"
          class="level-item has-text-grey">
          <strong>Intent:&nbsp;</strong>
          <span>{{ intent }} ({{ confidence }} confidence)</span>
        </div>
      </div>
      <div class="level-right">
        <div
          v-if="intent"
          class="level-item has-text-grey">
          <span>{{ getTimeAgo }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogInfo',
  props: {
    entitiesList: {
      type: Array,
      default: () => ([]),
    },
    intent: {
      type: String,
      default: '',
    },
    confidence: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Object,
      default: null,
    },
  },
  computed: {
    getTimeAgo() {
      return 'yesterday';
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
