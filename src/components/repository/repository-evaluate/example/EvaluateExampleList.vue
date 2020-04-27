<template>
  <div class="evaluate-example-list">
    <paginated-list
      v-if="examplesList"
      :item-component="exampleItemElem"
      :list="examplesList"
      :repository="repository"
      @itemDeleted="onItemDeleted($event)" />
    <p
      v-if="examplesList && examplesList.empty"
      class="no-examples">{{ $t('webapp.evaluate.no_sentences') }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PaginatedList from '@/components/shared/PaginatedList';
import ExampleAccordion from '@/components/shared/accordion/ExampleAccordion';


export default {
  name: 'EvaluateExampleList',
  components: {
    PaginatedList,
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
    update: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      examplesList: null,
      exampleItemElem: ExampleAccordion,
    };
  },
  computed: {
    ...mapGetters({
      repositoryVersion: 'getSelectedVersion',
      repository: 'getCurrentRepository',
    }),
  },
  watch: {
    query() {
      this.updateExamples(true);
    },
    repsoitory() {
      this.updateExamples(true);
    },
    repositoryVersion() {
      this.updateExamples(true);
    },
    update() {
      this.updateExamples(true);
    },
  },
  mounted() {
    this.updateExamples();
  },
  methods: {
    ...mapActions([
      'searchEvaluateExamples',
    ]),
    async updateExamples(force = false) {
      if (!this.examplesList || force) {
        this.examplesList = await this.searchEvaluateExamples({
          repositoryUUID: this.repository.uuid,
          version: this.repositoryVersion,
          query: this.query,
        });
      }
    },
    onItemDeleted() {
      this.$emit('deleted');
    },
  },
};
</script>

<style lang="scss" scoped>
.evaluate-example-list {
  width: 100%;
  margin: 0 auto;
}

.no-examples {
  margin-left: 14px;
}
</style>
