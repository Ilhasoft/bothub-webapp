<template>
  <div class="bh-grid bh-grid--column">
    <div class="bh-grid">
      <h1>Test Sentences</h1>
    </div>
    <filter-sentences-test
      :intents="repository.intents_list"
      :labels="repository.labels_list"
      :entities="repository.entities_list"
      @queryStringFormated="onSearch($event)"
    />
    <sentences-test-list
      :repository="repository"
      :query="query"/>
  </div>
</template>

<script>
import Pagination from '@/components-v1/shared/Pagination';
import FilterSentencesTest from '@/components/repository/test-sentences/sentences/FilterSentencesTest';
import SentencesTestList from '@/components/repository/test-sentences/sentences/SentencesTestList';
import { exampleSearchToDicty, exampleSearchToString } from '@/utils/index';

export default {
  name: 'SentencesTest',
  components: {
    Pagination,
    FilterSentencesTest,
    SentencesTestList,
  },
  props: {
    repository: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      querySchema: {},
      query: {},
    };
  },
  async mounted() {
    await this.updateList();
  },
  methods: {
    async updateList() {
      this.translateList = null;
      if (!!this.from && !!this.to) {
        await this.$nextTick();
        this.translateList = await this.getExamplesToTranslate({
          repositoryUuid: this.repository.uuid,
          from: this.from,
          to: this.to,
        });
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
    },
  },
};
</script>
