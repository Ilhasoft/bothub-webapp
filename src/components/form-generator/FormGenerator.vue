<template>
  <div>
    <messages :msgs="msgs" />
    <b-field
      v-for="field in fields"
      :key="field.name"
      :label="field.label"
      :type="field.errors && 'is-danger'"
      :message="field.errors || field.helpText">
      <component
        :v-if="field.inputComponent"
        :is="field.inputComponent"
        v-bind="field.inputProps"
        v-model="formData[field.name]"
        @input="update()" />
    </b-field>
  </div>
</template>

<script>
import Messages from '@/components/shared/Messages';
import StringInput from './inputs/StringInput';
import ChoiceInput from './inputs/ChoiceInput';
import BooleanInput from './inputs/BooleanInput';

const relatedInputComponent = {
  string: StringInput,
  slug: StringInput,
  choice: ChoiceInput,
  boolean: BooleanInput,
};

const components = {
  Messages,
},

export default {
  name: 'FormGenerator',
  components,
  props: {
    schema: {
      required: true,
      type: Object,
    },
    errors: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    this.update();
  },
  data() {
    return {
      formData: {},
    };
  },
  computed: {
    fields() {
      return Object.keys(this.schema)
        .map((name) => {
          const {
            type,
            label,
            help_text: helpText,
            read_only: readOnly,
            ...inputProps
          } = this.schema[name];

          if (type === 'field' || readOnly) return false;

          return {
            type,
            name,
            label,
            helpText,
            inputProps,
            inputComponent: relatedInputComponent[type],
            errors: this.errors[name],
          };
        })
        .filter(field => !!field);
    },
    msgs() {
      return (this.errors.non_field_errors &&
        this.errors.non_field_errors.map(text => ({ text, class: 'error' }))) || [];
    },
  },
  methods: {
    update() {
      this.$emit('input', this.formData);
    },
  },
};
</script>
