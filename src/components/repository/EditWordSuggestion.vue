<template>
  <div>
    <paginated-simple
      :item-component="suggestion"
      :list="phrasesVariation"
      :repository="repository"
      :per-page="perPage"
      @itemDeleted="dispatchDelete($event)"
      @itemSave="dispatchSave($event)"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PaginatedSimple from '@/components/shared/PaginatedSimple';
import WordSuggestion from '@/components/shared/accordion/WordSuggestion';

const components = {
  PaginatedSimple,
};

export default {
  name: 'EditWordSuggestion',
  components,
  props: {
    perPage: {
      type: Number,
      default: 2,
    },
    phrasesVariation: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      suggestion: WordSuggestion,
    };
  },
  computed: {
    ...mapGetters({
      repository: 'getCurrentRepository',
    }),
  },
  methods: {
    dispatchDelete(text) {
      this.$emit('dispatchDelete', text);
    },
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
