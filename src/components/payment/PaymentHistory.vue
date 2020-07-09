<template>
  <paginated-list
    v-if="list"
    :list="list"
    :item-component="item"
    :empty-message="$t('webapp.my_profile.payment.no_payments')"
    @updated="mock"/>
</template>

<script>
import PaginatedList from '@/components/shared/PaginatedList';
import PaymentHistoryItem from '@/components/payment/PaymentHistoryItem';
import { mapActions } from 'vuex';

export default {
  name: 'PaymentHistory',
  components: {
    PaginatedList,
  },
  props: {
    perPage: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      list: null,
      item: PaymentHistoryItem,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    ...mapActions([
      'getPaymentHistory',
    ]),
    async getList() {
      this.list = await this.getPaymentHistory();
    },
    mock() {
      this.list.total = 4;
      this.list.items = [
        {
          period: 'June/2020',
          current: true,
          total: 1200,
          currency: '$',
          paid: true,
          values: [
            {
              repository: 'Repo1',
              value: 700,
            },
            {
              repository: 'Repo2',
              value: 500,
            },
          ],
        },
        {
          period: 'April/2020',
          current: false,
          total: 15119.98,
          currency: '$',
          paid: false,
        },
        {
          period: 'May/2020',
          current: false,
          total: 1205.99,
          currency: '$',
          paid: true,
        },
        {
          period: 'April/2020',
          current: false,
          total: 0.56,
          currency: '$',
          paid: true,
        },
      ];
    },
  },
};
</script>
