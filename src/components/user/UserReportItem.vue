<template>
  <div
    class="user-report-item level is-mobile">
    <div class="level-left user-report-item__info">
      <div
        v-if="categories && categories.length > 0"
        class="user-report-item__category__container">
        <custom-icon
          :value="repository.categories[0].icon"
          class="user-report-item__category"
          size="large"/>
      </div>
      <div>
        <p class="user-report-item__name"> {{ name || '' }} </p>
        <p
          v-if="owner"
          class="user-report-item__user"> {{ $t('webapp.my_profile.reports.created_by') }}
        <a> {{ owner.nickname || '' }} </a> </p>
        <p
          v-if="time"
          class="user-report-item__user"> {{ time }} </p>
      </div>
    </div>
    <div class="level-right">
      <loading v-if="total_count == null" />
      <strong v-else>
        {{ $tc('webapp.my_profile.reports.predictions', total_count) }}
      </strong>
    </div>
  </div>
</template>

<script>
import CustomIcon from '@/components/shared/CustomIcon';
import Loading from '@/components/shared/Loading';

export default {
  name: 'UserReportItem',
  components: { CustomIcon, Loading },
  props: {
    name: {
      type: String,
      default: '',
    },
    owner: {
      type: Object,
      default: null,
    },
    categories: {
      type: Array,
      default: () => [],
    },
    total_count: {
      type: Number,
      default: null,
    },
    time: {
      type: String,
      default: null,
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
  padding: 0.75rem 1.875rem 0.75rem 1.875rem;
  min-height: 5rem;
  flex-wrap: wrap;

  &__info {
    margin: 0 1rem 0 0;
  }

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

    &__button {
      margin: 0.5rem 0 0 0;
      padding: 0 1.8rem;
      border-radius: 50px;
    }
}

</style>
