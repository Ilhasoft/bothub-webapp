<template>
  <div
    class="category-item">
    <p> {{ title }} </p>
    <bh-icon
      :class="{selected}"
      :value="icon"
      size="large"/>
  </div>
</template>

<script>
export default {
  name: 'CategoryItem',
  props: {
    icon: {
      type: String,
      default: 'botinho',
    },
    value: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: '',
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
    .category-item {
        border-radius: 10px;
        background-color: white;
        width: 7rem;

        &__selected {
          border: 2px black solid;
        }
    }
</style>
