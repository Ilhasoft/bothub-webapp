<template>
  <bh-input>
    <div :class="inputClassAttr">
      <div
        v-if="$slots.prepend"
        :class="`${className}__prepend`"
      >
        <div :class="`${className}__prepend__content`">
          <slot name="prepend" />
        </div>
      </div>
      <input
        id="autocomplete"
        ref="input"
        v-model="val"
        autocomplete="off"
        :class="`${className}__input`"
        v-bind="$attrs"
        type="text"
        @keydown.38="keyArrows('up')"
        @keydown.40="keyArrows('down')"
        @keydown.13="enterPressed()"
        @focus="onFocus()"
        @blur="onBlur()"
        @keyup.esc="onEsc()"
      >
      <slot name="append" />
    </div>
    <div
      v-if="autocompleteOpen"
      ref="dropdownAutocomplete"
      class="bh-autocomplete__list"
    >
      <button
        v-for="(item, i) in filteredData"
        :key="i"
        type="button"
        :class="{ 'bh-autocomplete__list__item__active': item === hovered,
                  'bh-autocomplete__list__item': true }"
        @click="select(item)"
        v-html="highlightVerboseItem(item)"
      />
    </div>
  </bh-input>
</template>

<script>
import BhText from './BhText';


const strTrueIndexOf = (a, b) => (a
  .toString()
  .toLowerCase()
  .indexOf(b.toLowerCase())
);

export default {
  name: 'BhAutocomplete',
  extends: BhText,
  props: {
    data: {
      type: Array,
      required: true,
    },
    verboseField: {
      type: String,
      default: null,
    },
    indexField: {
      type: String,
      default: null,
    },
    forceSelectFirst: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      className: 'bh-autocomplete',
      selected: null,
      focused: false,
      hovered: null,
      openOnFocus: Boolean,
      closeForced: false,
    };
  },
  computed: {
    filteredData() {
      return this.val
        ? this.data
          .filter(item => strTrueIndexOf(this.verboseItem(item), this.val) >= 0)
          .sort((a, b) => {
            const aIndexOf = strTrueIndexOf(this.verboseItem(a), this.val);
            const bIndexOf = strTrueIndexOf(this.verboseItem(b), this.val);
            return aIndexOf - bIndexOf;
          })
        : this.data;
    },
    autocompleteOpen() {
      if (this.closeForced) {
        return false;
      }

      if (this.filteredData.length === 0) {
        return false;
      }

      if (this.focused) {
        return true;
      }

      return false;
    },
  },
  watch: {
    selected(item) {
      if (item) {
        this.$emit('selected', this.indexItem(item));
      } else {
        this.$emit('selected', null);
      }
    },
    val() {
      this.closeForced = false;
    },
  },
  methods: {
    verboseItem(item) {
      return this.verboseField
        ? item[this.verboseField]
        : item;
    },
    highlightVerboseItem(item) {
      const regex = new RegExp(`(${this.val})`, 'gi');
      return this.verboseItem(item).replace(regex, '<b>$1</b>');
    },
    indexItem(item) {
      return this.indexField
        ? item[this.indexField]
        : item;
    },
    select(item) {
      if (item) {
        this.val = this.verboseItem(item);
        this.selected = item;
        this.setHovered(false);
      } else {
        this.val = '';
        this.selected = null;
        this.setHovered(false);
      }
    },
    enterPressed() {
      if (this.hovered === null) return;
      this.select(this.hovered);
    },
    finish() {
      if (this.forceSelectFirst) {
        if (this.val) {
          const firstItem = this.filteredData[0] || this.data[0];
          if (firstItem) {
            this.select(firstItem);
          }
        } else {
          this.select();
        }
      }
    },
    keyArrows(direction) {
      const sum = direction === 'down' ? 1 : -1;
      if (this.focused) {
        let index = this.data.indexOf(this.hovered) + sum;
        index = index > this.data.length - 1 ? this.data.length : index;
        index = index < 0 ? 0 : index;

        this.setHovered(this.data[index]);

        const list = document.querySelector('.bh-autocomplete__list');
        const element = list.querySelectorAll('.bh-autocomplete__list__item')[index];

        if (!element) return;

        const visMin = list.scrollTop;
        const visMax = list.scrollTop + list.clientHeight - element.clientHeight;

        if (element.offsetTop < visMin) {
          list.scrollTop = element.offsetTop;
          this.currentHeightlist = list.scrollTop;
        } else if (element.offsetTop >= visMax) {
          list.scrollTop = (
            element.offsetTop
                            - list.clientHeight
                            + element.clientHeight
          );
          this.currentHeightlist = list.scrollTop;
        }
      } else {
        this.focused = true;
      }
    },
    onFocus() {
      this.setFocused(true);
    },
    onBlur() {
      this.currentSelectedItemIndex = -1;
      this.finish();
      this.setFocused(false);
      this.setHovered(false);
    },
    onEsc() {
      this.currentSelectedItemIndex = -1;
      this.finish();
      this.forceClosed();
      this.setHovered(false);
    },
    setFocused(value) {
      setTimeout(() => {
        this.closeForced = false;
        this.focused = value;
      }, 200);
    },
    forceClosed() {
      this.closeForced = true;
    },
    setHovered(option) {
      if (option === undefined || false) return;

      this.hovered = option;
    },
  },
};
</script>

<style lang="scss">
@import '@scss/colors.scss';
@import '@scss/variables.scss';
@import '@scss/forms.scss';


.bh {
  &-autocomplete {
    @include text();

    &__list {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      z-index: $autocomplete-z-index;
      width: 100%;
      max-height: 150px;
      padding: .5rem 0;
      overflow: auto;
      background-color: white;
      border: solid 1px $color-grey;
      border-radius: 4px;

      &__item {
        display: block;
        width: 100%;
        padding: .5rem;
        font-size: 1rem;
        text-align: left;
        cursor: pointer;
        background-color: transparent;
        border: none;
        outline: none;

        &__active {
          color: white;
          background-color: $color-primary;
        }

        &:hover {
          color: white;
          background-color: $color-primary;
        }
      }
    }
  }
}
</style>
