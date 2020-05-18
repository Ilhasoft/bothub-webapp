<template>
  <div class="categories-list">
    <b-field class="categories-list__field">
      <b-autocomplete
        v-model="category"
        :keep-first="keepFirst"
        :open-on-focus="openOnFocus"
        :data="optionsCategories"
        :placeholder="$t('webapp.home.all_categories')"
        size="normal"
        @select="option => select(option)" />
    </b-field>
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
      keepFirst: true,
      openOnFocus: true,
      category: '',
      selected: null,
    };
  },
  computed: {
    filterCategories() {
      return this.allCategories.filter(option => option.name
        .toString()
        .toLowerCase()
        .indexOf(this.category.toLowerCase()) >= 0);
    },
    optionsCategories() {
      return this.filterCategories.map(option => option.name);
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
    category() {
      if (this.category === '') {
        this.val = 0;
      }
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
    select(option) {
      this.allCategories.filter((item) => {
        if (item.name === option) {
          this.selected = option;
          this.val = item.id;
        }
        return '';
      });
    },
  },
};
</script>

<style lang="scss">
.categories-list{
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  &__field{
    width: 12.5rem;
  }
}

</style>
