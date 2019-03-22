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
import ExampleItem from '@/components/repository/sentences-test/sentences/SentencesTestItem';


const components = {
  Pagination,
};

export default {
  name: 'SentencesTestList',
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
    repository() {
      this.updateExamples(true);
    },
  },
  mounted() {
    this.updateExamples();
  },
  methods: {
    updateExamples(force = false) {
      if (!this.examplesList || force) {
        this.examplesList = this.$api.examplesTest.search(
          this.repository.uuid,
          this.query,
        );
      }
    },
    onItemDeleted(id) {
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
