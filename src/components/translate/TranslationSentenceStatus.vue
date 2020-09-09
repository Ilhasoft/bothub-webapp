<template>
  <div class="translation-sentence-status">
    <numbers-card
      v-for="status in statusInfo"
      :key="status.label"
      :count="status.count || 0"
      :disabled="status.count == null"
      :label="status.label"
      clickable
      class="translation-sentence-status__card"/>
  </div>
</template>

<script>
import NumbersCard from '@/components/shared/NumbersCard';
import { mapActions } from 'vuex';

export default {
  name: 'TranslationSentenceStatus',
  components: { NumbersCard },
  props: {
    repositoryUuid: {
      type: String,
      default: null,
    },
    version: {
      type: Number,
      default: null,
    },
    toLanguage: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      statusData: {
        sentences: { label: 'Sentences', count: null, query: {} },
        translated: { label: 'Translated', count: null, query: { has_translation: true } },
        notTranslated: { label: 'Not Translated', count: null, has_not_translation_to: 'pt_br' },
        inconsistent: { label: 'Inconsistent', count: null, query: {} },
      },
    };
  },
  computed: {
    statusInfo() {
      return Object.values(this.statusData);
    },
  },
  watch: {
    repositoryUuid() {
      this.getStatusData();
    },
    version() {
      this.getStatusData();
    },
  },
  mounted() {
    this.getStatusData();
  },
  methods: {
    ...mapActions(['searchExamples']),
    async getStatusData() {
      if (!this.repositoryUuid || !this.version) return;
      Object.entries(this.statusData).forEach(([key, value]) => {
        this.searchExamples({
          limit: 1,
          repositoryUuid: this.repositoryUuid,
          version: this.version,
          query: value.query,
        })
          .then(list => list.updateItems(1)
            .then(() => { this.statusData[key].count = list.total; }));
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';

    .translation-sentence-status {
        display: flex;
        flex-wrap: wrap;
        > * {
            margin-right: 1rem;
            margin-bottom: 1rem;
        }
        &__card {
            border: 1px solid $color-border;
            padding: 1rem 3rem;
        }
    }
</style>
