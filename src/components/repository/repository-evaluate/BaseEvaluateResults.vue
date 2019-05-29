<template>
  <div
    v-if="resultId"
    class="bh-grid bh-grid--column">
    <div>
      <graphics-result :chart-data="resultsData"/>
      <!-- <filter-evaluate-result-example
        :intents="repository.intents_list"
        :labels="repository.labels_list"
        :entities="repository.entities_list"
        @queryStringFormated="onSearch($event)" /> -->

      <evaluate-result-example-list
        :id="resultId"
        :query="query" />
    </div>
  </div>
  <p v-else>You do not have results yet</p>
</template>

<script>
import { mapActions } from 'vuex';
import GraphicsResult from '@/components/repository/repository-evaluate/results/GraphicsResult';
import FilterEvaluateResultExample from '@/components/repository/repository-evaluate/results/FilterEvaluateResultExample';
import EvaluateResultExampleList from '@/components/repository/repository-evaluate/results/EvaluateResultExampleList';
import { exampleSearchToDicty, exampleSearchToString } from '@/utils/index';


export default {
  name: 'BaseEvaluateResults',
  components: {
    GraphicsResult,
    FilterEvaluateResultExample,
    EvaluateResultExampleList,
  },
  props: {
    repository: {
      type: Object,
      required: true,
    },
    resultId: {
      type: Number,
      default: null,
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
      resultsData: {},
    };
  },
  watch: {
    filterByLanguage() {
      this.onSearch();
    },
  },
  mounted() {
    this.getResults();
  },
  methods: {
    ...mapActions([
      'getResultsData',
    ]),
    async getResults() {
      if (this.resultId) {
        const append = await this.getResultsData({
          repositoryUuid: this.repository.uuid,
          resultId: this.resultId,
        });
        this.resultsData = append.data;
      }
    },
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
