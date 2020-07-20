<template>
  <div>
    <paginated-list
      v-if="authorizationsList"
      ref="list"
      :item-component="authorizationItemElem"
      :list="authorizationsList"
      @itemSave="onEdit"
      @itemDeleted="updateAuthorizations"/>
    <p v-if="authorizationsList && authorizationsList.empty">
      {{ $t('webapp.settings.no_users' ) }}
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import PaginatedList from '@/components/shared/PaginatedList';
import AuthorizationItem from '@/components/repository/AuthorizationItem';


const components = {
  PaginatedList,
};

export default {
  name: 'OrgAuthorizationsList',
  components,
  props: {
    orgNickname: {
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
    ...mapActions(['orgAuthorizationList']),
    async updateAuthorizations() {
      this.authorizationsList = await this.orgAuthorizationList({
        orgNickname: this.orgNickname,
      });
    },
    onEdit(value) {
      this.$emit('edit', value);
    },
  },
};
</script>
