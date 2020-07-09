<template>
  <div>
    <div class="user-reports__filter">
      {{ $t('webapp.my_profile.reports.filter_by') }}
      <b-select
        v-model="filter"
        class="user-reports__select">
        <option
          v-for="(option, index) in options"
          :key="index"
          :value="option.value"> {{ option.label }} </option>
      </b-select>
    </div>
    <paginated-list
      v-if="list"
      :item-component="item"
      :per-page="perPage"
      :list="list"
      @updated="mock"/>
  </div>
</template>

<script>
import PaginatedList from '@/components/shared/PaginatedList';
import UserReportItem from '@/components/user/UserReportItem';
import { mapActions } from 'vuex';

export default {
  name: 'UserReportList',
  components: {
    PaginatedList,
  },
  data() {
    return {
      list: null,
      perPage: 10,
      query: {},
      item: UserReportItem,
      options: [
        { label: this.$t('webapp.my_profile.reports.today'), value: '' },
        { label: this.$t('webapp.my_profile.reports.this_week'), value: '' },
        { label: this.$t('webapp.my_profile.reports.this_month'), value: '' },
        { label: this.$t('webapp.my_profile.reports.last_three_months'), value: '' },
        { label: this.$t('webapp.my_profile.reports.all_time'), value: null },
      ],
      filter: null,
    };
  },
  async mounted() {
    this.list = await this.getUserReports({
      limit: this.perPage,
      query: this.query,
    });
  },
  methods: {
    ...mapActions([
      'getUserReports',
    ]),
    mock() {
      this.list.total = 10;
      this.list.items = new Array(10).fill(
        {
          repository: {
            name: 'Repository',
            owner: {
              nickname: 'user',
            },
            categories: [
              {
                icon: 'botinho',
                id: 2,
                name: 'Category 2',
              },
            ],
          },
          predictions: 80,
        },
      );
    },
  },
};
</script>

<style lang="scss" scoped>
  .user-reports {
    &__filter {
      display: flex;
      justify-content: end;
      align-items: center;
      margin-bottom: 1.875rem;
    }

    &__select {
      margin-left: 1rem;
    }
  }
</style>
