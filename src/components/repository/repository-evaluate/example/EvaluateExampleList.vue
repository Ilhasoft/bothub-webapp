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
import EvaluateExampleItem from '@/components/repository/repository-evaluate/example/EvaluateExampleItem';


export default {
  name: 'EvaluateExampleList',
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
      examplesList: null,
      exampleItemElem: EvaluateExampleItem,
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
      console.log(this.$api);

      if (!this.examplesList || force) {
        this.examplesList = this.$api.evaluateExample.search(
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
