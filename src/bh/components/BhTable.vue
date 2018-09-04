<template>
  <div class="bh-grid">
    <table class="bh-grid__item bh-table">
      <slot/>
    </table>
  </div>
</template>
<script>
export default {
  name: 'BhTable',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style lang="scss" scopped>
@import '~bh/assets/scss/colors.scss';

  .bh-table {
    overflow: hidden;
    border-collapse: separate;
    border: solid $color-grey 1px;
    border-radius: 1rem;


    th {
    padding: 1rem;
    border-right: solid $color-grey 1px;

    }

    td {
    padding: 1rem;
    border-top: solid $color-grey 1px;
    border-right: solid $color-grey 1px;
    }

  }

</style>
