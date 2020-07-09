<template>
  <div class="user-report-item level">
    <div class="level-left">
      <bh-icon
        :value="repository.categories[0].icon"
        class="user-report-item__category"
        size="large"/>
      <div>
        <p> {{ repository.name || '' }} </p>
        <p> {{ repository.owner.nickname || '' }} </p>
      </div>
    </div>
    <div class="level-right">
      <b-button type="is-primary"> {{ predictions }} </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserReportItem',
  props: {
    repository: {
      type: Object,
      default: null,
    },
    predictions: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';

.user-report-item {
    &__category {
        background-color: $color-primary;
        color: $color-white
    }
}

</style>
