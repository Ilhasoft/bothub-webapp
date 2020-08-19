<template>
  <div class="translation-status-info">
    <numbers-card
      :count="languages.length"
      :help-text="languages.join(', ')"
      :label="$tc('webapp.summary.information_language',
                  languages.length)"
      size="medium" />
    <numbers-card
      :help-text="completedLanguages.join(', ')"
      :count="completedLanguages.length"
      :label="$tc('webapp.translate.completed',
                  completedLanguages.length)"
      size="medium" />
    <numbers-card
      :help-text="translatorsList.join(', ')"
      :count="translatorsList.length"
      :label="$tc('webapp.translate.translators',
                  translatorsList.length)"
      size="medium" />
  </div>
</template>

<script>
import NumbersCard from '@/components/shared/NumbersCard';
import { mapActions } from 'vuex';

export default {
  name: 'TranslationStatusInfo',
  components: {
    NumbersCard,
  },
  props: {
    repositoryUuid: {
      type: String,
      default: null,
    },
    completedLanguages: {
      type: Array,
      default: () => [],
    },
    languages: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      translatorsList: [],
    };
  },
  watch: {
    repositoryUuid() {
      this.getTranslators();
    },
  },
  mounted() {
    this.getTranslators();
  },
  methods: {
    ...mapActions([
      'repositoryAuthorizationList',
    ]),
    async getTranslators() {
      if (!this.repositoryUuid) return;
      try {
        const authorizationsList = await this.repositoryAuthorizationList({
          repositoryUuid: this.repositoryUuid,
        });
        const list = await authorizationsList.getAllItems();
        this.translatorsList = list
          .filter(user => user.level >= 2)
          .map(user => user.user__nickname);
      } catch (e) {
        this.translatorsList = [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';

  .translation-status-info {
    display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 0.25rem 1.5rem;
        border: 1px solid $color-border;

        > * {
          margin-right: 1rem;
        }
  }
</style>
