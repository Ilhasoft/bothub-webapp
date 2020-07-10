<template>
  <div>
    <div
      v-show="list && !list.empty"
      class="user-reports__filter">
      <b-select
        :disabled="list && list.loading"
        v-model="filter"
        class="user-reports__select">
        <option
          v-for="(option, index) in options"
          :key="index"
          :value="option.value"> {{ option.label }} </option>
      </b-select>
      {{ $t('webapp.my_profile.reports.filter_by') }}
    </div>
    <user-report-item
      :repository="total.repository"
      :predictions="total.predictions"
      :time="time.label"/>
    <paginated-list
      v-if="list"
      :item-component="item"
      :per-page="perPage"
      :list="list"
      :empty-message="$t('webapp.my_profile.reports.no_reports')"
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
    UserReportItem,
  },
  data() {
    return {
      list: null,
      perPage: 10,
      query: {},
      item: UserReportItem,
      options: [
        { label: this.$t('webapp.my_profile.reports.today'), value: 'today' },
        { label: this.$t('webapp.my_profile.reports.this_week'), value: 'this_week' },
        { label: this.$t('webapp.my_profile.reports.this_month'), value: 'this_month' },
        { label: this.$t('webapp.my_profile.reports.last_three_months'), value: 'last_three' },
        { label: this.$t('webapp.my_profile.reports.all_time'), value: null, selected: true },
      ],
      filter: null,
      total: {
        repository: {
          name: this.$t('webapp.my_profile.reports.total'),
        },
        predictions: 800,
      },
    };
  },
  computed: {
    time() {
      return this.options.find(option => option.value === this.filter);
    },
  },
  watch: {
    filter() {
      this.getList();
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    ...mapActions([
      'getUserReports',
    ]),
    async getList() {
      this.list = await this.getUserReports({
        limit: this.perPage,
        query: this.query,
      });
    },
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
      flex-direction: row-reverse;
      align-items: center;
      margin-bottom: 1.875rem;
    }

    &__select {
      margin-left: 1rem;
    }
  }
</style>
