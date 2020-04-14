<template>
  <div>
    <paginated-list
      v-if="examplesList"
      :item-component="exampleItemElem"
      :list="examplesList"
      :repository="repository"
      :per-page="perPage"
      @itemDeleted="onItemDeleted($event)" />
    <p
      v-if="examplesList && examplesList.empty"
      class="no-examples">No examples.</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PaginatedList from '@/components/shared/PaginatedList';
import ExampleItem from '@/components/example/ExampleItem';


const components = {
  PaginatedList,
};

export default {
  name: 'ExamplesList',
  components,
  props: {
    query: {
      type: Object,
      default: () => ({}),
    },
    perPage: {
      type: Number,
      default: 20,
    },
    update: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      examplesList: null,
      exampleItemElem: ExampleItem,
    };
  },
  computed: {
    ...mapState({
      repository: state => state.Repository.selectedRepository,
      repositoryVersion: state => state.Repository.repositoryVersion,
    }),
  },
  watch: {
    query() {
      this.updateExamples(true);
    },
    update() {
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
    ...mapActions([
      'searchExamples',
    ]),
    async updateExamples(force = false) {
      if (!this.examplesList || force) {
        this.examplesList = await this.searchExamples({
          repositoryUuid: this.repository.uuid,
          version: this.repositoryVersion,
          query: this.query,
          limit: this.perPage,
        });
      }
    },
    onItemDeleted() {
      this.$emit('exampleDeleted');
    },
  },
};
</script>

<style lang="scss" scoped>
.no-examples {
  margin: 8px;
}
</style>
