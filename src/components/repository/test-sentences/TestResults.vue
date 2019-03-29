<template>
  <div class="bh-grid bh-grid--column">
    <div>
      <h1>Test output</h1>
      <graphics-result />
    </div>
  </div>
</template>

<script>
import GraphicsResult from '@/components/repository/test-sentences/sentences/GraphicsResult';

export default {
  name: 'TestResults',
  components: {
    GraphicsResult,
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
