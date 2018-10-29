<template>
  <div class="bh-grid bh-grid--inline">
    <div
      v-for="category in categories"
      :key="category.id"
      class="bh-grid__item">
      <bh-button
        :primary="val === category.id"
        @click="select(category.id)">{{ category.name }}</bh-button>
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
  },
  watch: {
    val(value) {
      this.$emit('input', value);
    },
  },
  async mounted() {
    const categoriesResponse = await this.getAllCategories();
    this.allCategories = categoriesResponse.data;
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
