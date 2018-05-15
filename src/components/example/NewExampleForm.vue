<template>
  <form @submit.prevent="onSubmit()">
    <div class="field inputs">
      <div class="inputs-text">
        <entity-text-highlighted-input
          v-model="data.text"
          :errors="errors.text"
          @selected="updateSelected($event)"
          :entities="data.entities" />
      </div>
      <div class="inputs-entities">
        <entities-as-badges
          v-model="data.entities"
          :text="data.text"
          :selected="selected"
          :extraEntitiesList="extraEntitiesList" />
      </div>
    </div>
    <div class="field level">
      <div class="level-left">
        <div class="level-item">
          <b-field
            horizontal
            label="Intent">
            <b-input
              type="text"
              v-model="data.intent" />
          </b-field>
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
import EntityTextHighlightedInput from './form/EntityTextHighlightedInput';
import EntitiesAsBadges from './form/EntitiesAsBadges';

const components = {
  EntityTextHighlightedInput,
  EntitiesAsBadges,
};

export default {
  name: 'NewExampleForm',
  components,
  props: {
    extraEntitiesList: {
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
        text: '',
        entities: [],
        intent: '',
      },
      selected: { start: 0, end: 0 },
      submitting: false,
      errors: {},
    };
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
          ...this.data,
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

