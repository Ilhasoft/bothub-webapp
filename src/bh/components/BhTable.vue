<template>
  <table class="bh-table">
    <slot/>
  </table>
</template>

<script>
export default {
  name: 'BhTable',
};
</script>

<style lang="scss" scopped>
@import '~bh/assets/scss/colors.scss';


  .bh-table {
    $borderTableSize: 1px;
    width: 100%;
    border-collapse: separate;
    border: solid $color-grey $borderTableSize;
    border-radius: 1rem;

    td, th {
      width: 50%;
      padding: 1rem;
      border-top: solid $color-grey $borderTableSize;
      border-left: solid $color-grey $borderTableSize;
    }

    th {
      border-top: none;
    }

    td:first-child, th:first-child {
      border-left: none;
    }
  }
</style>
