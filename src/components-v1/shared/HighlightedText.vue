<template>
  <div class="highlighted">
    <div
      v-for="(entity, i) in entitiesBlocks"
      :key="i"
      class="highlighted-entity">
      <span class="highlighted-entity-before">{{ entity.before }}</span>
      <span
        :class="`highlighted-entity-text ${entity.colorClass} ${entitiesHasFailed}`"
      >{{ entity.text }}</span>
    </div>
    <div class="highlighted-base">{{ text }}</div>
    <div class="highlighted-text">{{ text }}</div>
  </div>
</template>

<script>
import { getEntityColor } from '@/utils/entitiesColors';


export default {
  name: 'HighlightedText',
  props: {
    text: {
      type: String,
      required: true,
    },
    entities: {
      type: Array,
      required: true,
    },
    allEntities: {
      type: Array,
      default: () => ([]),
    },
    failed: {
      type: String,
      default: 'failed',
    },
  },
  computed: {
    entitiesBlocks() {
      return this.entities
        .map(({ start, end, entity }) => {
          const color = getEntityColor(
            entity,
            this.allEntities,
            this.entities,
          );
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
    entitiesHasFailed() {
      return 'false';
    },
  },
};
</script>

<style lang="scss" scoped>
.highlighted {
  position: relative;

  &-base {
    opacity: 0;
  }

  &-text {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  &-entity {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;

    &-before,
    &-text {
      color: transparent;
    }

    &-text {
      opacity: .5;
      border-radius: 4px;
    }
  }
}
.failed {
  border: .120rem solid red;
}
</style>
