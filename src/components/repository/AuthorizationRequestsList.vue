<template>
  <div>
    <paginated-list
      v-if="requestsList"
      :item-component="authorizationRequestItem"
      :list="requestsList"
      @itemDeleted="onItemDeleted()" />
    <p v-if="requestsList && requestsList.empty">
      {{ $t('webapp.settings.no_requests') }}
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import PaginatedList from '@/components/shared/PaginatedList';
import AuthorizationRequestItem from '@/components/repository/AuthorizationRequestItem';


const components = {
  PaginatedList,
};

export default {
  name: 'AuthorizationRequestsList',
  components,
  props: {
    repositoryUuid: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      requestsList: null,
      authorizationRequestItem: AuthorizationRequestItem,
    };
  },
  async mounted() {
    await this.updateRequests();
  },
  methods: {
    ...mapActions([
      'repositoryAuthorizationRequestsList',
    ]),
    async updateRequests() {
      const { repositoryUuid } = this;
      if (this.requestsList) {
        this.requestsList.reset();
        await this.requestsList.next();
      } else {
        this.requestsList = await this.repositoryAuthorizationRequestsList(
          { repositoryUuid },
        );
      }
    },
    async onItemDeleted() {
      await this.updateRequests();
      this.$emit('review');
    },
  },
};
</script>
