<template>
  <div>
    <form
      class="columns is-variable is-2"
      @submit.prevent="onSubmit()">
      <div class="column">
        <bh-field
          :errors="errors.text"
          label>
          <example-text-with-highlighted-entities-input
            ref="textInput"
            v-model="text"
            :entities="entities"
            :available-entities="repository.entities"
            placeholder="Translate sentence"
            size="medium"
            @textSelected="setTextSelected($event)" />
        </bh-field>
      </div>
      <div class="column is-narrow">
        <bh-field label>
          <bh-button
            :disabled="!isValid || submitting"
            secondary
            type="submit">Submit Translation</bh-button>
        </bh-field>
      </div>
    </form>
    <div class="columns is-variable is-1">
      <div class="column">
        <bh-field :errors="errors.entities">
          <entities-input
            ref="entitiesInput"
            v-model="entities"
            :repository="repository"
            :text="text"
            :text-selected="textSelected"
            :available-entities="repository.entities"
            custom-label-disabled
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
