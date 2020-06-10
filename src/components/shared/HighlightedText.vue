<template>
  <div class="highlighted">
    <div class="highlighted-base">{{ text }}</div>
    <div class="highlighted-text">{{ text }}</div>
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
          :class="['highlighted-entity-text',
                   colorOnly && entity.entity !== colorOnly ? 'entity-selected' : entity.colorClass,
                   entitiesHasFailed,
                   failed,
                   entity.entity === highlighted ? 'highlighted-selected' : '']">
          {{ entity.text }}
        </span>
      </div>
    </div>
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
            entity,
            text,
          };
        });
    },
    prefixEntities() {
      const entitiesName = this.repository.other_group.entities.map(
        entityValue => entityValue.value,
      );
      const entitiesGroup = this.repository.groups.map(
        entityValue => entityValue.entities[0].value,
      );
      const allEntitiesName = [...entitiesName, ...entitiesGroup];

      return this.entities
        .map(({ start, end, entity }) => {
          const color = getEntityColor(
            entity,
            allEntitiesName,
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
    pointer-events: none;
  }

  &-text {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    pointer-events: none;
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
      display: inline-block;
      opacity: .5;
      border-radius: 4px;
    }
  }
  &-selected {
    box-shadow:0px 0px 0px 2px red inset;
    opacity: .8;
  }
}
.failed {
  border: .120rem solid red;
}
</style>
