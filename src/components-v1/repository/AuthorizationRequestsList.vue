<template>
  <div>
    <pagination
      v-if="requestsList"
      :item-component="authorizationRequestItem"
      :list="requestsList"
      @itemDeleted="onItemDeleted()" />
    <p
      v-if="requestsList && requestsList.empty"
      class="no-examples">No requests.</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import Pagination from '@/components-v1/shared/Pagination';
import AuthorizationRequestItem from '@/components/repository/AuthorizationRequestItem';


const components = {
  Pagination,
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
