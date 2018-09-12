<template>
  <div>
    <pagination
      v-if="examplesList"
      :item-component="exampleItemElem"
      :list="examplesList"
      :repository="repository"
      @itemDeleted="onItemDeleted($event)" />
    <p
      v-if="examplesList && examplesList.empty"
      class="no-examples">No examples.</p>
  </div>
</template>

<script>
import Pagination from '@/components-v1/shared/Pagination';
import ExampleItem from '@/components/example/ExampleItem';


const components = {
  Pagination,
};

export default {
  name: 'ExamplesList',
  components,
  props: {
    repository: {
      type: Object,
      required: true,
    },
    query: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      examplesList: null,
      exampleItemElem: ExampleItem,
    };
  },
  watch: {
    query() {
      this.updateExamples(true);
    },
  },
  async mounted() {
    await this.updateExamples();
  },
  methods: {
    async updateExamples(force = false) {
      if (!this.examplesList || force) {
        this.examplesList = this.$api.examples.search(
          this.repository.uuid,
          this.query,
        );
      }

      await this.examplesList.reset();
      await this.examplesList.next();
    },
    onItemDeleted() {
    },
  },
};
</script>

<style lang="scss" scoped>
.no-examples {
  margin: 8px;
}
</style>
