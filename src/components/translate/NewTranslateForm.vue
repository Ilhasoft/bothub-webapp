<template>
  <div>
    <form
      class="columns is-variable is-2"
      @submit.prevent="onSubmit()">
      <div class="column">
        <bh-field
          label
          :errors="errors.text">
          <example-text-with-highlighted-entities-input
            ref="textInput"
            v-model="text"
            placeholder="Translate sentence"
            size="medium"
            :entities="entities"
            :availableEntities="repository.entities"
            @textSelected="setTextSelected($event)" />
        </bh-field>
      </div>
      <div class="column is-narrow">
        <bh-field label>
          <bh-button
            secondary
            type="submit"
            size="medium"
            :disabled="!isValid || submitting">Submit Translation</bh-button>
        </bh-field>
      </div>
    </form>
    <div class="columns is-variable is-1">
      <div class="column">
        <bh-field :errors="errors.entities">
          <entities-input
            customLabelDisabled
            v-model="entities"
            :repository="repository"
            :text="text"
            :textSelected="textSelected"
            :availableEntities="repository.entities"
            @entityAdded="onEntityAdded($event)"
            @entityEdited="onEditEntity($event)" />
        </bh-field>
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
  data() {
    return {
      text: '',
      entities: [],
      textSelected: null,
      errors: {},
      submitting: false,
    };
  },
  computed: {
    isValid() {
      return !!this.text;
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
          this.$toast.open({
            message: language.join(' '),
            type: 'is-danger',
          });
        }
      }

      return false;
    },
  },
};
</script>
