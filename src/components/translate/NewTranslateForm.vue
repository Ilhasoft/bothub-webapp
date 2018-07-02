<template>
  <form @submit.prevent="onSubmit()">
    <example-with-entities-input
      v-model="data"
      :errors="errors"
      :extraEntitiesList="extraEntitiesList"
      :allEntities="repository.entities" />
    <div class="field has-text-right">
      <button
        type="submit"
        class="button is-primary"
        :disabled="submitting">Submit Translation</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import ExampleWithEntitiesInput from '@/components/inputs/ExampleWithEntitiesInput';


const components = {
  ExampleWithEntitiesInput,
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
        const { language, ...data } = error.response && error.response.data;
        if (data) {
          this.errors = data;
        }
        this.submitting = false;
        if (language) {
          /* istanbul ignore next */
          this.$toast.open({
            message: language.join(' '),
            type: 'is-danger',
          });
        }
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
