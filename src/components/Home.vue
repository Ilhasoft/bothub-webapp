<template>
  <layout>
    <header>
      <h1 class="title has-text-white has-text-centered">Robot Society</h1>
      <h2 class="subtitle has-text-white has-text-weight-light has-text-centered">TRAIN YOURS!</h2>
    </header>
    <div class="container"><search-bar /></div>
    <div class="wrapper">
      <categories-list :categories="categories" />
    </div>
  </layout>
</template>

<script>
import Layout from '@/components/shared/Layout';
import SearchBar from '@/components/shared/SearchBar';
import CategoriesList from '@/components/shared/CategoriesList';

const components = {
  Layout,
  SearchBar,
  CategoriesList,
};

export default {
  name: 'Home',
  components,
  data() {
    return {
      categories: [
        { id: 0, name: 'All', active: true },
        { id: 1, name: 'BI' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
header {
  margin-bottom: 3rem;
  padding: 0 8px;
}

.wrapper {
  margin-top: -25px;
  background-color: #f8f8f8;
  min-height: 200px;
  padding: 36px 8px 8px;
}
</style>
