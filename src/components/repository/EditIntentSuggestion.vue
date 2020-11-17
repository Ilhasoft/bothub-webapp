<template>
  <div>
    <paginated-simple
      :item-component="suggestion"
      :list="phrasesVariation"
      :per-page="perPage"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PaginatedSimple from '@/components/shared/PaginatedSimple';
import IntentSuggestion from '@/components/shared/accordion/IntentSuggestion';

const components = {
  PaginatedSimple,
};

export default {
  name: 'EditIntentSuggestion',
  components,
  props: {
    perPage: {
      type: Number,
      default: 10,
    },
    phrasesVariation: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      suggestion: IntentSuggestion,
    };
  },
  computed: {
    ...mapGetters({
      repository: 'getCurrentRepository',
    }),
  },
  methods: {
    dispatchSave(sentence) {
      this.$emit('dispatchSave', sentence);
    },
  },
};
</script>

<style lang="scss" scoped>
.no-examples {
  margin: 8px;
}
</style>
