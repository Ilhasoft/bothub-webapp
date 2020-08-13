<template>
  <div>
    <div class="columns is-variable is-1">
      <div
        class="column is-half entity-form">
        <span
          slot="label"
          class="entity-form__label"><span
            :class="entityClass"
            class="is-rounded">{{ selectedText }}</span> is</span>
        <b-field
          id="tour-training-step-3"
          :is-previous-disabled="true">
          <b-autocomplete
            ref="entityInputField"
            :data="availableEntities"
            expanded
            open-on-focus
            dropdown-position="down"
            icon-right="close"
            icon-right-clickable
            @input="handleChange"
            @icon-right-click="removeEntity()"/>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { formatters } from '@/utils';

export default {
  name: 'EntityForm',
  model: {
    prop: 'entity',
  },
  props: {
    entityClass: {
      type: String,
      required: true,
    },
    availableEntities: {
      type: Array,
      default: () => ([]),
    },
    text: {
      type: String,
      required: true,
    },
    selectedTextStart: {
      type: Number,
      required: true,
    },
    selectedTextEnd: {
      type: Number,
      required: true,
    },
    usesLabels: {
      type: Boolean,
      default: () => true,
    },
    label: {
      type: String,
      default: () => '',
    },
    loadingLabel: {
      type: Boolean,
      default: false,
    },
    availableLabels: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      showingLabelForm: false,
    };
  },
  computed: {
    ...mapGetters([
      'activeTutorial',
    ]),
    entityFormatters() {
      return [
        formatters.bothubItemKey(),
      ];
    },
    labelFormatters() {
      return [
        formatters.bothubItemKey(),
      ];
    },
    selectedText() {
      return this.text.substring(this.selectedTextStart, this.selectedTextEnd);
    },
  },
  methods: {
    handleChange(e) {
      this.$emit('input', e);
    },
    removeEntity() {
      if (this.activeTutorial === 'training') return;

      this.$emit('removeEntity');
    },
    handleLabelChanged(newLabel) {
      this.$emit('labelChanged', newLabel);
    },
    removeLabel() {
      this.$emit('removeLabel');
      this.showingLabelForm = false;
    },
    showLabelForm() {
      this.showingLabelForm = true;
    },
  },
};
</script>

<style lang="scss" scoped>

  .entity-form{
    margin-left: 0.3rem;
    margin-bottom: 1.5rem;

    &__label{
      margin-bottom: 6px;
      display: block;
    }
  }
</style>
