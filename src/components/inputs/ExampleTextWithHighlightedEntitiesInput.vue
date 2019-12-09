<template>
  <bh-input>
    <div :class="inputClassAttr.concat(['example-txt-w-highlighted-entities'])">
      <div class="example-txt-w-highlighted-entities__input-wrapper">
        <div
          v-for="(entity, i) in entitiesBlocks"
          :key="i"
          :class="entityClassAttr">
          <span
            :class="[
              'example-txt-w-highlighted-entities__entity__before',
          ]">{{ entity.before }}</span><span
            :class="[
              entity.colorClass,
              'example-txt-w-highlighted-entities__entity__text'
          ]">{{ entity.text }}</span>
        </div>
        <textarea
          ref="input"
          v-bind="$attrs"
          v-model="val"
          class="bh-textarea__input example-txt-w-highlighted-entities__input"
          @select.stop.prevent="emitTextSelected()"
          @click.stop.prevent="emitTextSelected()"
          @keyup.stop.prevent="emitTextSelected()"
        />
      </div>
      <slot name="append" />
    </div>
  </bh-input>
</template>

<script>
import BH from 'bh';
import Flag from '@/components/shared/Flag';
import { getEntityColor } from '@/utils/entitiesColors';

const components = {
  Flag,
};

export default {
  name: 'ExampleTextWithHighlightedEntitiesInput',
  components,
  extends: BH.components.BhTextarea,
  props: {
    entities: {
      type: Array,
      default: () => ([]),
    },
    availableEntities: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      selectionStart: 0,
      selectionEnd: 0,
    };
  },
  computed: {
    entityClassAttr() {
      const classes = ['example-txt-w-highlighted-entities__entity'];

      if (this.size) {
        classes.push(`example-txt-w-highlighted-entities__entity--${this.size}`);
      }

      return classes;
    },
    entitiesBlocks() {
      return this.entities
        .map(({ start, end, entity }) => {
          const color = getEntityColor(
            entity,
            this.availableEntities,
            this.entities,
          );
          const colorClass = `entity-${color}`;
          const before = this.val.substring(0, start);
          const text = this.val.substring(start, end);
          return {
            start,
            end,
            colorClass,
            before,
            text,
          };
        }).concat([{
          uuid: 'selected',
          start: this.selectionStart,
          end: this.selectionEnd,
          colorClass: 'entity-selected',
          before: this.val.substring(0, this.selectionStart),
          text: this.val.substring(this.selectionStart, this.selectionEnd),
        }]);
    },
  },
  methods: {
    emitTextSelected() {
      const { selectionStart, selectionEnd } = this.$refs.input;
      this.selectionStart = selectionStart;
      this.selectionEnd = selectionEnd;

      this.$emit(
        'textSelected',
        selectionStart === selectionEnd
          ? null
          : { start: selectionStart, end: selectionEnd },
      );
    },
    clearSelected() {
      this.$nextTick(() => {
        if (this.$refs.input.setSelectionRange) {
          window.getSelection().removeAllRanges();
          this.$refs.input.setSelectionRange(0, 0);
          this.$refs.input.blur();
        } else {
          this.$refs.input.focus();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/forms.scss';
@import '~bh/src/assets/scss/variables.scss';

.bh {
  &-textarea {
    background: none;
  }
}

.example-txt-w-highlighted-entities {
  background-color: white;
  border-radius: $form-components-border-radius;

  &__input-wrapper {
    position: relative;
  }

  &__input {
    position: inherit;
    z-index: 1;
  }

  &__entity {
    @include form-component-typography();

    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    height: max-content !important;
    padding: .5rem;
    background: none;
    border-color: transparent;

    &__before,
    &__text {
      color: rgba(0, 0, 0, 0);
      white-space: pre-line;
    }

    &__text {
      border-radius: 4px;
      opacity: .5;
    }

    &--small {
      padding: .5rem;
      font-size: .5rem;
      line-height: .5rem;
    }

    &--normal {
      padding: .65rem 1rem;
    }

    &--medium {
      padding: 1rem;
      font-size: 1rem;
      line-height: 1rem;
    }

    &--large {
      padding: 1.75rem;
      font-size: 1.5rem;
      line-height: 1.5rem;
    }
  }
}
</style>
