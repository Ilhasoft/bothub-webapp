<template>
  <div class="bh-grid bh-grid--column">
    <div class="bh-grid">
      <h1>Test Sentences</h1>
    </div>
    <filter-example-test
      :intents="repository.intents_list"
      :labels="repository.labels_list"
      :entities="repository.entities_list"
      @queryStringFormated="onSearch($event)"
    />
    <example-test-list
      :repository="repository"
      :query="query"/>
  </div>
</template>

<script>
import FilterExampleTest from '@/components/repository/repository-test/example/FilterExampleTest';
import ExampleTestList from '@/components/repository/repository-test/example/ExampleTestList';
import { exampleSearchToDicty, exampleSearchToString } from '@/utils/index';

export default {
  name: 'BaseExamplesTest',
  components: {
    FilterExampleTest,
    ExampleTestList,
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
