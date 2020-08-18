<template>
  <div>
    <loading
      v-if="loading" />
    <h3
      v-else-if="filteredLanguagesStatus.length === 0"
      class="has-text-centered"> No translated languages </h3>
    <transition-group
      v-else-if="!translationList"
      name="list"
      mode="out-in"
      tag="div">
      <div
        v-for="{ status, language, verbose, selected } in filteredLanguagesStatus"
        :key="language"
        :ref="`status-${language}`"
        class="card list-item"
        @click="select(language)">
        <div class="columns is-vcentered">
          <p class="card-language column is-3">
            <span>{{ verbose }}</span>
          </p>
          <div
            :class="{ selected }"
            class="column is-8">
            <div class="card-percentage__wrapper">
              <div
                :style="percentageStyle(status.base_translations.percentage)"
                class="card-percentage" />
            </div>
          </div>
          <strong class="column is-1">
            {{ Number(status.base_translations.percentage.toFixed(2)) }}%
          </strong>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { formatters, languageListToDict } from '@/utils';
import Loading from '@/components/shared/Loading';

const components = {
  Loading,
};

export default {
  name: 'TranslationsStatus',
  components,
  props: {
    repositoryUuid: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: null,
    },
    update: {
      type: Boolean,
      default: false,
    },
    translationList: {
      type: Boolean,
      default: true,
    },
    query: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      languagesStatus: null,
      selected: this.value,
      loading: false,
    };
  },
  computed: {
    languages() {
      return languageListToDict(Object.keys(this.languagesStatus));
    },
    languageList() {
      return Object.values(this.languages);
    },
    filteredLanguagesStatus() {
      if (!this.languagesStatus) {
        return [];
      }
      return Object.keys(this.languagesStatus)
        .map(language => ({
          language,
          status: this.languagesStatus[language],
          verbose: this.languages[language],
          selected: this.selected === language,
        }))
        .filter(languageStatus => (!languageStatus.status.is_base_language))
        .filter((language) => {
          if (language.status.base_translations.percentage === 0) return false;

          if (!this.query) return true;

          if (this.query.search && this.query.search.length > 0) {
            const search = new RegExp(formatters.bothubItemKey()(this.query.search));
            if (!search.test(formatters.bothubItemKey()(language.verbose))) return false;
          }

          if (this.query['max-percentage']
          && language.status.base_translations.percentage > this.query['max-percentage']) return false;
          if (this.query['min-percentage']
          && language.status.base_translations.percentage < this.query['min-percentage']) return false;
          return true;
        })
        .sort((a, b) => (
          a.status.base_translations.percentage
          < b.status.base_translations.percentage ? 1 : -1));
    },
  },
  watch: {
    async ownerNickname() { await this.updateTranslationsStatus(); },
    async repositorySlug() { await this.updateTranslationsStatus(); },
    selected() {
      this.$emit('input', this.selected);
    },
    update() {
      this.updateTranslationsStatus();
    },
  },
  async mounted() {
    await this.updateTranslationsStatus();
  },
  methods: {
    ...mapActions([
      'getRepositoryLanguagesStatus',
    ]),
    percentageStyle(percentage) {
      return {
        width: `${Math.min(percentage, 100)}%`,
      };
    },
    async updateTranslationsStatus() {
      this.loading = true;
      this.languagesStatus = null;
      try {
        const response = await this.getRepositoryLanguagesStatus({
          repositoryUUID: this.repositoryUuid,
        });
        this.languagesStatus = response.data.languages_status;
      } catch (e) {
        this.languagesStatus = null;
      } finally {
        this.loading = false;
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
@import '~@/assets/scss/colors.scss';

.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0.4;
  float: bottom;
  transform: translateY(-5%);
}

.list-item:not(:last-child) {
    margin-bottom: 1rem;
}

.card {
  background-color: $color-white;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  border: 1px solid $color-border;
  cursor: pointer;
  transition:
    box-shadow .2s ease,
    background-color .2s ease;
  border-radius: 4px;

  &:hover,
  &.selected {
    background-color: white;
    box-shadow: 0 0 8px rgba(100, 100, 100, .3);
  }

  &-percentage {
    background-color: $color-primary;
    height: 100%;
    &__wrapper {
      background-color: $color-grey-light;
      width: 100%;
      height: 1.563rem;
    }
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
