<template>
  <div>
    <messages :msgs="msgs" />
    <b-field
      v-for="field in fields"
      v-show="field.type !== 'hidden'"
      :key="field.name"
      :label="field.label"
      :type="field.errors && 'is-danger'"
      :message="!showLabels ? field.errors : field.errors || field.helpText"
      :class="!showLabels ? 'field-content' : ''">
      <div
        slot="label"
        class="field-label">
        <span v-if="showLabels">
          {{ field.label }}
        </span>
        <help-widget
          v-if="hasHelpIcon(field)"
          :article-id="helpArticleId" />
      </div>
      <b-field :class="!showLabels ? 'input-content' : ''">
        <component
          :v-if="field.inputComponent"
          :is="field.inputComponent"
          v-bind="field.inputProps"
          :label-placeholder="field.label"
          :show-max-lenght="availableMaxLenght"
          v-model="formData[field.name]"
          :initial-data="initialData[field.name]"
          :compact="!showLabels"
          @input="update()"/>
      </b-field>
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
import HelpWidget from '@/components/shared/HelpWidget';

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
  HelpWidget,
};

export default {
  name: 'FormGenerator',
  components,
  props: {
    schema: {
      required: true,
      type: Object,
    },
    availableMaxLenght: {
      type: Boolean,
      default: true,
    },
    errors: {
      type: Object,
      default: () => ({}),
    },
    showLabels: {
      type: Boolean,
      default: true,
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
    helpArticleId() {
      return process.env.BOTHUB_WEBAPP_LIGHTHOUSE_ALGORITHM_ARTICLE_ID;
    },
  },
  mounted() {
    this.update();
  },
  methods: {
    update() {
      this.$emit('input', this.formData);
    },
    hasHelpIcon(field) {
      return field.name === 'algorithm';
    },
  },
};
</script>

<style lang="scss" scoped>
.field-content{
height: 58px;
padding-bottom: 0px;
margin-bottom: 0px;
}
.input-content{
padding-bottom: 0px;
margin-bottom: 0px;
}
.field-label {
    display: flex;
    align-items: center;
}
</style>
