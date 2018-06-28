<template>
  <div>
    <pagination
        v-if="authorizationsList"
        :itemComponent="authorizationItemElem"
        :list="authorizationsList" />
    <p
      v-if="authorizationsList && authorizationsList.empty"
      class="no-examples">No users in your team.</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import Pagination from '@/components/shared/Pagination';
import AuthorizationItem from './AuthorizationItem';


const components = {
  Pagination,
};

export default {
  name: 'AuthorizationsList',
  props: {
    repositoryUuid: {
      type: String,
      required: true,
    },
  },
  components,
  async mounted() {
    await this.updateAuthorizations();
  },
  data() {
    return {
      authorizationsList: null,
      authorizationItemElem: AuthorizationItem,
    };
  },
  methods: {
    ...mapActions(['repositoryAuthorizationList']),
    async updateAuthorizations() {
      if (this.authorizationsList) {
        this.authorizationsList.reset();
        await this.authorizationsList.next();
      } else {
        this.authorizationsList = await this.repositoryAuthorizationList({
          repositoryUuid: this.repositoryUuid,
        });
      }
    },
  },
};
</script>
