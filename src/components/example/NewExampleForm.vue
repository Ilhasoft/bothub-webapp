<template>
  <form @submit.prevent="onSubmit()">
    <messages :msgs="nonFieldsErrors" />
    <example-with-entities-input
      v-model="data.textAndEntities"
      :errors="errors"
      :extraEntitiesList="extraEntitiesList"
      :allEntities="repository.entities" />
    <div class="field level">
      <div class="level-left">
        <div class="level-item">
          <div>
            <b-field
              horizontal
              label="Intent"
              :type="errors.intent && 'is-danger'"
              :message="errors.intent">
              <intent-input
                v-model="data.intent"
                :intents="extraIntentsList" />
            </b-field>
          </div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <button
            type="submit"
            class="button is-primary"
            :disabled="submitting">Submit example</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import Messages from '@/components/shared/Messages';
import ExampleWithEntitiesInput from '@/components/inputs/ExampleWithEntitiesInput';
import IntentInput from '@/components/inputs/IntentInput';


const components = {
  ExampleWithEntitiesInput,
  Messages,
  IntentInput,
};

export default {
  name: 'NewExampleForm',
  components,
  props: {
    extraEntitiesList: {
      type: Array,
      default: () => ([]),
    },
    extraIntentsList: {
      type: Array,
      default: () => ([]),
    },
    repository: {
      type: [String, Object],
      required: true,
    },
  },
  data() {
    return {
      data: {
        textAndEntities: {
          text: '',
          entities: [],
        },
        intent: '',
      },
      selected: { start: 0, end: 0 },
      submitting: false,
      errors: {},
    };
  },
  computed: {
    nonFieldsErrors() {
      /* istanbul ignore next */
      return (this.errors.non_field_errors || [])
        .map(text => ({
          class: 'error',
          text,
        }));
    },
  },
  methods: {
    ...mapActions([
      'newExample',
    ]),
    updateSelected(value) {
      /* istanbul ignore next */
      this.selected = value;
    },
    async onSubmit() {
      this.errors = {};
      this.submitting = true;

      try {
        await this.newExample({
          repository: this.repository.uuid || this.repository,
          intent: this.data.intent,
          ...this.data.textAndEntities,
        });
        this.data = {
          text: '',
          entities: [],
          intent: '',
        };

        this.submitting = false;
        this.$emit('created');
        return true;
      } catch (error) {
        const data = error.response && error.response.data;
        if (data) {
          this.errors = data;
        }
        this.submitting = false;
      }

      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/utilities.scss';

.inputs {
  background-color: $grey-lighter;
  border-radius: 3px 3px 4px 4px;

  &-entities {
    padding: 8px;
  }
}
</style>
