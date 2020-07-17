<template>
  <paginated-list
    :list="list"
    :item-component="item"
    :per-page="perPage"
    class="org-list"/>
</template>

<script>
import PaginatedList from '@/components/shared/PaginatedList';
import OrgListItem from '@/components/user/OrgListItem';
import { mapActions } from 'vuex';

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
    this.loadOrgs();
  },
  methods: {
    ...mapActions([
      'getAllOrgs',
    ]),
    async loadOrgs() {
      this.list = await this.getAllOrgs();
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
