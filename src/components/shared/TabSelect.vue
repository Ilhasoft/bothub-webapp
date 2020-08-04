<template>
  <div class="tabs">
    <div
      v-for="(item, index) in filteredOptions"
      :key="index"
      :class="{'tabs__item': true,
               'tabs__item__selected': selected === item.value}"
      @click="selected = item.value"> {{ item.label }} </div>
  </div>
</template>

<script>
export default {
  name: 'TabSelect',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    initialSelected: {
      type: null,
      default: null,
    },
  },
  data() {
    return {
      selected: null,
    };
  },
  computed: {
    filteredOptions() {
      return this.options.filter(option => !option.hide);
    },
  },
  watch: {
    selected() {
      this.$emit('update:selected', this.selected);
    },
  },
  mounted() {
    this.selected = this.initialSelected
    || (this.filteredOptions.length > 0 ? this.filteredOptions[0].value : null);
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variables.scss';
@import '~@/assets/scss/colors.scss';

$shadow-color: #00000029;

.tabs {
    display: flex;
    margin: auto;
    justify-content: center;

    > * {
        margin-right: 1.313rem;

        @media screen and (max-width: $mobile-width) {
          margin-right: 0.4rem;
        }

      &:last-child {
        margin-right: 0;
      }
    }

    &__item {
        padding: 0.8rem 2.5rem;
        @media screen and (max-width: $mobile-width) {
          padding: 0.8rem 1.2rem;
        }
        background-color: $color-fake-white;
        box-shadow: inset 0 -5px 3px -5px lighten($shadow-color, 10%),
                    0px 3px 6px $shadow-color;
        cursor: pointer;

        &__selected {
            background-color: $color-primary;
            color: $color-white;
          }
        }
    }
</style>
