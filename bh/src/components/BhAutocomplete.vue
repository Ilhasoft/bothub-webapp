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
        @keydown.40="keyDownPressed()"
        @focus="onFocus()"
        @blur="onBlur()"
        @keyup.esc="onEsc()"
      >
      <slot name="append" />
    </div>
    <div
      v-if="autocompleteOpen"
      class="bh-autocomplete__list"
    >
      <button
        v-for="(item, i) in filteredData"
        :key="i"
        type="button"
        class="bh-autocomplete__list__item"
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
      closeForced: false,
      currentSelectedItemIndex: -1,
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
    itensList() {
      return document.getElementsByClassName('bh-autocomplete__list__item');
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
    currentSelectedItemIndex(currentValue, previusValue) {
      // console.log(previusValue, 'previus');
      // console.log(currentValue, 'current');
      // console.log(this.itensList);

      if (currentValue !== -1 && currentValue < this.itensList.length) {
        this.itensList[currentValue].classList.add('bh-autocomplete__list__item__active');
        console.log(this.itensList[currentValue]);

        // document.addEventListener('keydown', (e) => {
        //   if (e.keyCode === 13) {
        //     console.log(e.target);
        //   }
        // });
      }

      if (previusValue !== -1 && previusValue >= 0) {
        this.itensList[previusValue].style.color = 'black';
        this.itensList[previusValue].style.backgroundColor = 'transparent';
      }
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
      return this.verboseItem(item).replace(regex, '<strong>$1</strong>');
    },
    indexItem(item) {
      return this.indexField
        ? item[this.indexField]
        : item;
    },
    select(item) {
      console.log(item);

      if (item) {
        this.val = this.verboseItem(item);
        this.selected = item;
      } else {
        this.val = '';
        this.selected = null;
      }
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
    keyDownPressed() {
      if (this.currentSelectedItemIndex < this.itensList.length - 1) {
        this.currentSelectedItemIndex = this.currentSelectedItemIndex + 1;
      }
    },
    onFocus() {
      this.setFocused(true);
    },
    onBlur() {
      this.currentSelectedItemIndex = -1;
      this.finish();
      this.setFocused(false);
    },
    onEsc() {
      this.currentSelectedItemIndex = -1;
      this.finish();
      this.forceClosed();
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
