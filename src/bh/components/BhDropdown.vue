<template>
  <div class="bh-dropdown">
    <div @click="openDropdown()">
      <slot name="trigger" />
    </div>
    <div
      v-show="open"
      ref="dropdown"
      :tabindex="_uid"
      @click="closeDropdown()"
      @blur="closeDropdown()"
      class="bh-dropdown__content"><slot /></div>
  </div>
</template>

<script>
export default {
  name: 'BhDropdown',
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
@import '~bh/assets/scss/variables.scss';

.bh {
  &-dropdown {
    position: relative;

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
    }
  }
}
</style>
