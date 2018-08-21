<template>
  <div>
    <pagination
      v-if="authorizationsList"
      ref="list"
      :item-component="authorizationItemElem"
      :list="authorizationsList"
      @edit="onEdit($event)" />
    <p
      v-if="authorizationsList && authorizationsList.empty"
      class="no-examples">No users in your team.</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import Pagination from '@/components-v1/shared/Pagination';
import AuthorizationItem from './AuthorizationItem';


const components = {
  Pagination,
};

export default {
  name: 'AuthorizationsList',
  components,
  props: {
    repositoryUuid: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      authorizationsList: null,
      authorizationItemElem: AuthorizationItem,
    };
  },
  async mounted() {
    await this.updateAuthorizations();
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
    onEdit(value) {
      this.$emit('edit', value);
    },
  },
};
</script>
