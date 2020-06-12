<template>
  <div class="category-list">
    <category-item
      v-for="category in categoryList"
      :selected="selectedCategories[category.value]"
      :key="category.value"
      :icon="category.icon"
      :title="category.display_name"
      @click.native="select(category)"/>
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
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedCategories: {},
    };
  },
  computed: {
    categoryList() {
      return this.list.map(category => ({
        ...category,
        icon: category.display_name.toLowerCase(),
      }));
    },
  },
  methods: {
    select(category) {
      if (this.selectedCategories[category.value]) {
        this.selectedCategories[category.value] = !this.selectedCategories[category.value];
      } else {
        this.$set(this.selectedCategories, category.value, true);
      }
      this.$emit('input', this.categoryList.filter(listCategory => this.selectedCategories[listCategory.value]));
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
