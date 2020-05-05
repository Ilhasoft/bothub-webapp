<template>
  <div>
    <form
      class="columns is-variable is-2"
      @submit.prevent="onSubmit()"
    >
      <div class="column is-three-fifths">
        <bh-field
          :errors="errors.text || errors.language"
        >
          <example-text-with-highlighted-entities-input
            ref="textInput"
            v-model="text"
            :entities="entities"
            :available-entities="entitiesList"
            :formatters="textFormatters"
            :placeholder="$t('webapp.trainings.add_a_sentence')"
            size="normal"
            @textSelected="setTextSelected($event)"
          >
            <language-append-select-input
              slot="append"
              v-model="language"
              class="language-append"
            />
          </example-text-with-highlighted-entities-input>
        </bh-field>
      </div>
      <div class="column">
        <bh-field
          :errors="errors.intent">
          <b-autocomplete
            v-model="intent"
            :placeholder="$t('webapp.trainings.intent')"
            :data="filteredData"
            :open-on-focus="true"
            size="is-medium"
            @keyup.enter.native="onEnter()"
          />
          <!-- <bh-autocomplete
            v-model="intent"
            :data="repository.intents_list || []"
            :formatters="intentFormatters"
            :placeholder="$t('webapp.trainings.intent')"
            size="normal" /> -->
        </bh-field>
      </div>
      <div class="column is-narrow">
        <bh-field>
          <bh-button
            :disabled="!shouldSubmit "
            :tooltip-hover="!isValid ? validationErrors : null"
            :loading="submitting"
            primary
            size="normal"
            type="submit"
          >
            <slot v-if="!submitting">{{ $t('webapp.trainings.submit') }}</slot>
          </bh-button>
        </bh-field>
      </div>
    </form>
    <div class="columns is-variable is-1">
      <div class="column is-three-fifths">
        <bh-field :errors="errors.entities">
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
        </bh-field>
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
        errors.push('You need type a text to sentence');
      }

      if (!this.intent) {
        errors.push('Intent is required');
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
    intentFormatters() {
      const formattersList = [
        formatters.bothubItemKey(),
      ];
      formattersList.toString = () => 'intentFormatters';
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
  mounted() {
    this.entitiesList = this.availableEntities;
  },
  methods: {
    ...mapActions([
      'newExample',
    ]),
    onEnter() {
      console.log(this.intent);
      if(this.shouldSubmit) this.onSubmit();
    },
    setTextSelected(value) {
      this.textSelected = value;
    },
    onEntityAdded() {
      if (this.$refs.textInput.clearSelected) {
        /* istanbul ignore next */
        this.$refs.textInput.clearSelected();
      }
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
</style>
