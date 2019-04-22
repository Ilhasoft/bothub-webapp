<template>
  <div class="base-example-test bh-grid bh-grid--column">
    <bh-button
      ref="addSentenceButton"
      class="base-example-test__new-sentence-btn"
      primary
      @click="addTestSentence()">Add test sentence</bh-button>
    <filter-example-test
      :intents="repository.intents_list"
      :labels="repository.labels_list"
      :entities="repository.entities_list"
      @queryStringFormated="onSearch($event)"/>
    <example-test-list
      :repository="repository"
      :query="query"/>
    <new-example-test-modal
      :repository="repository"
      :open.sync="addTestSentenceModalOpen"
      @created="onExampleTestCreated()" />
  </div>
</template>

<script>
import FilterExampleTest from '@/components/repository/repository-test/example/FilterExampleTest';
import ExampleTestList from '@/components/repository/repository-test/example/ExampleTestList';
import NewExampleTestModal from '@/components/repository/repository-test/example/NewExampleTestModal';
import { exampleSearchToDicty, exampleSearchToString } from '@/utils/index';

export default {
  name: 'BaseExamplesTest',
  components: {
    FilterExampleTest,
    ExampleTestList,
    NewExampleTestModal,
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
      addTestSentenceModalOpen: false,
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
    addTestSentence() {
      this.addTestSentenceModalOpen = true;
      this.showResults = false;
    },
    onExampleTestCreated() {
      this.$emit('created');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/colors.scss';
@import '~bh/src/assets/scss/variables.scss';

.base-example-test {
  &__new-sentence-btn {
    align-self: flex-end;
    margin: 1.5rem 1rem .5rem 0;
  }
}
</style>
