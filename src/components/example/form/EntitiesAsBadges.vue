<template>
  <div class="wrapper">
    <b-tag
      rounded
      closable
      v-for="(entity, i) in entities"
      :key="i"
      @close="remove(i)"
      :class="getEntityClass(entity.entity)">
      <span>{{ entity.entity || '...' }}:&nbsp;</span>
      <span>"{{ text.substring(entity.start, entity.end) }}"</span>
    </b-tag>
    <span v-if="entities.length === 0 && !textSelected">No entities</span>
    <div
      v-if="textSelected && !adding"
      class="new">
      <button
        ref="addBtn"
        type="button"
        @click="add()"
        class="button is-rounded is-small">Add an entity for "{{ textSelected }}"</button>
    </div>
    <form
      v-if="adding"
      @submit.prevent="confirmAdding()">
      <b-field>
        <p class="control">
          <span class="button is-static is-small">{{ addingText }} is</span>
        </p>
        <b-autocomplete
          ref="addingInput"
          open-on-focus
          v-model="adding.entity"
          :data="entitiesList"
          size="is-small"
          type="text"
          @select="confirmAdding($event)" />
        <p class="control">
          <button
            type="submit"
            class="button is-primary is-small">OK</button>
        </p>
        <p class="control adding-cancel">
          <button
            type="button"
            class="delete"
            @click="cancelAdding()" />
        </p>
      </b-field>
    </form>
  </div>
</template>

<script>
import { getEntityColor } from '@/utils/entitiesColors';
import { getEntitiesList } from '@/utils';

export default {
  name: 'EntitiesAsBadges',
  props: {
    value: {
      type: Array,
      default: null,
    },
    initialData: {
      type: Array,
      default: null,
    },
    text: {
      type: String,
      required: true,
    },
    selected: {
      type: Object,
      required: true,
    },
    extraEntitiesList: {
      type: Array,
      default: () => ([]),
    },
  },
  watch: {
    entities() {
      this.$emit('input', this.entities);
    },
    text(newText, oldText) {
      this.cancelAdding();

      /*
        Entity follow text,
        based in https://github.com/RasaHQ/rasa-nlu-trainer/blob/master/src/components/TextEditor.js
      */
      this.entities.forEach((entity, i) => {
        const oldEntityText = oldText.substring(entity.start, entity.end);

        const findClosestStart = (lastMatch) => {
          if (lastMatch === undefined) {
            const index = newText.indexOf(oldEntityText);
            return index === -1 ?
              index :
              findClosestStart(index);
          }

          const from = lastMatch + oldEntityText.length;
          const index = newText.indexOf(oldEntityText, from);

          if (index === -1) {
            return lastMatch;
          }

          const prevDiff = Math.abs(entity.start - lastMatch);
          const nextDiff = Math.abs(entity.start - index);

          return prevDiff < nextDiff ?
            lastMatch :
            findClosestStart(index);
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
    selected() {
      /* istanbul ignore next */
      if (this.adding && this.selected &&
        (this.adding.start !== this.selected.start ||
        this.adding.end !== this.selected.end)) {
        /* istanbul ignore next */
        this.cancelAdding();
      }
    },
  },
  data() {
    return {
      entities: this.value || this.initialData || [],
      adding: false,
    };
  },
  computed: {
    textSelected() {
      const { start, end } = this.selected;
      /* istanbul ignore next */
      if (start === 0 && end === 0) {
        /* istanbul ignore next */
        return false;
      }
      return this.text.substring(start, end);
    },
    addingText() {
      const { start, end } = this.adding;
      return this.text.substring(start, end);
    },
    entitiesList() {
      return getEntitiesList(this.entities, this.extraEntitiesList);
    },
  },
  methods: {
    add() {
      this.adding = Object.assign({}, this.selected);
      this.$nextTick(() => {
        /* istanbul ignore next */
        this.$refs.addingInput.focus();
      });
    },
    confirmAdding(value) {
      /* istanbul ignore next */
      if (value) {
        /* istanbul ignore next */
        this.adding.entity = value;
      }

      this.entities.push(this.adding);
      this.cancelAdding();
    },
    cancelAdding() {
      this.adding = false;
    },
    remove(index) {
      this.cancelAdding();
      this.entities.splice(index, 1);
    },
    getEntityClass(entity) {
      /* istanbul ignore next */
      return `entity-${getEntityColor(entity, this.entities)}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  > * {
    display: inline-flex;
    margin: 2px 4px;

    &:first-child {
      margin-left: 0;
    }
  }

  .new {
    display: inline-block;
  }

  .adding-cancel {
    padding: 3px 6px;
  }
}
</style>
