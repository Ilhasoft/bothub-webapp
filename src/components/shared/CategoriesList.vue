<template>
  <div>
    <div class="bh-grid categories-list">
      <div class="bh-grid__item bh-grid__item--nested text-right">
        <bh-dropdown
          :title="dropdownTitle"
          full-width
          position="bottom-left">
          <bh-dropdown-item
            v-for="category in categories"
            :key="category.id"
            @click="select(category.id)">{{ category.name }}</bh-dropdown-item>
        </bh-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';


export default {
  name: 'CategoriesList',
  data() {
    return {
      val: 0,
      allCategories: [],
    };
  },
  computed: {
    categories() {
      return [{ id: 0, name: 'All categories', active: this.current === 0 }]
        .concat(this.allCategories);
    },
    dropdownTitle() {
      return this.categories.reduce((current, category) => (
        this.val > 0 && category.id === this.val
          ? category.name
          : current), this.categories[0].name);
    },
    queryCategoryId() {
      return this.$route.query.category
        ? parseInt(this.$route.query.category || 0, 10)
        : 0;
    },
  },
  watch: {
    val(value) {
      this.$emit('input', value);
    },
    $route() {
      this.val = this.queryCategoryId;
    },
  },
  async mounted() {
    const categoriesResponse = await this.getAllCategories();
    this.allCategories = categoriesResponse.data;
    this.val = this.queryCategoryId;
  },
  methods: {
    ...mapActions([
      'getAllCategories',
    ]),
    select(id) {
      this.val = id;
    },
  },
};
</script>

<style lang="scss">
.categories-list{
  margin-top: 1rem;
}
</style>
