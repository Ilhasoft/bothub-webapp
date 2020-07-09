<template>
  <paginated-list
    v-if="list"
    :item-component="item"
    :per-page="perPage"
    :list="list"
    @updated="mock"/>
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

</style>
