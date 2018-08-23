<template>
  <div
    class="bh-dropdown-item"
    @click="$emit('click', $event)">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BhDropdownItem',
};
</script>

<style lang="scss">
@import '~bh/assets/scss/colors.scss';


.bh {
  &-dropdown-item {
    display: flex;
    padding: .5rem .75rem;
    cursor: pointer;

    &:hover {
      color: $color-primary;
      background-color: $color-lighter-grey;
    }

    & > * {
      margin-right: 8px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
