<template>
  <b-taglist>
    <b-tag
      v-for="category in categories"
      :key="category.id">{{ category.name }}</b-tag>
  </b-taglist>
</template>

<script>
export default {
  name: 'RepositoryCategoriesList',
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
};
</script>
