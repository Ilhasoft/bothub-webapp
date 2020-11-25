<template>
  <div class="filter-result-example">
    <div class="filter-result-example__filters">
      <b-field
        class="filter-result-example__filters__input-text">
        <b-input
          v-model="text"
          :debounce="debounceTime"
          placeholder="Search sentence"
          icon-right="magnify"
        />
      </b-field>
      <div class="filter-result-example__filters__wrapper">
        <div class="filter-result-example__filters__wrapper__filter">
          <div class="filter-result-example__filters__wrapper__filter__text">
            {{ $t('webapp.dashboard.filter_by') }}:
          </div>
          <b-field>
            <b-select
              class="filter-result-example__filters__wrapper__filter__select"
              expanded
              placeholder="All test type">
              <option value="flint">Flint</option>
              <option value="silver">Silver</option>
            </b-select>
          </b-field>
        </div>
        <div>
          <b-button
            :disabled="true"
            class="filter-result-example__filters__wrapper__button"
            type="is-secondary">Compare results</b-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { mapState } from 'vuex';
import { formatters } from '@/utils/index';
import _ from 'lodash';


export default {
  name: 'FilterResultExample',
  props: {
    debounceTime: {
      type: Number,
      default: 750,
    },
  },
  data() {
    return {
      text: '',
      lastSearch: '',
      intent: '',
      entity: '',
      versionName: '',
      language: null,
      setTimeoutId: null,
      errors: {},
    };
  },
  computed: {
    ...mapState({
      selectedRepository: state => state.Repository.selectedRepository,
    }),
    filterIntents() {
      if (this.intents !== null) {
        return this.intents.filter(intent => intent
          .toString()
          .toLowerCase()
          .indexOf(this.intent.toLowerCase()) >= 0);
      }
      return [];
    },
    optionsIntents() {
      return this.filterIntents.map(intent => intent);
    },
    filterEntities() {
      if (this.entities !== null) {
        return this.entities.filter(entity => entity.value
          .toString()
          .toLowerCase()
          .indexOf(this.entity.toLowerCase()) >= 0);
      }
      return [];
    },
    optionsEntities() {
      return this.filterEntities.map(entity => entity);
    },
    optionsVersions() {
      if (!this.versions) return null;
      return this.versions.map(version => version.name);
    },
    inputFormatters() {
      const formattersList = [
        formatters.bothubItemKey(),
      ];
      formattersList.toString = () => 'inputFormatters';
      return formattersList;
    },
  },
  watch: {
    text(value) {
      const text = value.trim();
      if (this.lastSearch === text) return;
      this.lastSearch = text;
      this.$emit('textData', this.text);
      this.emitText(this.text);
    },
    intent(value) {
      const intent = formatters.bothubItemKey()(value);
      this.intent = intent;
      this.emitIntent(this.intent);
    },
    entity(value) {
      const entity = formatters.bothubItemKey()(value);
      this.entity = entity;
      this.emitEntity(this.entity);
    },
    language: _.debounce(function emitLanguage(value) {
      this.$emit('querystringformatted', { language: value });
    }, 500),
    versionName(value) {
      const versionName = formatters.versionItemKey()(value);
      if (this.versionName === versionName) return;
      this.$nextTick(() => {
        this.versionName = versionName;
      });
      this.emitVersion(versionName);
    },
  },
  methods: {
    emitText: _.debounce(function emitIntent(text) {
      this.$emit('querystringformatted', { search: text });
    }, 500),
    emitIntent: _.debounce(function emitIntent(intent) {
      this.$emit('querystringformatted', { intent });
    }, 500),
    emitEntity: _.debounce(function emitEntity(entity) {
      this.$emit('querystringformatted', { entity });
    }, 500),
    emitVersion: _.debounce(function emitVersion(version) {
      this.$emit('querystringformatted', { repository_version_name: version });
    }, 500),
  },
};
</script>

<style lang="scss" scoped>

@import '~@/assets/scss/variables.scss';
@import '~@/assets/scss/colors.scss';

.filter-result-example {
  width: 100%;
  margin: 0 auto .5rem;

  &__filters {
    margin: 1.5rem 0;
    display: flex;
    justify-content: space-between;

    @media (max-width: $mobile-width) {
        grid-template-columns: 1fr;
    }

    &__input-text {
      align-self: center;
    }

    &__wrapper {
      display: flex;
      justify-content: space-between;
      width: 50%;

      &__filter {
          display: flex;

        &__text {
          white-space: nowrap;
          align-self: center;
          height: 100%;
          padding: .5rem;
        }
         &__select {
          width: 179px;
        }
      }

        &__button {
          width: 179px;
          height: 36px;
          font-family: $font-family;
          font-size: $font-size;
          color: $color-white;
      }
    }
  }
}
</style>
