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
      class="no-examples">No sentences.</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Pagination from '@/components-v1/shared/Pagination';
import EvaluateExampleItem from '@/components/repository/repository-evaluate/example/EvaluateExampleItem';


export default {
  name: 'EvaluateExampleList',
  components: {
    Pagination,
  },
  props: {
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
  computed: {
    ...mapState({
      repository: state => state.Repository.selectedRepository,
    }),
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
        this.examplesList = this.$api.evaluateExample.search(
          this.repository.uuid,
          this.query,
        );
      }
    },
    onItemDeleted(id) {
      this.updateExamples(true);
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
