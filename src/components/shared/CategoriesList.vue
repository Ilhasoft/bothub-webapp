<template>
  <div>
    <div class="bh-grid bh-grid--inline hide-mobile">
      <div
        v-for="category in categories"
        :key="category.id"
        class="bh-grid__item">
        <bh-button
          :primary="val === category.id"
          @click="select(category.id)">{{ category.name }}</bh-button>
      </div>
    </div>
    <div class="hide-desktop">
      <div class="bh-grid">
        <div class="bh-grid__item">
          <bh-dropdown>
            <bh-button
              slot="trigger"
              primary>
              <span>{{ selectedCategoryName }}</span>
              <bh-icon value="menu-down" />
            </bh-button>
            <bh-dropdown-item
              v-for="category in categories"
              :key="category.id"
              @click="select(category.id)">{{ category.name }}</bh-dropdown-item>
          </bh-dropdown>
        </div>
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
      return [{ id: 0, name: 'All', active: this.current === 0 }]
        .concat(this.allCategories);
    },
    selectedCategoryName() {
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
