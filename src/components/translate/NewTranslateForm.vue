<template>
  <div>
    <form
      class="columns is-variable is-2"
      @submit.prevent="onSubmit()">
      <div class="column">
        <b-field
          :errors="errors.text"
          label>
          <example-text-with-highlighted-entities-input
            id="tour-translate-step-4"
            ref="textInput"
            :is-previous-disabled="true"
            v-model="text"
            :is-step-blocked="text.length === 0"
            :entities="entities"
            :available-entities="repository.entities"
            :placeholder="$t('webapp.translate.translate_sentence')"
            size="normal"
            @textSelected="setTextSelected($event)" />
        </b-field>
      </div>
      <div class="column is-narrow">
        <b-field>
          <b-button
            id="tour-translate-step-5"
            :is-next-disabled="true"
            :is-previous-disabled="true"
            :disabled="!isValid || submitting"
            type="is-secondary"
            native-type="submit">{{ $t('webapp.translate.submit_translation') }}</b-button>
        </b-field>
      </div>
    </form>
    <div class="columns is-variable is-1">
      <div class="column">
        <b-field :message="errors.entities">
          <entities-input
            ref="entitiesInput"
            v-model="entities"
            :repository="repository"
            :text="text"
            :text-selected="textSelected"
            :available-entities="repository.entities"
            :available-add-label="false"
            @entityAdded="onEntityAdded($event)"
            @entityEdited="onEditEntity($event)" />
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ExampleTextWithHighlightedEntitiesInput from '@/components/inputs/ExampleTextWithHighlightedEntitiesInput';
import EntitiesInput from '@/components/inputs/EntitiesInput';


const components = {
  ExampleTextWithHighlightedEntitiesInput,
  EntitiesInput,
};

export default {
  name: 'NewTranslateForm',
  components,
  props: {
    extraEntitiesList: {
      type: Array,
      default: () => ([]),
    },
    exampleId: {
      type: Number,
      required: true,
    },
    translateTo: {
      type: String,
      required: true,
    },
    repository: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      text: '',
      entities: [],
      textSelected: null,
      errors: {},
      submitting: false,
      blockedNextStepTutorial: true,
    };
  },
  computed: {
    isValid() {
      return !!this.text;
    },
  },
  watch: {
    text() {
      this.errors = {};
    },
    entities: {
      handler() {
        this.errors = {};
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions([
      'newTranslation',
    ]),
    setTextSelected(value) {
      this.textSelected = value;
    },
    onEntityAdded() {
      if (this.$refs.textInput.clearSelected) {
        this.$refs.textInput.clearSelected();
      }
    },
    onEditEntity(entity) {
      if (this.$refs.textInput.emitTextSelected) {
        this.$refs.textInput.emitTextSelected({
          selectionStart: entity.start,
          selectionEnd: entity.end,
        });
      }
    },
    async onSubmit() {
      this.errors = {};
      this.submitting = true;
      try {
        await this.newTranslation({
          exampleId: this.exampleId,
          language: this.translateTo,
          text: this.text,
          entities: this.entities,
        });

        this.text = '';
        this.entities = [];

        this.submitting = false;
        this.$emit('translated');
        return true;
      } catch (error) {
        const { language, ...data } = error.response && error.response.data;

        if (data) {
          this.errors = data;
        }

        this.submitting = false;
        if (language) {
          this.$bhToastNotification({
            message: language.join(' '),
            type: 'danger',
          });
        }
      }

      this.blockedNextStepTutorial = !this.blockedNextStepTutorial;
      this.$emit('eventStep');

      return false;
    },
  },
};
</script>
