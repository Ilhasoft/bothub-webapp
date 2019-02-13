<template>
  <div>
    <messages :msgs="msgs" />
    <b-field
      v-for="field in attrs"
      v-show="field.type !== 'hidden'"
      :key="field.name"
      :label="field.label"
      :type="field.errors && 'is-danger'"
      :message="field.errors || field.helpText">
      <component
        :v-if="field.inputComponent"
        :is="field.InputComponent"
        v-bind="field.inputProps"
        v-model="formData[field.name]"
        :initial-data="initialData[field.name]"
        @input="update()" />
    </b-field>
  </div>
</template>

<script>
import _ from 'lodash';
import Messages from '@/components-v1/shared/Messages';
import StringInput from './inputs/StringInput';
import ChoiceInput from './inputs/ChoiceInput';
import BooleanInput from './inputs/BooleanInput';
import MultipleChoice from './inputs/MultipleChoice';
import TextInput from './inputs/TextInput';
import EmailInput from './inputs/EmailInput';
import PasswordInput from './inputs/PasswordInput';

const relatedInputComponent = {
  field: StringInput,
  string: StringInput,
  slug: StringInput,
  choice: ChoiceInput,
  boolean: BooleanInput,
  'multiple choice': MultipleChoice,
  text: TextInput,
  email: EmailInput,
  password: PasswordInput,
  hidden: StringInput,
};

const components = {
  Messages,
};

export default {
  name: 'FormGenerator',
  components,
  props: {
    drfModelInstance: {
      type: Object,
      default: () => ({}),
    },
    schema: {
      required: true,
      type: Object,
    },
    errors: {
      type: Object,
      default: () => ({}),
    },
    initialData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      formData: {},
    };
  },
  computed: {
    attrs() {
      return _.filter(
        _.map(
          this.drfModelInstance.attrsDescription,
          (value, key) => ({
            type: value.type,
            name: key,
            label: value.label,
            helpText: value.help_text,
            description: value,
            InputComponent: relatedInputComponent[value.type] || StringInput,
            inputProps: {
              required: value.required,
              read_only: value.read_only,
              choices: value.choices,
            },
            errors: this.drfModelInstance.errors[key],
          }),
        ),
        attr => !attr.description.read_only,
      );
    },
    msgs() {
      /* istanbul ignore next */
      return (this.errors.non_field_errors
        && this.errors.non_field_errors.map(text => ({ text, class: 'error' }))) || [];
    },
  },
  mounted() {
    this.update();
  },
  methods: {
    update() {
      this.$emit('input', this.formData);
    },
  },
};
</script>
