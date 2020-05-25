<template>
  <div class="highlighted">
    <div v-if="prefixColorAvailable">
      <div
        v-for="(entity, i) in prefixEntities"
        :key="i"
        class="highlighted-entity">
        <span class="highlighted-entity-before">{{ entity.before }}</span>
        <span
          :class="`highlighted-entity-text ${entity.colorClass} ${entitiesHasFailed} ${failed}`"
        >{{ entity.text }}</span>
      </div>
    </div>
    <div v-else>
      <div
        v-for="(entity, i) in entitiesBlocks"
        :key="i"
        class="highlighted-entity">
        <span class="highlighted-entity-before">{{ entity.before }}</span>
        <span
          :class="`highlighted-entity-text ${entity.colorClass} ${entitiesHasFailed} ${failed}`"
        >{{ entity.text }}</span>
      </div>
    </div>
    <div class="highlighted-base">{{ text }}</div>
    <div class="highlighted-text">{{ text }}</div>
  </div>
</template>

<script>
import { getEntityColor } from '@/utils/entitiesColors';
import { mapState } from 'vuex';

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
    prefixColor: {
      type: String,
      default: '',
    },
    prefixColorAvailable: {
      type: Boolean,
      default: false,
    },
    failed: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState({
      repository: state => state.Repository.selectedRepository,
    }),
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
    prefixEntities() {
      return this.entities
        .map(({ start, end, entity }) => {
          const color = getEntityColor(
            entity,
            this.repository.other_label.entities,
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
