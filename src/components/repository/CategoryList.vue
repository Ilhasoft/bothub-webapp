<template>
  <div class="category-list">
    <category-item
      v-for="(category, index) in list"
      :key="index"
      :icon="category.icon"
      :title="category.display_name"/>
  </div>
</template>

<script>
import CategoryItem from '@/components/repository/CategoryItem';

export default {
  name: 'CategoryList',
  components: {
    CategoryItem,
  },
  props: {
    list: {
      type: Array,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
    .category-list {
        display: flex;
        flex-wrap: wrap;

        > * {
            margin: 0 0.6rem 0.6rem 0;
        }
    }
</style>
