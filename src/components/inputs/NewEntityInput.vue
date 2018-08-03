<template>
  <form @submit.prevent="addEntity()">
    <bh-field
      v-if="!addingMode"
      label>
      <bh-button
        rounded
        :tooltipHover="!textSelectedValue ? 'Highlight words to mark as entity' : null"
        @click="enableAddingMode()">
        <span>
          <span>Add new entity</span>
          <span v-if="textSelectedValue">for "{{ textSelectedValue }}"</span>
        </span>
        <bh-icon value="plus-circle" />
      </bh-button>
    </bh-field>
    <div v-else>
      <div class="columns is-variable is-1">
        <div class="column">
          <bh-field label="Entity">
            <bh-text-input
              v-model="entity"
              :prepend-text="`${textSelectedValue} is:`" />
          </bh-field>
        </div>
        <div
          v-if="entity"
          class="column is-narrow">
          <bh-field :label="hasCustomizedLabel ? 'Label' : ''">
            <bh-button
              v-if="!hasCustomizedLabel"
              secondary
              :disabled="!entity || searchingLabel"
              :tooltipHover="!currentLabel
                ? ['Categorize their entities.', 'Ex: dog is animal']
                : null"
              @click="customizeLabel()">
              <bh-loading
                v-if="searchingLabel"
                size="small" />
              <slot v-else-if="currentLabel">edit {{ currentLabel }} label</slot>
              <slot v-else>add label</slot>
            </bh-button>
            <bh-text-input
              v-else
              v-model="currentLabel">
              <span slot="append">
                <bh-icon-button
                  value="close"
                  size="small"
                  @click="cancelCustomizeLabel()" />
              </span>
            </bh-text-input>
          </bh-field>
        </div>
        <div class="column is-narrow">
          <bh-field label>
            <bh-button
              primary
              :disabled="!entity || searchingLabel"
              type="submit">add</bh-button>
          </bh-field>
        </div>
        <div class="column is-narrow">
          <bh-field label>
            <bh-icon-button
              class="text-color-grey"
              value="close-circle"
              @click="disableAddingMode()" />
          </bh-field>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';


export default {
  name: 'NewEntityInput',
  props: {
    text: {
      type: String,
      required: true,
    },
    textSelected: {
      type: Object,
      default: null,
    },
    debounceTime: {
      type: Number,
      default: 750,
    },
    repository: {
      type: [Object, String],
      required: true,
    },
    labels: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    textSelected: {
      handler(value, oldValue) {
        if (
          (value && oldValue && (value.start !== oldValue.start || value.end !== oldValue.end))
          || !value
          || !oldValue) {
          this.disableAddingMode();
        }
      },
      deep: true,
    },
    entity(value) {
      this.searchingLabel = true;
      this.currentLabel = null;
      this.pristineLabel = null;
      this.clearTimeout();
      this.cancelCustomizeLabel();
      const label = this.labels[value] || null;
      if (label) {
        this.currentLabel = label;
        this.searchingLabel = false;
      } else {
        this.setTimeoutId = setTimeout(
          async () => {
            if (value) {
              const entities = await this.getEntities({
                repositoryUuid: this.repository.uuid || this.repository,
                value,
              });
              await entities.next();
              if (entities.items.length === 1) {
                this.pristineLabel = entities.items[0].data.label;
                this.currentLabel = this.pristineLabel;
              }
            }
            this.searchingLabel = false;
          },
          this.debounceTime,
        );
      }
    },
  },
  data() {
    return {
      addingMode: false,
      entity: '',
      currentLabel: null,
      pristineLabel: null,
      hasCustomizedLabel: false,
      setTimeoutId: null,
      searchingLabel: false,
    };
  },
  computed: {
    textSelectedValue() {
      if (!this.textSelected) {
        return null;
      }

      const { start, end } = this.textSelected;
      return this.text.substring(start, end);
    },
  },
  methods: {
    ...mapActions([
      'getEntities',
    ]),
    enableAddingMode() {
      if (this.textSelected) {
        this.addingMode = true;
        this.entity = this.textSelectedValue;
      }
    },
    disableAddingMode() {
      this.addingMode = false;
      this.entity = null;
    },
    addEntity() {
      const { entity, pristineLabel, textSelected } = this;
      const { start, end } = textSelected;
      const data = {
        entity,
        pristineLabel,
        start,
        end,
      };

      if (this.hasCustomizedLabel) {
        data.label = this.currentLabel;
      }

      this.$emit('newEntity', data);
      this.disableAddingMode();
      this.entity = null;
      return false;
    },
    customizeLabel() {
      this.hasCustomizedLabel = true;
    },
    cancelCustomizeLabel() {
      this.hasCustomizedLabel = false;
      this.currentLabel = this.pristineLabel;
    },
    clearTimeout() {
      if (this.setTimeoutId) {
        clearTimeout(this.setTimeoutId);
        this.setTimeoutId = null;
      }
    },
  },
};
</script>
