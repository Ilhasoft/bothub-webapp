<template>
  <div class="field">
    <div class="example-txt-w-highlighted-entities">
      <div class="example-txt-w-highlighted-entities__input-wrapper">
        <div class="field">
          <div class="control has-icons-right">
            <input
              ref="input"
              v-model="val"
              :placeholder="$t('webapp.trainings.add_a_sentence')"
              class="input"
              @select.stop.prevent="emitTextSelected"
              @keyup.enter="submit()"
            >
            <span class="icon is-right example-txt-w-highlighted-entities__append">
              <slot name="append" />
            </span>
          </div>
        </div>
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
      </div>
    </div>
  </div>
</template>

<script>
import Flag from '@/components/shared/Flag';
import { getEntityColor } from '@/utils/entitiesColors';

const components = {
  Flag,
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

  &__append {
    pointer-events: all !important;
    width: 5.2rem !important;
  }

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
    left: 3px;
    z-index: 0;
    height: max-content !important;
    padding: .5rem;
    background: none;
    border-color: transparent;
    pointer-events: none;

    &__before,
    &__text {
      color: rgba(0, 0, 0, 0);
      white-space: pre-line;
      pointer-events: none;
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
