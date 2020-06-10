<template>
  <div class="category-item">
    <p> {{ title }} </p>
    <bh-icon-button
      :value="repositoryIcon"
      size="extra-large"/>
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
    title: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
    .category-item {
        border-radius: 10px;
        background-color: white;
        width: 7rem;
    }
</style>
