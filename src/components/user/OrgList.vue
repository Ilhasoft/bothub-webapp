<template>
  <paginated-list
    :list="list"
    :item-component="item"
    :per-page="perPage"
    class="org-list"
    @updated="mock"/>
</template>

<script>
import PaginatedList from '@/components/shared/PaginatedList';
import OrgListItem from '@/components/user/OrgListItem';
import utils from '@/api/utils';

export default {
  name: 'OrgList',
  components: {
    PaginatedList,
  },
  data() {
    return {
      item: OrgListItem,
      list: null,
      perPage: 10,
    };
  },
  mounted() {
    this.list = new utils.Page('');
  },
  methods: {
    mock() {
      this.list.items = Array(this.perPage).fill(null);
      this.list.items = this.list.items.map((_, index) => ({
        name: `Org ${index + 1}`,
        owner: {
          nickname: 'User',
        },
        member_count: 50,
        repository_count: 100,
        created_at: '2020-06-12T18:02:29.743854Z',
      }));
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/variables.scss';
    .org-list {
        display: flex;
        flex-wrap: wrap;

        @media screen and (max-width: $mobile-width) {
            margin: 0 1rem 0 1rem;
        }

        @media screen and (max-width: $small-mobile-width) {
            margin: 0 1rem 0 1rem;
        }
    }
</style>
