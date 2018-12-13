<template>
  <div
    :class="{
      'bh-dropdown': true,
      [`bh-dropdown--${position}`]: !!position && $slots.trigger,
    }"
  >
    <div
      ref="openDropdown"
      @click="openDropdown()"
    >
      <slot
        v-if="this.$slots.trigger"
        name="trigger"
      />
      <div
        v-else
        class="bh-grid bh-grid--row bh-dropdown__default clickable"
      >
        <span class="bh-grid__item bh-dropdown__default__title">{{ title }}</span>
        <bh-icon
          class="bh-grid__item text-color-grey-dark bh-dropdown__default__icon"
          value="menu-down"
        />
      </div>
    </div>
    <div
      v-show="open"
      ref="dropdown"
      :tabindex="_uid"
      :class="{
        'bh-dropdown__content': true,
        'bh-dropdown__content--slot': $slots.trigger,
      }"
      @click="closeDropdown()"
      @blur="closeDropdown()"
    > <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BhDropdown',
  props: {
    position: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      open: false,
    };
  },
  watch: {
    open(value) {
      if (value) {
        this.$nextTick(() => {
          this.$refs.dropdown.focus();
        });
      }
    },
  },
  methods: {
    openDropdown() {
      this.open = true;
    },
    closeDropdown() {
      this.open = false;
    },
  },
};
</script>

<style lang="scss">
@import '@scss/variables.scss';
@import '@scss/colors.scss';


.bh {
  &-dropdown {
    $parent: &;

    position: relative;
    display: inline-block;

    &__default {
      width: 100%;
      padding: .75rem 1rem;
      background-color: $color-white;
      border: 1px solid #D5D5D5;
      border-radius: .5rem;

      &__title {
       align-self: center;
      }

      &__icon {
        align-self: center;
      }
    }

    &__content {
      position: absolute;
      left: 0;
      z-index: $dropdown-z-index;
      width: 100%;
      min-width: calc(100% + 2rem);
      padding: .5rem 0;
      background-color: white;
      border-radius: 4px;
      outline: none;
      box-shadow: 2px 2px 6px rgba(0, 0, 0, .5);

      &--slot {
        top: 50%;
        left: 50%;
        width: max-content;
      }
    }

    &--left {
      #{$parent}__content {
        transform: translate(-100%);
      }
    }
  }
}
</style>
