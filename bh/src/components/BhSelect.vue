<template>
  <div class="bh-select">
    <select
      :disabled="disabled"
      :class="{
        'bh-select': true,
        'bh-select__disabled': disabled,
      }"
      @change="$emit('input', $event.target.value)"
    >
      <slot />
    </select>
  </div>
</template>

<script>
export default {
  name: 'BhSelect',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
@import '@scss/forms.scss';


.bh {
  &-select {
    @include select();
  }
}
</style>
