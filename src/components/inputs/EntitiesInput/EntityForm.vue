<template>
  <div>
    <div class="columns is-variable is-1">
      <div
        :class="usesLabels ? 'is-half' : ''"
        class="column">
        <bh-field>
          <label class="entity-form-label"><span
            :class="entityClass"
            class="is-rounded">{{ selectedText }}</span> is</label>
          <bh-autocomplete
            :value="entity"
            :data="availableEntities"
            :formatters="entityFormatters"
            @input="handleChange"
          >
            <span slot="append">
              <bh-icon-button
                value="close"
                size="small"
                @click="removeEntity()"
              />
            </span>
          </bh-autocomplete>
        </bh-field>
      </div>
      <div
        v-if="usesLabels"
        class="column is-half">
        <bh-field>
          <label class="entity-form-label">{{ showingLabelForm ? 'Label' : '&nbsp;' }}</label>
          <div>
            <bh-button
              v-if="!showingLabelForm"
              :disabled="loadingLabel"
              type="button"
              size="small"
              rounded
              primary
              class="label-button"
              @click.prevent.stop="showLabelForm"
            >
              <span>
                <span v-if="loadingLabel">Loading...</span>
                <span v-else>{{ label ? `Edit "${label}" label` : 'Add label' }}</span>
              </span>
            </bh-button>
            <bh-autocomplete
              v-else
              :value="label"
              :data="availableLabels"
              :formatters="labelFormatters"
              @input="handleLabelChanged"
            >
              <span slot="append">
                <bh-icon-button
                  value="close"
                  size="small"
                  @click="removeLabel()"
                />
              </span>
            </bh-autocomplete>
          </div>
        </bh-field>
      </div>
    </div>
  </div>
</template>

<script>
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
    entity: {
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
      default: () => false,
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

<style scoped>
  .entity-form-label {
    margin-bottom: 6px;
    display: block;
  }
</style>
