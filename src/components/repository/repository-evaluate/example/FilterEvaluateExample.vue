<template>
  <div class="filter-evaluate-example">
    <div class="filter-evaluate-example__filters">
      <b-field
        :errors="errors.intent"
        class="filter-evaluate-example__filters__input-text">
        <b-input
          v-model="text"
          :debounce="debounceTime"
          icon-right="magnify"
        />
      </b-field>
      <div
        :class="wrapperClasses">
        <div class="filter-evaluate-example__filters__wrapper__text">
          {{ $t('webapp.dashboard.filter_by') }}:
        </div>
        <b-field
          :message="errors.intent">
          <b-autocomplete
            v-model="intent"
            :data="optionsIntents"
            :formatters="inputFormatters"
            :placeholder="$t('webapp.evaluate.all_intents')"
            open-on-focus
            dropdown-position="bottom" />
        </b-field>
        <b-field
          v-if="entities"
          :message="errors.entity">
          <b-autocomplete
            v-model="entity"
            :data="optionsEntities"
            :formatters="inputFormatters"
            :placeholder="$t('webapp.evaluate.all_entities')"
            open-on-focus
            dropdown-position="bottom" />
        </b-field>
        <b-field v-if="languageFilter && languages">
          <b-select
            v-model="language"
            :placeholder="$t('webapp.evaluate.all_languages')"
            expanded>
            <option
              v-for="language in languages"
              :key="language.id"
              :selected="language.value === language"
              :value="language.value">
              {{ language.title }}
            </option>
            <option
              :value="null">
              {{ $t('webapp.home.all_languages') }}
            </option>
          </b-select>
        </b-field>
        <b-field
          :message="errors.repository_version_name">
          <b-autocomplete
            v-if="versions"
            v-model="versionName"
            :loading="false && versionsList.loading"
            :data="optionsVersions"
            :placeholder="$t('webapp.inbox.all_versions')"
            open-on-focus
            dropdown-position="bottom"/>
        </b-field>
      </div>
    </div>
  </div>
</template>
<script>
import { formatters, LANGUAGES } from '@/utils/index';
import { mapState } from 'vuex';
import _ from 'lodash';


export default {
  name: 'FilterEvaluateExample',
  props: {
    debounceTime: {
      type: Number,
      default: 750,
    },
    intents: {
      type: Array,
      default: null,
    },
    entities: {
      type: Array,
      default: null,
    },
    versions: {
      type: Array,
      default: null,
    },
    languageFilter: {
      type: Boolean,
      default: null,
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
    wrapperClasses() {
      const fieldCount = [this.languageFilter, this.entities, this.versions]
        .reduce((counter, condition) => (condition ? counter + 1 : counter), 1);

      return ['filter-evaluate-example__filters__wrapper',
        `filter-evaluate-example__filters__wrapper__has-${fieldCount}-fields`];
    },
    ...mapState({
      selectedRepository: state => state.Repository.selectedRepository,
    }),
    languages() {
      return Object.keys(this.selectedRepository.evaluate_languages_count)
        .map((lang, index) => ({
          id: index + 1,
          value: lang,
          title: `${LANGUAGES[lang]}`,
        }));
    },
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
      this.$emit('queryStringFormated', { language: value });
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
      this.$emit('queryStringFormated', { search: text });
    }, 500),
    emitIntent: _.debounce(function emitIntent(intent) {
      this.$emit('queryStringFormated', { intent });
    }, 500),
    emitEntity: _.debounce(function emitEntity(entity) {
      this.$emit('queryStringFormated', { entity });
    }, 500),
    emitVersion: _.debounce(function emitVersion(version) {
      this.$emit('queryStringFormated', { repository_version_name: version });
    }, 500),
  },
};
</script>

<style lang="scss" scoped>

@import '~@/assets/scss/variables.scss';

.filter-evaluate-example {
  width: 100%;
  margin: 0 auto .5rem;

  &__filters {
    margin: 1.5rem 0;
    display: grid;
    grid-template-columns: 35% 1fr;
    grid-gap: 3rem;

    @media (max-width: $mobile-width) {
        grid-template-columns: 1fr;
    }

    &__input-text {
      align-self: center;
    }

    &__wrapper {
      display: grid;
      grid-gap: .5rem;

      &__has-2-fields {
        grid-template-columns: 1fr 2fr 2fr;

        @media (max-width: $mobile-width) {
          grid-template-columns: 1fr;
        }
      }

      &__has-3-fields {
        grid-template-columns: 1fr 2fr 2fr 2fr;

        @media (max-width: $mobile-width) {
          grid-template-columns: 1fr;
        }
      }

      &__has-4-fields {
        grid-template-columns: 1fr 2fr 2fr 2fr 2fr;

        @media (max-width: $mobile-width) {
          grid-template-columns: 1fr;
        }
      }

      &__text {
        white-space: nowrap;
        align-self: center;
      }
    }
  }

  &__text {
    margin-top: .5rem;
  }
}
</style>
