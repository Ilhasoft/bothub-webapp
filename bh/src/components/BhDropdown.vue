<template>
  <div
    :class="{
      'bh-dropdown': true,
      [`bh-dropdown--${position}`]: !!position,
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
        class="bh-dropdown__default clickable"
      >
        <span class="bh-dropdown__default__title">{{ title }}</span>
        <bh-icon
          class="text-color-grey-dark bh-dropdown__default__icon"
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
        'bh-dropdown__content--full-width' : fullWidth,
        }"
      @click="closeDropdown()"
      @blur="closeDropdown()"
    ><slot /></div>
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
    fullWidth: {
      type: Boolean,
      default: false,
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
        float: left;
        margin-right: 1rem;
      }

      &__icon {
        margin: 2px;
      }
    }

    &__content {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: $dropdown-z-index;
      width: max-content;
      min-width: 100px;
      padding: .5rem 0;
      background-color: white;
      border-radius: 4px;
      outline: none;
      box-shadow: 2px 2px 6px rgba(0, 0, 0, .5);

      &--full-width {
        width: 100%;
      }
    }

    &--right-top {
      #{$parent}__content {
        top: 0;
        left: 0;
      }
    }

    &--right-bottom {
      #{$parent}__content {
        top:100%;
        left: 0;
      }
    }

    &--left {
      #{$parent}__content {
        transform: translate(-100%);
      }
    }

    &--left-bottom {
      #{$parent}__content {
        top:100%;
        left:100%;
        transform: translate(-100%);
      }
    }

    &--left-top {
      #{$parent}__content {
        top:0;
        left:100%;
        transform: translate(-100%);
      }
    }
  }
}
</style>
