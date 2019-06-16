<template>
  <div>
    <div class="columns is-variable is-1">
      <div class="column" :class="usesLabels ? 'is-half' : ''">
        <bh-field>
          <label class="entity-form-label"><span class="is-rounded" :class="entityClass">{{ entity }}</span> is</label>
          <bh-autocomplete
            :value="entity"
            @input="handleChange"
            :data="availableEntities"
            :formatters="entityFormatters"
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
      <div class="column is-half" v-if="usesLabels">
        <bh-field>
          <label class="entity-form-label">{{ showingLabelForm ? 'Label' : '&nbsp;' }}</label>
          <div>
            <bh-button
              v-if="!showingLabelForm"
              type="button"
              size="small"
              rounded
              primary
              class="label-button"
              :disabled="loadingLabel"
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
              @input="handleLabelChanged"
              :data="availableLabels"
              :formatters="labelFormatters"
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
  },
  methods: {
    handleChange(e) {
      console.log(e);
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
    }
  },
}
</script>

<style scoped>
  .entity-form-label {
    margin-bottom: 6px;
    display: block;
  }
</style>
