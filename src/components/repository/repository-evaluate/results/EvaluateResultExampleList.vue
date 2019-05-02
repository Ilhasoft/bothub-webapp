<template>
  <div>
    <pagination
      v-if="resultExampleList"
      :item-component="resultExampleItem"
      :list="resultExampleList"
      :repository="repository"
      @itemDeleted="onItemDeleted($event)" />
    <p
      v-if="resultExampleList && resultExampleList.empty"
      class="no-examples">No examples.</p>
  </div>
</template>

<script>
import Pagination from '@/components-v1/shared/Pagination';
import EvaluateResultExampleItem from '@/components/repository/repository-evaluate/results/EvaluateResultExampleItem';


export default {
  name: 'EvaluateResultExampleList',
  components: {
    Pagination,
  },
  props: {
    repository: {
      type: Object,
      required: true,
    },
    query: {
      type: Object,
      default: () => ({}),
    },
    language: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      resultExampleList: null,
      resultExampleItem: EvaluateResultExampleItem,
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
      if (!this.resultExampleList || force) {
        const a = this.$api.evaluateExample.resultSearch(
          this.repository.uuid,
          this.query,
        );
        console.log(a);
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
