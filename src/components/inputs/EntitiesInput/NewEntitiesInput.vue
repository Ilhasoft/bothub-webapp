<template>
  <div>
    <entity-form
      v-for="entity in entities" :key="entity._id"
      v-model="entity.entity"
      :available-entities="availableEntities"
      :available-labels="availableLabels"
      :entity-class="getEntityClass(entity)"
      :uses-labels="availableAddLabel"
      :label="entity.label"
      :loading-label="entity._loadingLabel"

      @labelChanged="(label) => entity.label = label"
      @removeEntity="() => removeEntity(entity)"
    />

    <bh-button
      :tooltip-hover="!textSelectedValue ? 'Highlight words to mark as entity' : null"
      :disabled="!textSelectedValue"
      size="small"
      rounded
      primary
      @click.prevent.stop="addEntity()"
    >
      <span>
        <span>Add entity</span>
        <span v-if="textSelectedValue">for "{{ textSelectedValue }}"</span>
      </span>
    </bh-button>
  </div>
</template>

<script>
import { getEntityColor } from '@/utils/entitiesColors';
import { generateTemporaryId } from '@/utils';
import EntityForm from './EntityForm';
import Vue from 'vue';
import { mapActions } from 'vuex';
import _ from 'lodash';

export default {
  components: {
    EntityForm,
  },
  props: {
    value: {
      type: Array,
      default: () => ([]),
    },
    repository: {
      type: [Object, String],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    textSelected: {
      type: Object,
      default: null,
    },
    availableAddLabel: {
      type: Boolean,
      default: true,
    },
    availableEntities: {
      type: Array,
      default: () => ([]),
    },
    availableLabels: {
      type: Array,
      default: () => ([]),
    },
    customLabelDisabled: {
      type: Boolean,
      default: false,
    },
    entitiesForEdit: {
      type: Array,
      default: () => ([]),
    },
    testing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      entities: _.cloneDeep(this.value),
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
    preparedEntities() {
      return this.entities
        .map(({
                label,
                pristineLabel,
                entity,
                ...others
              }) => (label
          ? {
            label,
            entity,
            ...others,
          }
          : {
            entity,
            ...others,
          }))
        .sort((a, b) => (a.start - b.start));
    },
    labels() {
      return this.entities.reduce((current, { entity, label, pristineLabel }) => {
        if (label || pristineLabel) {
          return Object.assign(current, { [entity]: label || pristineLabel });
        }
        return current;
      }, {});
    },
    printableEntities() {
      return this.preparedEntities.map(e => (this.labels[e.entity]
        ? { ...e, label: this.labels[e.entity] }
        : e));
    },
  },
  watch: {
    preparedEntities(value) {
      this.$emit('input', value);
    },
    text(text, oldText) {
      this.validateEntities(text, oldText);
    },
  },
  methods: {
    ...mapActions([
      'getEntities',
    ]),
    removeEntity(entity) {
      this.entities = this.entities.filter(e => e._id !== entity._id);
    },
    getEntityClass(entity) {
      const color = getEntityColor(
        entity,
        this.availableEntities,
        this.preparedEntities,
      );
      return `entity-${color}`;
    },
    addEntity() {
      const temporaryEntityId = generateTemporaryId();

      this.entities.push({
        ...this.textSelected,
        entity: this.textSelectedValue,
        label: '',
        _loadingLabel: true,
        _id: temporaryEntityId,
      });

      this.loadLabelFor(temporaryEntityId, this.textSelectedValue);

      this.$emit('entityAdded');
    },
    async loadLabelFor(entityId, entityText) {
      const entities = await this.getEntities({
        repositoryUuid: this.repository.uuid || this.repository,
        value: entityText,
      });
      await entities.next();

      const entityIndex = this.entities.findIndex(e => e._id === entityId);

      if (entityIndex === -1) {
        return;
      }

      if (entities.items.length === 1) {
        const label = entities.items[0].data.label;

        Vue.set(this.entities, entityIndex, {
          ...this.entities[entityIndex],
          label: label,
          _loadingLabel: false,
        })
      } else {
        Vue.set(this.entities, entityIndex, {
          ...this.entities[entityIndex],
          _loadingLabel: false,
        })
      }
    },
    validateEntities(text, oldText) {
      /*
        Entity follow text,
        based in https://github.com/RasaHQ/rasa-nlu-trainer/blob/master/src/components-v1/TextEditor.js
      */
      this.entities.forEach((entity, i) => {
        const oldEntityText = oldText.substring(entity.start, entity.end);

        const findClosestStart = (lastMatch) => {
          if (lastMatch === undefined) {
            const index = text.indexOf(oldEntityText);
            return index === -1
              ? index
              : findClosestStart(index);
          }

          const from = lastMatch + oldEntityText.length;
          const index = text.indexOf(oldEntityText, from);

          if (index === -1) {
            return lastMatch;
          }

          const prevDiff = Math.abs(entity.start - lastMatch);
          const nextDiff = Math.abs(entity.start - index);

          return prevDiff < nextDiff
            ? lastMatch
            : findClosestStart(index);
        };

        const start = findClosestStart();
        if (start === -1) {
          this.entities[i] = false;
          return false;
        }

        this.entities[i].start = start;
        this.entities[i].end = start + oldEntityText.length;
        return true;
      });
      this.entities = this.entities.filter(value => !!value);
    },
  },
}
</script>
