<template>
  <div class="bh-grid bh-grid--column">
    <div>
      <h1>Test output</h1>
      <graphics-result />
      <base-examples-test
        :repository="repository"
        :filter-by-language="currentLanguage"/>
      <hr>
    </div>
  </div>
</template>

<script>
import GraphicsResult from '@/components/repository/repository-test/example/GraphicsResult';
import BaseExamplesTest from '@/components/repository/repository-test/BaseExamplesTest';

export default {
  name: 'TestResults',
  components: {
    GraphicsResult,
    BaseExamplesTest,
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
  },
};
</script>
