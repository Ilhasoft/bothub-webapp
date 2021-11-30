<template>
  <div class="filter-evaluate-example">
    <!-- <pre>
      {{Logs()}}
    </pre> -->

    <div class="filter-evaluate-example__filters">
      <b-field :errors="errors.intent" class="filter-evaluate-example__filters__input-text">
        <b-input v-model="text" :debounce="debounceTime" icon-right="magnify" />
      </b-field>
      <div :class="wrapperClasses">
        <div class="filter-evaluate-example__filters__wrapper__text">
          {{ $t("webapp.dashboard.filter_by") }}:
        </div>
        <b-field :message="errors.intent">
          <b-autocomplete
            v-model="intent"
            :data="optionsIntents"
            :formatters="inputFormatters"
            :placeholder="$t('webapp.evaluate.all_intents')"
            open-on-focus
            dropdown-position="bottom"
          />
        </b-field>
        <b-field v-if="entities" :message="errors.entity">
          <b-autocomplete
            v-model="entity"
            :data="optionsEntities"
            :formatters="inputFormatters"
            :placeholder="$t('webapp.evaluate.all_entities')"
            open-on-focus
            dropdown-position="bottom"
          />
        </b-field>
        <b-field v-if="languageFilter && languages">
          <b-select v-model="language" :placeholder="$t('webapp.evaluate.all_languages')" expanded>
            <option
              v-for="language in languages"
              :key="language.id"
              :selected="language.value === language"
              :value="language.value"
            >
              {{ language.title }}
            </option>
            <option :value="null">
              {{ $t("webapp.home.all_languages") }}
            </option>
          </b-select>
        </b-field>
        <b-field>
          <b-select v-model="intentConfidence" placeholder="Confidence" expanded>
            <option
              v-for="confidence in confidences"
              :key="confidence.id"
              :selected="confidence.value === confidence"
              :value="confidence.value"
            >
              {{ confidenceRange(confidence.nlp_log.intent.confidence) }}
            </option>
          </b-select>
        </b-field>
        <b-field v-if="confidences" :message="errors.confidence">
          <b-autocomplete
            v-model="confidence"
            :data="optionsConfidence"
            :formatters="inputFormatters"
            placeholder="novo"
            open-on-focus
            dropdown-position="bottom"
          />
        </b-field>
        <b-field :message="errors.repository_version_name" v-show="hasVersion">
          <b-autocomplete
            v-if="versions"
            v-model="versionName"
            :loading="false && versionsList.loading"
            :data="optionsVersions"
            :placeholder="$t('webapp.inbox.all_versions')"
            open-on-focus
            dropdown-position="bottom"
          />
        </b-field>
      </div>
    </div>
  </div>
</template>
<script>
import { formatters, LANGUAGES } from '@/utils/index';
import { mapGetters, mapActions } from 'vuex';
import _ from 'lodash';

export default {
  name: 'FilterEvaluateExample',
  props: {
    debounceTime: {
      type: Number,
      default: 750
    },
    intents: {
      type: Array,
      default: null
    },
    entities: {
      type: Array,
      default: null
    },
    versions: {
      type: Array,
      default: null
    },
    languageFilter: {
      type: Boolean,
      default: null
    },
    hasVersion: {
      type: Boolean,
      default: true
    }
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
      confidences: []
    };
  },
  computed: {
    ...mapGetters({
      repository: 'getCurrentRepository'
    }),
    wrapperClasses() {
      const fieldCount = [
        this.languageFilter,
        this.entities,
        this.hasVersion ? this.versions : ''
      ].reduce((counter, condition) => (condition ? counter + 1 : counter), 1);

      return [
        'filter-evaluate-example__filters__wrapper',
        `filter-evaluate-example__filters__wrapper__has-${fieldCount}-fields`
      ];
    },
    languages() {
      return Object.keys(this.repository.evaluate_languages_count).map((lang, index) => ({
        id: index + 1,
        value: lang,
        title: `${LANGUAGES[lang]}`
      }));
    },
    filterConfidence(){
      if (this.confidences !== null) {
        return this.confidences.filter(
          confidence => confidence
            .toString()
            .toLowerCase()
            .indexOf(this.intent.toLowerCase()) >= 0
        );
      }
      return [];
    },
    optionsConfidence(){
      return this.filterConfidence.map(confidence => confidence);
    },
    filterIntents() {
      if (this.intents !== null) {
        return this.intents.filter(
          intent => intent
            .toString()
            .toLowerCase()
            .indexOf(this.intent.toLowerCase()) >= 0
        );
      }
      return [];
    },
    optionsIntents() {
      return this.filterIntents.map(intent => intent);
    },
    filterEntities() {
      if (this.entities !== null) {
        return this.entities.filter(
          entity => entity.value
            .toString()
            .toLowerCase()
            .indexOf(this.entity.toLowerCase()) >= 0
        );
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
      const formattersList = [formatters.bothubItemKey()];
      formattersList.toString = () => 'inputFormatters';
      return formattersList;
    }
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
    }
  },
  mounted() {
    this.setDefaultLanguage();
  },
  methods: {
    ...mapActions(['getLogs']),
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
    emitConfidence: _.debounce(function emitConfidence(confidence) {
      this.$emit('querystringformatted', { confidence });
    }, 500),
    setDefaultLanguage() {
      if (!this.hasVersion) {
        this.language = this.repository.language;
      }
    },
    async Logs() {
      const response = await this.getLogs();
      this.intentConfidence = response.data.results?.[0]?.nlp_log.intent.confidence;

      console.log(this.intentConfidence);
      response.data.results.forEach(({ nlp_log }) => {
        this.confidences.push({
          nlp_log
        });
        console.log(this.confidences);
      });
    },
    confidenceRange() {
      if (this.intentConfidence >= 0.9) {
        return '90% - 100%';
      } if (this.intentConfidence >= 0.80 && this.intentConfidence < 0.90) {
        return '80% - 90%';
      }
      if (this.intentConfidence >= 0.70 && this.intentConfidence < 0.80) {
        return '70% - 80%';
      }
      if (this.intentConfidence >= 0.60 && this.intentConfidence < 0.70) {
        return '60% - 70%';
      }
      if (this.intentConfidence >= 0.50 && this.intentConfidence < 0.60) {
        return '50% - 60%';
      }
      if (this.intentConfidence >= 0.40 && this.intentConfidence < 0.50) {
        return '40% - 50%';
      }
      if (this.intentConfidence >= 0.30 && this.intentConfidence < 0.40) {
        return '30% - 40%';
      }
      if (this.intentConfidence >= 0.20 && this.intentConfidence < 0.30) {
        return '20% - 30%';
      }
      if (this.intentConfidence >= 0.10 && this.intentConfidence < 0.20) {
        return '10% - 20%';
      }
      if (this.intentConfidence >= 0 && this.intentConfidence < 0.10) {
        return '0% - 10%';
      }
      return this.intentConfidence;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/variables.scss";

.filter-evaluate-example {
  width: 100%;
  margin: 0 auto 0.5rem;

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
      grid-gap: 0.5rem;

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
        height: 100%;
        padding: 0.5rem;
      }
    }
  }

  &__text {
    margin-top: 0.5rem;
  }
}
</style>
