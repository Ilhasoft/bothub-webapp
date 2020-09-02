<template>
  <div>
    <div
      v-show="list"
      class="user-reports__filter">
      <b-select
        :disabled="list && list.loading"
        v-model="filter"
        class="user-reports__select">
        <option
          v-for="(option, index) in options"
          :key="index"
          :value="option"> {{ option.label }} </option>
      </b-select>
      {{ $t('webapp.my_profile.reports.filter_by') }}
    </div>
    <user-report-item
      :name="total.repository.name"
      :total_count="total.predictions"
      :time="filter.label"/>
    <paginated-list
      v-if="list"
      :item-component="item"
      :per-page="perPage"
      :list="list"
      :empty-message="$t('webapp.my_profile.reports.no_reports')" />
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
  props: {
    orgNickname: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      list: null,
      perPage: 10,
      item: UserReportItem,
      options: [
        { label: this.$t('webapp.my_profile.reports.today'), value: 0 },
        { label: this.$t('webapp.my_profile.reports.this_week'), value: 7 },
        { label: this.$t('webapp.my_profile.reports.this_month'), value: 30 },
        { label: this.$t('webapp.my_profile.reports.last_three_months'), value: 90 },
      ],
      filter: { label: '', value: 0 },
      total: {
        repository: {
          name: this.$t('webapp.my_profile.reports.total'),
        },
        predictions: null,
      },
    };
  },
  computed: {
    timeFrame() {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - this.filter.value);
      return {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
      };
    },
  },
  watch: {
    async filter() {
      this.list = await this.getList();
    },
    async list() {
      this.total.predictions = null;
      const list = await this.getList();
      const predictions = await list.getAllItems();
      this.total.predictions = predictions.reduce(
        (count, prediction) => count + prediction.total_count,
        0,
      );
    },
  },
  mounted() {
    const [filter] = this.options;
    this.filter = filter;
  },
  methods: {
    ...mapActions([
      'getUserReports',
      'getOrgReports',
    ]),
    async getList() {
      let list = null;
      if (this.orgNickname) {
        list = await this.getOrgReports({
          orgNickname: this.orgNickname,
          limit: this.perPage,
          ...this.timeFrame,
        });
      } else {
        list = await this.getUserReports({
          limit: this.perPage,
          ...this.timeFrame,
        });
      }
      return list;
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
