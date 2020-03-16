<template>
  <div class="base-example-evaluate bh-grid bh-grid--column">
    <new-evaluate-example
      @created="onEvaluateExampleCreated()"/>
    <hr class="base-example-evaluate__divider">
    <h2 class="base-example-evaluate__title">{{ $t('webapp.trainings.sentences_list') }}</h2>
    <filter-evaluate-example
      :intents="repository.intents_list"
      :entities="repository.entities_list"
      @queryStringFormated="onSearch($event)"/>
    <evaluate-example-list
      :query="query"
      @deleted="onEvaluateExampleDeleted"/>
  </div>
</template>

<script>
import FilterEvaluateExample from '@/components/repository/repository-evaluate/example/FilterEvaluateExample';
import EvaluateExampleList from '@/components/repository/repository-evaluate/example/EvaluateExampleList';
import NewEvaluateExample from '@/components/repository/repository-evaluate/example/NewEvaluateExample';
import { exampleSearchToDicty, exampleSearchToString } from '@/utils/index';
import { mapState } from 'vuex';

export default {
  name: 'BaseExamplesEvaluate',
  components: {
    FilterEvaluateExample,
    EvaluateExampleList,
    NewEvaluateExample,
  },
  props: {
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
  computed: {
    ...mapState({
      repository: state => state.Repository.selectedRepository,
    }),
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
    onEvaluateExampleCreated() {
      this.$emit('created');
    },
    onEvaluateExampleDeleted() {
      this.$emit('deleted');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/colors.scss';
@import '~bh/src/assets/scss/variables.scss';

.base-example-evaluate {
  &__divider {
    height: 1px;
    background-color: #d5d5d5;
  }
}
</style>
