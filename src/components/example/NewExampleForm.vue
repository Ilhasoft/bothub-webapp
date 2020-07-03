<template>
  <div>
    <form
      class="columns wrapper is-vcentered is-variable is-2"
      @submit.prevent="onSubmit()"
    >
      <div class="column is-three-fifths">
        <b-field
          :message="errors.text || errors.language"
        >
          <!-- <button @click="mostra">show</button> -->
          <example-text-with-highlighted-entities-input
            id="tour-training-step-1"
            ref="textInput"
            :is-step-blocked="textSelected === null"
            v-model="text"
            :entities="entities"
            :available-entities="entitiesList"
            :formatters="textFormatters"
            :placeholder="$t('webapp.trainings.add_a_sentence')"
            size="normal"
            @textSelected="setTextSelected($event)"
            @submit="onEnter()"
          >
            <language-append-select-input
              slot="append"
              v-model="language"
              class="language-append"
            />
          </example-text-with-highlighted-entities-input>
        </b-field>
      </div>
      <div class="column">
        <b-field
          id="tour-training-step-4"
          :message="errors.intent">
          <b-autocomplete
            v-model="intent"
            :placeholder="$t('webapp.trainings.intent')"
            :data="filteredData"
            :open-on-focus="true"
            dropdown-position="bottom"
            @keyup.enter.native="onEnter()"
          />
        </b-field>
      </div>
      <div class="column is-narrow">
        <b-field>
          <b-tooltip
            :is-active="!isValid && validationErrors.length > 0"
            :label="validationErrors.join(', ')"
            type="is-dark">
            <b-button
              id="tour-training-step-5"
              :disabled="!shouldSubmit "
              :loading="submitting"
              :is-step-blocked="!nextStepTour"
              type="is-primary"
              native-type="submit">
              <slot v-if="!submitting">{{ $t('webapp.trainings.submit') }}</slot>
            </b-button>
          </b-tooltip>
        </b-field>
      </div>
    </form>
    <div class="columns is-variable is-1">
      <div class="column is-three-fifths">
        <b-field :message="errors.entities">
          <entities-input
            ref="entitiesInput"
            v-model="entities"
            :repository="repository"
            :text="text"
            :text-selected="textSelected"
            :available-entities="entitiesList"
            :available-labels="availableLabels"
            @entityAdded="onEntityAdded()"
          />
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
import ExampleTextWithHighlightedEntitiesInput from '@/components/inputs/ExampleTextWithHighlightedEntitiesInput';
import EntitiesInput from '@/components/inputs/EntitiesInput';
import LanguageAppendSelectInput from '@/components/inputs/LanguageAppendSelectInput';

import { mapActions, mapGetters } from 'vuex';
import BH from 'bh';
import { formatters } from '@/utils';


export default {
  name: 'NewExampleForm',
  components: {
    ExampleTextWithHighlightedEntitiesInput,
    EntitiesInput,
    LanguageAppendSelectInput,
  },
  props: {
    repository: {
      type: Object,
      required: true,
    },
    eventStep: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      textSelected: null,
      text: '',
      language: this.repository.language,
      intent: '',
      entities: [],
      errors: {},
      submitting: false,
      entitiesList: [],
      nextStepTour: false,
    };
  },
  computed: {
    ...mapGetters({
      repositoryVersion: 'getSelectedVersion',
    }),
    shouldSubmit() {
      return this.isValid && !this.submitting;
    },
    filteredData() {
      return (this.repository.intents_list || []).filter(intent => intent.startsWith(this.intent));
    },
    validationErrors() {
      const errors = [];

      if (!this.text) {
        errors.push(this.$t('webapp.trainings.empty_text_error'));
      }

      if (!this.intent) {
        errors.push(this.$t('webapp.trainings.intent_error'));
      }

      return errors;
    },
    isValid() {
      return this.validationErrors.length === 0;
    },
    textFormatters() {
      const formattersList = [
        BH.utils.formatters.trimStart(),
        BH.utils.formatters.removeBreakLines(),
        BH.utils.formatters.removeMultipleWhiteSpaces(),
      ];
      formattersList.toString = () => 'textFormatters';
      return formattersList;
    },
    availableEntities() {
      const repositoryEntities = this.repository.entities_list || [];
      const entitiesFlat = this.entities.map(e => e.entity);
      return repositoryEntities
        .concat(entitiesFlat)
        .filter((entity, index, current) => (current.indexOf(entity) === index));
    },
    availableLabels() {
      const repositoryLabels = this.repository.labels_list || [];

      return repositoryLabels
        .filter(label => !!label)
        .filter((label, index, current) => (current.indexOf(label) === index));
    },
    data() {
      const {
        text,
        language,
        intent,
        entities,
      } = this;

      return {
        text,
        language,
        intent,
        entities,
      };
    },
  },
  watch: {
    intent() {
      if (!this.intent || this.intent.length <= 0) return;
      this.intent = formatters.bothubItemKey()(this.intent);
    },
  },
  mounted() {
    this.entitiesList = this.availableEntities;
  },
  methods: {
    ...mapActions([
      'newExample',
    ]),
    onEnter() {
      if (this.shouldSubmit) this.onSubmit();
    },
    setTextSelected(value) {
      this.textSelected = value;
    },
    onEntityAdded() {
      if (this.$refs.textInput.clearSelected) {
        /* istanbul ignore next */
        this.$refs.textInput.clearSelected();
      }
      this.$emit('eventStep');
    },
    async onSubmit() {
      this.errors = {};
      this.submitting = true;

      try {
        await this.newExample({
          repository: this.repository.uuid,
          repositoryVersion: this.repositoryVersion,
          ...this.data,
        });

        this.text = '';
        this.intent = '';
        this.entities = [];
        this.submitting = false;

        this.$emit('created');
        this.$emit('eventStep');
        this.nextStepTour = !this.nextStepTour;
        return true;
      } catch (error) {
        /* istanbul ignore next */
        const data = error.response && error.response.data;
        /* istanbul ignore next */
        if (data) {
          /* istanbul ignore next */
          this.$buefy.toast.open({
            message: this.$t('webapp.trainings.intention_or_sentence_already_exist'),
            type: 'is-danger',
          });
          this.errors = data;
        }
        /* istanbul ignore next */
        this.submitting = false;
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.language-append {
  flex-grow: 0;
}

.wrapper {
  margin: 1rem 0;
}

.columns.is-variable .column {
  padding-left: 0;
}

.columns.is-variable .column:last-child {
  padding-right: 0;
}
</style>
