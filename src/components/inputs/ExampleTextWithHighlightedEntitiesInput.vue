<template>
  <div class="field">
    <div class="example-txt-w-highlighted-entities">
      <div class="example-txt-w-highlighted-entities__input-wrapper">
        <div class="field">
          <div class="control has-icons-right is-family-primary">
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
            <self-adjust-input
              ref="input"
              :placeholder="$t('webapp.trainings.add_a_sentence')"
              v-model="val"
              transparent
              @select="emitTextSelected"
              @click.stop.prevent="emitTextSelected"
              @keyup.stop.prevent="emitTextSelected"
              @keyup.enter="submit()">
              <span
                v-if="hasAppend"
                slot="append">
                <slot name="append" />
              </span>
            </self-adjust-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelfAdjustInput from '@/components/inputs/SelfAdjustInput';
import { getEntityColor } from '@/utils/entitiesColors';

const components = {
  SelfAdjustInput,
};

export default {
  name: 'ExampleTextWithHighlightedEntitiesInput',
  components,
  props: {
    value: {
      type: String,
      default: '',
    },
    entities: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      val: this.value,
      selectionStart: 0,
      selectionEnd: 0,
    };
  },
  computed: {
    hasAppend() {
      return this.$slots.append;
    },
    entityClassAttr() {
      const classes = ['example-txt-w-highlighted-entities__entity'];

      if (this.size) {
        classes.push(`example-txt-w-highlighted-entities__entity--${this.size}`);
      }

      if (this.hasAppend) {
        classes.push('example-txt-w-highlighted-entities__entity__with-append');
      }

      return classes;
    },
    entitiesBlocks() {
      return this.entities
        .map(({ start, end, entity }) => {
          const color = getEntityColor(
            entity,
          );
          const colorClass = `entity-${color}`;
          const before = this.value.substring(0, start);
          const text = this.value.substring(start, end);
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
          before: this.value.substring(0, this.selectionStart),
          text: this.value.substring(this.selectionStart, this.selectionEnd),
        }]);
    },
  },
  watch: {
    val() {
      this.$emit('input', this.val);
    },
    value() {
      this.val = this.value;
    },
  },
  methods: {
    submit() {
      this.$emit('submit');
    },
    emitTextSelected(event) {
      const { value, selectionStart, selectionEnd } = event.target;
      const selected = value.slice(selectionStart, selectionEnd);

      const startPadding = selected.search(/\S|$/);
      const endPadding = selected.length - selected.trim().length - startPadding;

      this.selectionStart = selectionStart + startPadding;
      this.selectionEnd = selectionEnd - endPadding;

      this.$emit(
        'textSelected',
        this.selectionStart === this.selectionEnd
          ? null
          : { start: this.selectionStart, end: this.selectionEnd },
      );
    },
    clearSelected() {
      this.$nextTick(() => {
        this.$refs.input.deselect();
        this.$refs.input.inputAction('blur');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variables.scss';

.example-txt-w-highlighted-entities {

  &__append {
    pointer-events: all !important;
    width: $form-append-width !important;
  }

  &__input-wrapper {
    position: relative;
    background-color: white;
  }

  &__input {
    position: inherit;
    z-index: 1;
  }

  &__entity {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    height: max-content !important;
    word-wrap: break-word;
    padding: 0.3rem 0.9rem;
    line-height: 1.5;
    max-width: 100%;
    background: none;
    border: 1px solid transparent;
    pointer-events: none;

    &__with-append {
      padding: 0.3rem 4rem 0.3rem 0.9rem;
    }

    &__before,
    &__text {
      color: transparent;
      max-width: 100%;
      white-space: pre-line;
      pointer-events: none;
    }

    &__text {
      border-radius: 4px;
      opacity: .5;
    }
  }
}
</style>
