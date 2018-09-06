<template>
  <bh-card>
    <div class="i-a-l-item">
      <div class="i-a-l-item__main">
        <div><strong>{{ title }}</strong></div>
        <div class="i-a-l-item__main__info-wrapper">
          <div class="i-a-l-item__main__info">
            <span v-if="labelEntities">{{ labelEntities.length }} Entities</span>
            <span><a @click.prevent="$emit('showSentences')">Show sentences</a></span>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="labelEntities"
      slot="append"
      class="i-a-l-item__entities">
      <div
        v-if="labelEntities"
        class="i-a-l-item__entities__label">
        <span>Entities</span>
      </div>
      <div class="i-a-l-item__entities__badges">
        <bh-badge
          v-for="(entities, i) in labelEntities"
          :key="i"
          :class="[
            'i-a-l-item__entities__badges__item',
            getEntityClass(entities),
          ]"
          size="small">
          <span>{{ entities }}</span>
        </bh-badge>
      </div>
    </div>
  </bh-card>
</template>

<script>
import { getEntityColor } from '@/utils/entitiesColors';


export default {
  name: 'IntentsAndLabelsItem',
  props: {
    title: {
      type: String,
      required: true,
    },
    labelEntities: {
      type: Array,
      default: null,
    },
  },
  methods: {
    getEntityClass(entity) {
      const color = getEntityColor(
        entity,
        this.labelEntities,
      );
      return `entity-${color}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/assets/scss/colors.scss';


.i-a-l-item {
  display: flex;

  &__main {
    padding: 1rem;

    &__info-wrapper {
      margin-top: .75rem;
    }

    &__info {
      $margin: .5rem;

      display: flex;
      justify-content: space-between;
      margin: -($margin);

      > span {
        color: $color-grey;
        margin: $margin;
      }
    }
  }

  &__entities {
    display: flex;
    align-items: stretch;
    flex-basis: 35%;

    &__label {
      display: flex;
      align-items: center;
      padding: 1rem;
      border-right: 1px solid $color-lighter-grey;
      color: $color-grey;
    }

    &__badges {
      $item-margin: .25rem;

      padding: (1rem - $item-margin);

      &__item {
        margin: $item-margin;
      }
    }
  }
}
</style>
