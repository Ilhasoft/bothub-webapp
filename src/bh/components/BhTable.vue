<template>
  <div class="bh bh-grid">
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
<style lang="scss">
@import '~bh/assets/scss/colors.scss';


.bh {

  &-table {
    border-collapse:separate;
    border: solid rgb(19, 9, 9) 1px;
    border-radius: 1rem;

    th, td {
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius:1rem;
    }
  }
}

</style>
