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
            :open-on-focus="true"
            :data="optionsIntents"
            :formatters="inputFormatters"
            :placeholder="$t('webapp.evaluate.all_intents')" />
        </b-field>
        <b-field
          :message="errors.intent">
          <b-autocomplete
            v-model="entity"
            :open-on-focus="true"
            :data="optionsEntities"
            :formatters="inputFormatters"
            :placeholder="$t('webapp.evaluate.all_entities')" />
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
    languageFilter: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      text: '',
      intent: '',
      entity: '',
      language: null,
      setTimeoutId: null,
      errors: {},
    };
  },
  computed: {
    wrapperClasses() {
      return ['filter-evaluate-example__filters__wrapper',
        this.languageFilter ? 'filter-evaluate-example__filters__wrapper__has-language-filter' : ''];
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
      this.$emit('queryStringFormated', { search: value });
    },
    intent: _.debounce(function emitIntent(value) {
      this.$emit('queryStringFormated', { intent: value });
    }, 500),
    entity: _.debounce(function emitEntity(value) {
      this.$emit('queryStringFormated', { entity: value });
    }, 500),
    language: _.debounce(function emitLanguage(value) {
      this.$emit('queryStringFormated', { language: value });
    }, 500),
  },
};
</script>

<style lang="scss">

@import '~@/assets/scss/variables.scss';

.field:not(:last-child) {
  margin-bottom: 0;
}

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
      grid-template-columns: 1fr 2fr 2fr;

      @media (max-width: $mobile-width) {
        grid-template-columns: 1fr;
      }

      &__has-language-filter {
        grid-template-columns: 1fr 2fr 2fr 2fr;

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
