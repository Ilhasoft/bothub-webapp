<template>
  <div class="bh-grid bh-grid--column">
    <div>
      <h1>Test output</h1>
      <graphics-result />
      <sentences-test
        :repository="repository"
        :filter-by-language="currentLanguage"/>
      <hr>
    </div>
  </div>
</template>

<script>
import GraphicsResult from '@/components/repository/test-sentences/sentences/GraphicsResult';
import SentencesTest from '@/components/repository/test-sentences/SentencesTest';

export default {
  name: 'TestResults',
  components: {
    GraphicsResult,
    SentencesTest,
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
