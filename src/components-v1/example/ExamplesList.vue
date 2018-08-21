<template>
  <div>
    <pagination
      v-if="examplesList"
      :item-component="exampleItemElem"
      :list="examplesList"
      :repository="repository"
      @itemDeleted="onItemDeleted" />
    <p
      v-if="examplesList && examplesList.empty"
      class="no-examples">No examples.</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import Pagination from '@/components-v1/shared/Pagination';
import ExampleItem from './ExampleItem';

const components = {
  Pagination,
};

export default {
  name: 'ExamplesList',
  components,
  props: {
    repository: {
      type: [String, Object],
      required: true,
    },
  },
  data() {
    return {
      examplesList: null,
      exampleItemElem: ExampleItem,
    };
  },
  async mounted() {
    await this.updateExamples();
  },
  methods: {
    ...mapActions([
      'getExamples',
    ]),
    async updateExamples() {
      if (this.examplesList) {
        this.examplesList.reset();
        await this.examplesList.next();
      } else {
        this.examplesList = await this.getExamples({
          repositoryUuid: this.repository.uuid || this.repository,
        });
      }
    },
    onItemDeleted(id) {
      /* istanbul ignore next */
      this.$emit('exampleDeleted', id);
    },
  },
};
</script>

<style lang="scss" scoped>
.no-examples {
  margin: 8px;
}
</style>
