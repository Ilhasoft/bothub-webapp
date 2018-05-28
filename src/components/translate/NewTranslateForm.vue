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
          :extraEntitiesList="extraEntitiesList"
          :errors="errors.entities" />
      </div>
    </div>
    <div class="field has-text-right">
      <button
        type="submit"
        class="button is-primary"
        :disabled="submitting">Submit Translation</button>
    </div>
  </form>
</template>

<script>
import EntityTextHighlightedInput from '@/components/example/form/EntityTextHighlightedInput';
import EntitiesAsBadges from '@/components/example/form/EntitiesAsBadges';
import { mapActions } from 'vuex';


const components = {
  EntityTextHighlightedInput,
  EntitiesAsBadges,
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
  },
  watch: {
    data: {
      handler() {
        this.errors = {};
      },
      deep: true,
    },
  },
  data() {
    return {
      data: {
        text: '',
        entities: [],
      },
      errors: {},
      selected: {},
      submitting: false,
    };
  },
  methods: {
    ...mapActions([
      'newTranslation',
    ]),
    async onSubmit() {
      this.errors = {};
      this.submitting = true;

      try {
        await this.newTranslation({
          exampleId: this.exampleId,
          language: this.translateTo,
          text: this.data.text,
          entities: this.data.entities,
        });
        this.data = {
          text: '',
          entities: [],
        };

        this.submitting = false;
        this.$emit('translated');
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
    updateSelected(value) {
      /* istanbul ignore next */
      this.selected = value;
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
