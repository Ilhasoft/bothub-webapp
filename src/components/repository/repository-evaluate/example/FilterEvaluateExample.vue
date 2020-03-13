<template>
  <div class="filter-evaluate-example">
    <div class="filter-evaluate-example__filters">
      <b-field
        :errors="errors.intent"
        class="filter-evaluate-example__filters__input-text">
        <bh-text
          v-model="text"
          :debounce="debounceTime">
          <div slot="append">
            <bh-icon-button
              value="magnify"
              size="medium"
              type="submit" />
          </div>
        </bh-text>
      </b-field>
      <div class="filter-evaluate-example__filters__wrapper">
        <span class="filter-evaluate-example__filters__wrapper__text">
          {{ $t('webapp.dashboard.filter_by') }}:
        </span>
        <b-field
          :errors="errors.intent">
          <bh-autocomplete
            v-model="intent"
            :data="intents || []"
            :formatters="inputFormatters"
            :placeholder="$t('webapp.evaluate.all_intents')" />
        </b-field>
        <b-field
          :errors="errors.intent">
          <bh-autocomplete
            v-model="entity"
            :data="entities || []"
            :formatters="inputFormatters"
            :placeholder="$t('webapp.evaluate.all_entities')" />
        </b-field>
        <b-field v-if="languageFilter && languages">
          <b-select
            v-model="language"
            placeholder="Language"
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
              All languages
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
.filter-evaluate-example {
  width: 100%;
  margin: 0 auto .5rem;

  &__filters {
    display: grid;
    grid-template-columns: 35% 1fr;
    grid-gap: 3rem;

    &__input-text {
      align-self: center;
    }

    &__wrapper {
      display: grid;
      grid-template-columns: 11% 1fr 1fr 1fr;
      grid-gap: .5rem;

      &__text {
        align-self: center;
      }
    }
  }

  &__text {
    margin-top: .5rem;
  }
}
</style>
