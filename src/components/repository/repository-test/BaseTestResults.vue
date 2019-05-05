<template>
  <div class="bh-grid bh-grid--column">
    <div>
      <graphics-result />
      <hr>
      <filter-result-example-test
        :intents="repository.intents_list"
        :labels="repository.labels_list"
        :entities="repository.entities_list"
        @queryStringFormated="onSearch($event)" />

      <result-example-test-list
        :repository="repository"
        :query="query" />
    </div>
  </div>
</template>

<script>
import GraphicsResult from '@/components/repository/repository-test/results/GraphicsResult';
import FilterResultExampleTest from '@/components/repository/repository-test/results/FilterResultExampleTest';
import ResultExampleTestList from '@/components/repository/repository-test/results/ResultExampleTestList';
import { exampleSearchToDicty, exampleSearchToString } from '@/utils/index';

export default {
  name: 'BaseTestResulsts',
  components: {
    GraphicsResult,
    FilterResultExampleTest,
    ResultExampleTestList,
  },
  props: {
    repository: {
      type: Object,
      required: true,
    },
    filterByLanguage: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      querySchema: {},
      query: {},
    };
  },
  watch: {
    filterByLanguage() {
      this.onSearch();
    },
  },
  methods: {
    onSearch(value) {
      Object.assign(this.querySchema, value);

      if (!this.querySchema.intent) {
        delete this.querySchema.intent;
      }
      if (!this.querySchema.entitie) {
        delete this.querySchema.entitie;
      }
      if (!this.querySchema.label) {
        delete this.querySchema.label;
      }
      const formatedQueryString = exampleSearchToString(this.querySchema);
      this.query = exampleSearchToDicty(formatedQueryString);
      this.query.language = this.filterByLanguage;
    },
  },
};
</script>
