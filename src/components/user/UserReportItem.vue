<template>
  <div
    v-if="repository"
    class="user-report-item level">
    <div class="level-left">
      <div class="user-report-item__category__container">
        <bh-icon
          :value="repository.categories[0].icon"
          class="user-report-item__category"
          size="large"/>
      </div>
      <div>
        <p class="user-report-item__name"> {{ repository.name || '' }} </p>
        <p class="user-report-item__user"> {{ $t('webapp.my_profile.reports.created_by') }}
        <a> {{ repository.owner.nickname || '' }} </a> </p>
      </div>
    </div>
    <div class="level-right">
      <b-button type="is-primary"> {{ $tc('webapp.my_profile.reports.predictions', predictions) }} </b-button>
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
  background-color: $color-white;
  border-radius: 10px;
  box-shadow: 0px 3px 6px #00000029;
  padding: 1.25rem 1.875rem;

    &__category {

        &__container {
          background-color: $color-primary;
          color: $color-white;
          border-radius: 50%;
          padding: 1rem;
          margin-right: 1.125rem;
          max-width: 4rem;
          max-height: 4rem;
        }
    }

    &__name {
      font-size: 1.25rem;
      font-weight: bold;
      margin: 0;
    }

    &__user {
      font-size: 0.875rem;
      margin: 0;
    }
}

</style>
