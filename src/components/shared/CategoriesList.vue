<template>
  <ul>
    <li
      v-for="category in categories"
      :key="category.id"
      :class="{ active: category.active }">{{ category.name }}</li>
  </ul>
</template>

<script>
export default {
  name: 'CategoriesList',
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/utilities.scss';

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  li {
    margin: 3px;
    color: #000;
    font-size: 14px;
    border: 1px solid #EAE7E6;
    text-decoration: none;
    padding: 16px 24px;
    border-radius: 5px;
    background-color: transparent;
    cursor: pointer;
    transition: color .2s ease, background-color .2s ease;

    &:hover,
    &.active {
      border-color: $primary;
      background-color: $primary;
      color: $primary-invert;
    }

    &.active {
      font-weight: bold;
    }
  }
}
</style>
