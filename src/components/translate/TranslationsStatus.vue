<template>
  <div class="columns is-multiline">
    <div
      v-for="{ status, language, selected } in filteredLanguagesStatus"
      :key="language"
      :ref="`status-${language}`"
      class="column is-3"
      @click="select(language)">
      <div :class="{ card: true, selected }">
        <div class="card-percentage">
          <pie :percent="status.base_translations.percentage" />
        </div>
        <p class="card-language">
          <span>{{ language|languageVerbose }}</span>
          <flag :language="language" />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Pie from '@/components-v1/shared/Pie';
import Flag from '@/components-v1/shared/Flag';


const components = {
  Pie,
  Flag,
};

export default {
  name: 'TranslationsStatus',
  components,
  props: {
    ownerNickname: {
      type: String,
      required: true,
    },
    repositorySlug: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      languagesStatus: null,
      selected: this.value,
    };
  },
  computed: {
    filteredLanguagesStatus() {
      if (!this.languagesStatus) {
        return [];
      }
      return Object.keys(this.languagesStatus)
        .map(language => ({
          language,
          status: this.languagesStatus[language],
          selected: this.selected === language,
        }))
        .filter(languageStatus => (!languageStatus.status.is_base_language))
        .sort((a, b) => (
          a.status.base_translations.percentage
          < b.status.base_translations.percentage));
    },
  },
  watch: {
    async ownerNickname() { await this.updateTranslationsStatus(); },
    async repositorySlug() { await this.updateTranslationsStatus(); },
    selected() {
      this.$emit('input', this.selected);
    },
  },
  async mounted() {
    await this.updateTranslationsStatus();
  },
  methods: {
    ...mapActions([
      'getRepositoryLanguagesStatus',
    ]),
    async updateTranslationsStatus() {
      const { ownerNickname, repositorySlug: slug } = this;
      this.languagesStatus = null;
      try {
        const response = await this.getRepositoryLanguagesStatus({
          ownerNickname,
          slug,
        });
        this.languagesStatus = response.data.languages_status;
      } catch (e) {
        this.languagesStatus = null;
      }
    },
    select(language) {
      this.selected = language;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/utilities.scss';

.card {
  background-color: $white-ter;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  cursor: pointer;
  transition:
    box-shadow .2s ease,
    background-color .2s ease;
  border-radius: 4px;
  padding: 8px;

  &:hover,
  &.selected {
    background-color: white;
    box-shadow: 0 0 8px rgba(100, 100, 100, .3);
  }

  &-percentage {
    text-align: center;
  }

  &-language {
    display: flex;
    align-items: center;
    margin: 8px 0;
    justify-content: center;

    > * {
      margin-right: 8px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
