<template>
  <div class="base-example-evaluate bh-grid bh-grid--column">
    <bh-button
      ref="addSentenceButton"
      class="base-example-evaluate__new-sentence-btn"
      primary
      @click="addEvaluateExample()">Add test sentence</bh-button>
    <filter-evaluate-example
      :intents="repository.intents_list"
      :entities="repository.entities_list"
      @queryStringFormated="onSearch($event)"/>
    <evaluate-example-list
      :query="query"/>
    <new-evaluate-example-modal
      :open.sync="addEvaluateExampleModalOpen"
      @created="onEvaluateExampleCreated()" />
  </div>
</template>

<script>
import FilterEvaluateExample from '@/components/repository/repository-evaluate/example/FilterEvaluateExample';
import EvaluateExampleList from '@/components/repository/repository-evaluate/example/EvaluateExampleList';
import NewEvaluateExampleModal from '@/components/repository/repository-evaluate/example/NewEvaluateExampleModal';
import { exampleSearchToDicty, exampleSearchToString } from '@/utils/index';

export default {
  name: 'BaseExamplesEvaluate',
  components: {
    FilterEvaluateExample,
    EvaluateExampleList,
    NewEvaluateExampleModal,
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
      addEvaluateExampleModalOpen: false,
    };
  },
  watch: {
    filterByLanguage() {
      this.onSearch();
    },
  },
  mounted() {
    this.onSearch();
  },
  methods: {
    onSearch(value) {
      Object.assign(this.querySchema, value);

      if (!this.querySchema.intent) {
        delete this.querySchema.intent;
      }
      if (!this.querySchema.entity) {
        delete this.querySchema.entity;
      }
      if (!this.querySchema.label) {
        delete this.querySchema.label;
      }
      const formatedQueryString = exampleSearchToString(this.querySchema);
      this.query = exampleSearchToDicty(formatedQueryString);
      this.query.language = this.filterByLanguage;
    },
    addEvaluateExample() {
      this.addEvaluateExampleModalOpen = true;
      this.showResults = false;
    },
    onEvaluateExampleCreated() {
      this.$emit('created');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/colors.scss';
@import '~bh/src/assets/scss/variables.scss';

.base-example-evaluate {
  &__new-sentence-btn {
    align-self: flex-end;
    margin: 1.5rem 1rem .5rem 0;
  }
}
</style>
