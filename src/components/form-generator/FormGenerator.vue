<template>
  <div>
    <messages :msgs="msgs" />
    <component
      :is="grouped ? 'b-field' : 'div'"
      :grouped="grouped"
      :group-multiline="grouped">
      <b-field
        v-for="field in fields"
        v-show="field.type !== 'hidden'"
        :key="field.name"
        :label="field.label"
        :type="field.errors && 'is-danger'"
        :message="!showLabels ? field.errors : field.errors || (hideHelp ? '' : field.helpText)"
        :class="{'field-content' : !showLabels, [`field-${field.type}`]: true}">
        <div
          slot="label"
          :class="{'field-label': true, [`field-${field.type}__title`]: true}">
          <span
            v-if="showLabels">
            {{ field.label }}
          </span>
          <help-widget
            v-if="hasHelpIcon(field)"
            :article-id="helpArticleId" />
        </div>
        <component
          :v-if="field.inputComponent"
          :is="field.inputComponent"
          v-bind="field.inputProps"
          :label-placeholder="showLabels ? '' : field.label"
          :show-max-length="availableMaxLength"
          v-model="formData[field.name]"
          :initial-data="initialData[field.name]"
          :label="field.label"
          :fetch="field.fetch"
          :help-text="hideHelp ? '' : field.helpText"
          :compact="!showLabels"
          :class="{
            'languageNewIntelligence': field.name === 'language' && newIntelligenceForms,
            'switchNewIntelligence': field.name === 'is_private' && newIntelligenceForms,
            'input-content': !showLabels,
            'field-generator-field': true,
          }"
          @input="update()"
        />
      </b-field>
    </component>
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
import ImageInput from './inputs/ImageInput';
import FetchChoiceInput from './inputs/FetchChoiceInput';
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
  image: ImageInput,
  'fetch choice': FetchChoiceInput,
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
    availableMaxLength: {
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
    grouped: {
      type: Boolean,
      default: false,
    },
    settings: {
      type: Boolean,
      default: false,
    },
    hideHelp: {
      type: Boolean,
      default: null,
    },
    newIntelligenceForms: {
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
            fetch,
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
            fetch,
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

// .languageNewIntelligence{
//   margin-top: 5.5rem;
// }
// .switchNewIntelligence{
//   padding-top: 5.2rem;
// }
.field-generator-field {
  margin-bottom: 1rem;
}

.field-content {
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
.field-image {
  margin-left: 1.563rem;
  &__title {
    justify-content: center;
    margin: 0;
  }
}
.field-textarea {
  min-width: 70%;
}
</style>
