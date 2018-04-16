<template>
  <div>
    <b-field
      v-for="field in fields"
      :key="field.name"
      :label="field.label"
      :message="field.helpText">
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
import StringInput from './inputs/StringInput';
import ChoiceInput from './inputs/ChoiceInput';
import BooleanInput from './inputs/BooleanInput';

const relatedInputComponent = {
  string: StringInput,
  slug: StringInput,
  choice: ChoiceInput,
  boolean: BooleanInput,
};

export default {
  name: 'FormGenerator',
  props: {
    schema: {
      required: true,
      type: Object,
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
          };
        })
        .filter(field => !!field);
    },
  },
  methods: {
    update() {
      this.$emit('input', this.formData);
    },
  },
};
</script>
