<template>
  <bh-input>
    <div class="entities-input__badges">
      <bh-badge
        v-for="(entity, i) in printableEntities"
        :key="i"
        :class="[
          'entities-input__badges__badge',
          getEntityClass(entity),
      ]">
        <span>
          <span><strong>{{ entity.entity }}</strong></span>
          <span v-if="entity.label">
            <bh-icon value="equal" />
            <strong>{{ entity.label }}</strong>
          </span>
        </span>
        <bh-dropdown>
          <bh-icon-button
            slot="trigger"
            value="dots-horizontal"
            size="small" />
          <bh-dropdown-item @click="editEntity(entity)">Edit</bh-dropdown-item>
          <bh-dropdown-item @click="removeEntity(entity)">Remove</bh-dropdown-item>
        </bh-dropdown>
      </bh-badge>
    </div>
    <div class="entities-input__new-entity">
      <new-entity
        ref="newEntity"
        :custom-label-disabled="customLabelDisabled"
        :text="text"
        :text-selected="textSelected"
        :repository="repository"
        :available-entities="availableEntities"
        :available-labels="availableLabels"
        class="entities-input__new-entity__wrapper"
        @new="addEntity($event)" />
    </div>
  </bh-input>
</template>

<script>
import { getEntityColor } from '@/utils/entitiesColors';
import NewEntity from './NewEntity';


const components = {
  NewEntity,
};

export default {
  name: 'EntitiesInput',
  components,
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
    availableLabels: {
      type: Array,
      default: () => ([]),
    },
    customLabelDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      entities: this.value,
    };
  },
  computed: {
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
    getEntityClass(entity) {
      const color = getEntityColor(
        entity,
        this.availableEntities,
        this.preparedEntities,
      );
      return `entity-${color}`;
    },
    addEntity(entity) {
      this.entities.push(entity);
      this.$emit('entityAdded');
    },
    findEntityIndex(entity) {
      return this.entities.reduce((currentIndex, e, index) => {
        if (e.start === entity.start
            && e.end === entity.end
            && e.entity === entity.entity) {
          return index;
        }
        return currentIndex;
      }, -1);
    },
    removeEntity(entity) {
      const entityIndex = this.findEntityIndex(entity);
      this.entities.splice(entityIndex, 1);
    },
    async editEntity(entity) {
      await this.$nextTick();
      this.$emit('entityEdited', entity);
      await this.$nextTick();
      const entityIndex = this.findEntityIndex(entity);
      const bruteEntity = this.entities[entityIndex];
      if (this.$refs.newEntity.fillEdit) {
        this.$refs.newEntity.fillEdit(
          bruteEntity.entity,
          (bruteEntity.label || null),
          bruteEntity.pristineLabel,
        );
      }
      await this.$nextTick();
      this.removeEntity(entity);
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
    clearEntityForm() {
      this.$refs.newEntity.disableAddingMode();
    },
  },
};
</script>

<style lang="scss" scoped>
.entities-input {
  &__badges {
    position: relative;
    margin: -4px;

    &__badge {
      margin: 4px;
    }
  }

  &__new-entity {
    margin: 16px 0;
    display: flex;

    &__wrapper {
      flex-grow: 0;
    }
  }
}
</style>
