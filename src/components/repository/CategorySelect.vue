<template>
  <div>
    <loading v-if="loading" />
    <div
      v-else
      class="category-select">
      <category-item
        v-for="category in list"
        ref="items"
        :selected="selectedCategories[category.id]"
        :key="category.id"
        :icon="category.icon"
        :title="category.name"
        @click.native="select(category)"/>
    </div>
  </div>
</template>

<script>
import CategoryItem from '@/components/repository/CategoryItem';
import Loading from '@/components/shared/Loading';
import { mapActions } from 'vuex';

export default {
  name: 'CategorySelect',
  components: {
    CategoryItem,
    Loading,
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      list: [],
      selectedCategories: {},
      loading: false,
    };
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    ...mapActions([
      'getAllCategories',
    ]),
    async getCategories() {
      this.loading = true;
      try {
        const { data } = await this.getAllCategories();
        const otherCategory = data.sort((previous, next) => previous.id - next.id);
        this.list = otherCategory;
      } catch (error) {
        this.$buefy.toast.open({
          message: error,
          type: 'is-danger',
        });
      } finally {
        this.loading = false;
      }
    },
    select(category) {
      if (this.selectedCategories[category.id]) {
        this.selectedCategories[category.id] = !this.selectedCategories[category.id];
      } else {
        this.$set(this.selectedCategories, category.id, true);
      }
      this.$emit('input', this.list.filter(listCategory => this.selectedCategories[listCategory.id]));
    },
  },
};
</script>

<style lang="scss" scoped>
    .category-select {
        display: flex;
        flex-wrap: wrap;

        > * {
            margin: 0 0.6rem 0.6rem 0;
        }
    }
</style>
