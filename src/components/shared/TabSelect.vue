<template>
  <div class="tabs">
    <div
      v-for="(tab, index) in options"
      :key="index"
      :class="{'tabs__item': true,
               'tabs__item__selected': indexSelected === index}"
      @click="indexSelected = index"> {{ tab }} </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    selected: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      indexSelected: null,
    };
  },
  watch: {
    indexSelected() {
      this.$emit('update:selected', this.indexSelected);
    },
  },
  mounted() {
    this.indexSelected = this.selected;
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
        box-shadow: 5px 0 5px -5px $shadow-color,
                    -5px 0 5px -5px $shadow-color,
                    inset 0 -5px 5px -5px $shadow-color;
        cursor: pointer;

        &__selected {
            background-color: $color-primary;
            color: $color-white;
            }
        }
    }
</style>
