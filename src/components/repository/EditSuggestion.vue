<template>
  <div>
    <paginated-simple
      v-show="phrasesVariation.total !== 0"
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
import SuggestionAccordion from '@/components/shared/accordion/SuggestionAccordion';

const components = {
  PaginatedSimple,
};

export default {
  name: 'ExamplesList',
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
      suggestion: SuggestionAccordion,
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
