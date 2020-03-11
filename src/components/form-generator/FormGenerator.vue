<template>
  <div>
    <messages :msgs="msgs" />
    <b-field
      v-for="field in fields"
      v-show="field.type !== 'hidden'"
      :key="field.name"
      :label="field.label"
      :type="field.errors && 'is-danger'"
      :message="field.errors || field.helpText">
      <component
        :v-if="field.inputComponent"
        :is="field.inputComponent"
        v-bind="field.inputProps"
        v-model="formData[field.name]"
        :initial-data="initialData[field.name]"
        @input="update()" />
    </b-field>
  </div>
</template>

<script>
import Messages from '@/components/shared/Messages';
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
  textarea: TextInput,
};

const components = {
  Messages,
};

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
    initialData: {
      type: Object,
      default: () => ({}),
    },
    settings: {
      type: Boolean,
      default: false,
    },
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
            style,
            help_text: helpText,
            ...inputProps
          } = this.schema[name];

          const shouldHide = style && typeof style.show === 'boolean' && !style.show;
          const shouldShowSettings = this.settings && style && typeof style.only_settings === 'boolean' && style.only_settings;

          if (!shouldShowSettings && shouldHide) return false;

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
