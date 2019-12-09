<template>
  <div>
    <pagination
      v-if="updatesList"
      :item-component="updateItemElem"
      :list="updatesList"
      :repository="repository" />
    <p
      v-if="updatesList && updatesList.empty"
      class="no-examples">No updates.</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import Pagination from '@/components/shared/Pagination';
import UpdateItem from './UpdateItem';


export default {
  name: 'UpdatesList',
  components: {
    Pagination,
  },
  props: {
    repository: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      updateItemElem: UpdateItem,
      updatesList: null,
    };
  },
  mounted() {
    this.updateUpdates();
  },
  methods: {
    ...mapActions([
      'getUpdatesList',
    ]),
    async updateUpdates(force = false) {
      if (this.updatesList || force) {
        this.updatesList.reset();
        await this.updatesList.next();
      } else {
        this.updatesList = await this.getUpdatesList({
          repositoryUuid: this.repository.uuid,
        });
      }
    },
  },
};
</script>
