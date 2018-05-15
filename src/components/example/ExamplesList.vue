<template>
  <div>
    <pagination
        v-if="examplesList"
        :itemComponent="exampleItemElem"
        :list="examplesList"
        :repository="repository" />
    <p
      v-if="examplesList && examplesList.empty"
      class="no-examples">No examples.</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import Loading from '@/components/shared/Loading';
import Pagination from '@/components/shared/Pagination';
import ExampleItem from './ExampleItem';

const components = {
  Loading,
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
  async mounted() {
    await this.updateExamples();
  },
  data() {
    return {
      examplesList: null,
      exampleItemElem: ExampleItem,
    };
  },
  methods: {
    ...mapActions([
      'getExamples',
    ]),
    async updateExamples() {
      this.examplesList = null;
      this.examplesList = await this.getExamples({
        repositoryUuid: this.repository.uuid || this.repository,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.no-examples {
  margin: 8px;
}
</style>

