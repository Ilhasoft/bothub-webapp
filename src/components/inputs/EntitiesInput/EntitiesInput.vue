<template>
  <div>
    <entity-form
      v-for="entity in entities"
      :key="entity.localId"
      v-model="entity.entity"
      :available-entities="entitiesOptions"
      :available-labels="availableLabels"
      :entity-class="getEntityClass(entity)"
      :uses-labels="availableAddLabel"
      :text="text"
      :selected-text-start="entity.start"
      :selected-text-end="entity.end"
      :label="entity.label"
      :loading-label="entity.localLoadingLabel"

      @removeLabel="() => entity.label = ''"
      @labelChanged="(label) => entity.label = label"
      @removeEntity="() => removeEntity(entity)"
    />

    <b-tooltip
      :is-active="!textSelectedValue"
      :label="$t('webapp.trainings.highlight_word')"
      multilined
      type="is-dark">
      <b-button
        id="tour-training-step-2"
        ref="addEntityBtn"
        :disabled="!textSelectedValue"
        :is-step-blocked="!blockedNextStepTutorial"
        rounded
        type="is-primary"
        @click.prevent.stop="addEntity()"
      >
        <span>
          <span v-if="textSelectedValue">
            {{ $t('webapp.trainings.add_entity_for') }} "{{ textSelectedValue }}"
          </span>
          <span v-else>{{ $t('webapp.trainings.add_entity') }}</span>
        </span>
      </b-button>
    </b-tooltip>
  </div>
</template>

<script>
import { getEntityColor } from '@/utils/entitiesColors';
import { generateTemporaryId } from '@/utils';
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import _ from 'lodash';
import EntityForm from './EntityForm';

export default {
  name: 'EntitiesInput',
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
  },
  data() {
    return {
      entities: _.cloneDeep(this.value),
      allEntities: [],
      errors: '',
      blockedNextStepTutorial: false,
    };
  },
  computed: {
    ...mapGetters({
      repositoryVersion: 'getSelectedVersion',
    }),
    entitiesOptions() {
      if (this.allEntities !== undefined) {
        return this.allEntities;
      }
      return [];
    },
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
  mounted() {
    this.getEntitiesName();
  },
  methods: {
    ...mapActions([
      'getEntities',
      'getAllEntities',
    ]),
    async getEntitiesName() {
      try {
        const entities = await this.getAllEntities({
          repositoryUuid: this.repository.uuid,
          repositoryVersion: this.repository.version_default.id,
        });
        this.allEntities = entities.data.results.map(entity => entity.value);
      } catch (error) {
        this.errors = error;
      }
    },
    removeEntity(entity) {
      this.entities = this.entities.filter(e => e.localId !== entity.localId);
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
        localLoadingLabel: true,
        localId: temporaryEntityId,
      });

      this.loadLabelFor(temporaryEntityId, this.textSelectedValue);
      this.blockedNextStepTutorial = !this.blockedNextStepTutorial;
      this.$emit('entityAdded');
    },
    async loadLabelFor(entityId, entityText) {
      let entities = [];
      try {
        entities = await this.getEntities({
          repositoryUuid: this.repository.uuid || this.repository,
          value: entityText,
          repositoryVersion: this.repositoryVersion,
        });
      } catch (error) {
        this.errors = error;
      }
      await entities.next();

      const entityIndex = this.entities.findIndex(e => e.localId === entityId);

      if (entityIndex === -1) {
        return;
      }

      if (entities.items.length === 1) {
        // eslint-disable-next-line prefer-destructuring
        const label = entities.items[0].data.label;

        Vue.set(this.entities, entityIndex, {
          ...this.entities[entityIndex],
          label,
          localLoadingLabel: false,
        });
      } else {
        Vue.set(this.entities, entityIndex, {
          ...this.entities[entityIndex],
          localLoadingLabel: false,
        });
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
};
</script>
