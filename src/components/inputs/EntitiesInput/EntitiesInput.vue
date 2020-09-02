<template>
  <div>
    <entity-form
      v-for="entity in preparedEntities"
      :key="entity.localId"
      v-model="entity.entity"
      :available-entities="allEntities"
      :entity-class="getEntityClass(entity)"
      :text="text"
      :selected-text-start="entity.start"
      :selected-text-end="entity.end"
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
        :is-next-disabled="true"
        :is-previous-disabled="true"
        :disabled="!textSelectedValue"
        :is-step-blocked="!blockedNextStepTutorial"
        rounded
        type="is-primary"
        @click.prevent.stop="addEntity()"
      >
        <span class="add-entity-button-text">
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
import { generateTemporaryId, formatters } from '@/utils';
import { mapGetters } from 'vuex';
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
    availableEntities: {
      type: Array,
      default: () => ([]),
    },
    entitiesForEdit: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      entities: _.cloneDeep(this.value),
      errors: '',
      blockedNextStepTutorial: false,
    };
  },
  computed: {
    ...mapGetters({
      repositoryVersion: 'getSelectedVersion',
    }),
    textSelectedValue() {
      if (!this.textSelected) {
        return null;
      }

      const { start, end } = this.textSelected;
      return formatters.bothubItemKey()(this.text.substring(start, end));
    },
    preparedEntities() {
      return [...this.entities].sort((a, b) => (a.start - b.start));
    },
    allEntities() {
      if (!(this.repository && this.repository.entities)) return [];
      return this.repository.entities.map(entity => entity.value);
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
    removeEntity(entity) {
      this.entities = this.entities.filter(e => e.localId !== entity.localId);
    },
    getEntityClass(entity) {
      const color = getEntityColor(entity);
      return `entity-${color}`;
    },
    addEntity() {
      const temporaryEntityId = generateTemporaryId();

      this.entities.push({
        ...this.textSelected,
        entity: this.textSelectedValue,
        localId: temporaryEntityId,
      });

      this.blockedNextStepTutorial = !this.blockedNextStepTutorial;
      this.$emit('entityAdded');
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

<style lang="scss">
  .add-entity-button-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    max-width: 40vw;
  }
</style>
