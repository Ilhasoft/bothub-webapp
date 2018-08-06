<template>
  <div class="bh-input-wrapper example-w-highlighted-text">
    <div
      v-for="(entity, i) in entitiesBlocks"
      :key="i"
      :class="entityClassAttr">
      <span class="example-w-highlighted-text-entity-before">{{ entity.before }}</span><!--
      --><span :class="[
        entity.colorClass,
        'example-w-highlighted-text-entity-text'
      ]">{{ entity.text }}</span>
    </div>
    <div class="example-w-highlighted-text-input">
      <div :class="inputClassAttr">
        <textarea
          ref="textarea"
          v-bind="$attrs"
          v-model="val"
          @select="emitTextSelected()"
          @click="emitTextSelected()"
          @keyup="emitTextSelected()" />
      </div>
    </div>
  </div>
</template>

<script>
import BhTextareaInput from 'bh/components/BhTextareaInput';

import { getEntityColor } from '@/utils/entitiesColors';


export default {
  name: 'ExampleWithHighlightedTextInput',
  extends: BhTextareaInput,
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
      const classes = ['example-w-highlighted-text-entity'];

      if (this.size) {
        classes.push(`example-w-highlighted-text-entity-${this.size}`);
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
    emitTextSelected(value = null) {
      const { selectionStart, selectionEnd } = value || this.$refs.textarea;
      this.selectionStart = selectionStart;
      this.selectionEnd = selectionEnd;
      this.$emit(
        'textSelected',
        selectionStart === selectionEnd
          ? null
          : { start: selectionStart, end: selectionEnd },
      );
    },
    async clearSelected() {
      await this.$nextTick();
      if (this.$refs.textarea.setSelectionRange) {
        this.$refs.textarea.setSelectionRange(0, 0);
      } else {
        this.$refs.textarea.focus();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/assets/scss/forms.scss';
@import '~bh/assets/scss/variables.scss';

.bh {
  &-textinput {
    @include textarea();

    background: none;
  }
}

.example-w-highlighted-text {
  background-color: white;
  border-radius: $form-components-border-radius;

  &-entity {
    @include form-component-typography();

    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    height: max-content !important;
    padding: .5rem;
    background: none;
    border-color: transparent;

    &-before,
    &-text {
      color: rgba(0, 0, 0, 0);
      white-space: pre-line;
    }

    &-text {
      border-radius: 4px;
      opacity: .5;
    }

    &-small {
      padding: .25rem;
      font-size: .75rem;
      line-height: .75rem;
    }

    &-medium {
      padding: .75rem;
      font-size: 1.25rem;
      line-height: 1.25rem;
    }

    &-large {
      padding: 1rem;
      font-size: 1.5rem;
      line-height: 1.5rem;
    }
  }

  &-input {
    position: inherit;
    z-index: 1;
  }
}
</style>
