<template>
  <div class="highlighted">
    <div class="highlighted-base">{{ text }}</div>
    <div class="highlighted-text">{{ text }}</div>
    <div
      v-for="(entity, i) in entitiesBlocks"
      :key="i"
      class="highlighted-entity">
      <span
        :class="['highlighted-entity-before',
                 `highlighted-text--size-${size}`]">{{ entity.before }}</span>
      <span
        :class="['highlighted-entity-text',
                 `highlighted-text--size-${size}`,
                 colorOnly && entity.entity !== colorOnly ? 'entity-selected' : entity.colorClass,
                 failed,
                 entity.entity === highlighted ? 'highlighted-selected' : '']">
        {{ entity.text }}
      </span>
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
    size: {
      type: String,
      default: 'normal',
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

    &--size {
      &-normal {
        font-size: 1rem;
      }

      &-medium {
        font-size: 18px;
      }

      &-large {
        font-size: 20px;
      }
    }
  }

  &-entity {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    font-size: 0;

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
