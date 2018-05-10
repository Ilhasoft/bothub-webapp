<template>
  <div class="highlighted">
    <div
      v-for="(entity, i) in entitiesBlocks"
      :key="i"
      class="highlighted-item">
        <span class="highlighted-item-before">{{ entity.before }}</span>
        <span :class="`highlighted-item-text ${entity.colorClass}`">{{ entity.text }}</span>
      </div>
    <input
      ref="input"
      type="text"
      class="input"
      v-model="out"
      @select="emitSelected()"
      @click="emitSelected()"
      @keyup="emitSelected()" />
  </div>
</template>

<script>
import { getEntityColor } from '@/utils/entitiesColors';

export default {
  name: 'EntityTextHighlightedInput',
  props: {
    value: {
      type: String,
    },
    initialData: {
      type: String,
    },
    entities: {
      type: Array,
      default: () => ([]),
    },
  },
  watch: {
    out() {
      this.$emit('input', this.out);
    },
  },
  data() {
    return {
      out: this.value || this.initialData || '',
      selectionStart: 0,
      selectionEnd: 0,
    };
  },
  computed: {
    entitiesBlocks() {
      return this.entities
        .map(({ start, end, entity }) => {
          const color = getEntityColor(entity, this.entities);
          const colorClass = `entity-${color}`;
          const before = this.out.substring(0, start);
          const text = this.out.substring(start, end);
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
          before: this.out.substring(0, this.selectionStart),
          text: this.out.substring(this.selectionStart, this.selectionEnd),
        }]);
    },
  },
  methods: {
    emitSelected() {
      const { selectionStart, selectionEnd } = this.$refs.input;
      this.selectionStart = selectionStart;
      this.selectionEnd = selectionEnd;
      this.$emit(
        'selected',
        selectionStart === selectionEnd ?
          { start: 0, end: 0 } :
          { start: selectionStart, end: selectionEnd });
    },
  },
};
</script>

<style lang="scss" scoped>
.highlighted {
  position: relative;
  background: #ffffff;
  border-radius: 3px;
  overflow: hidden;

  input {
    background: none;
  }

  &-item {
    position: absolute;
    display: flex;
    align-items: center;
    padding: 0 0.625em;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;

    &-before,
    &-text {
      color: rgba(0, 0, 0, 0);
      white-space: pre;
    }

    &-text {
      opacity: .5;
      border-radius: 4px;
    }
  }
}
</style>
