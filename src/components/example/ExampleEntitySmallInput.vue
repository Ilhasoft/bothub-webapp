<template>
  <div
    class="entity-input__entities">
    <b-field
      grouped
      group-multiline>
      <div
        v-for="(entity, index) in entitiesToEdit"
        :key="`entity-${index}`"
        class="entity-input__input entity-input__icon-container">
        <b-field>
          <span
            slot="label"
            class="entity-input__input__label"
            v-html="$t('webapp.example.text_is', {text: highlightedText(entity) })" />
          <b-select
            v-if="constrictEntities"
            v-model="entity.entity"
            expanded
            size="is-small"
            @input="entitiesToEdit[index].entity = intentFormatters(entity.entity)">
            <option
              v-for="entity in (availableEntities || [])"
              :key="entity">
              {{ entity }}
            </option>
          </b-select>
          <b-autocomplete
            v-else
            :data="filterEntities(index)"
            v-model="entity.entity"
            :placeholder="$t('webapp.example.entity')"
            dropdown-position="bottom"
            icon-right="close"
            icon-right-clickable
            open-on-focus
            size="is-small"
            class="edit-sentence-input"
            @input="entitiesToEdit[index].entity = intentFormatters(entity.entity)"
            @icon-right-click="removeEntity(entity, index)"
          />
        </b-field>
        <div class="entity-input__icon-container">
          <b-icon
            v-if="constrictEntities"
            class="clickable"
            size="is-small"
            icon="close"
            @click.native.stop="removeEntity(entity, index)"/>
        </div>
      </div>
      <div class="entity-input__icon-container">
        <b-tooltip
          :label="addEntityHelpText"
          multilined>
          <b-icon
            :disabled="textSelected === null"
            :class="{clickable: true,
                     'icon-disabled': !addEntityEnabled
            }"
            icon="card-plus"
            @click.native.stop="addEntity"
          />
        </b-tooltip>
      </div>
    </b-field>
  </div>
</template>

<script>
import { formatters } from '@/utils';
import Vue from 'vue';

export default {
  name: 'ExampleEntitySmallInput',
  props: {
    availableEntities: {
      type: Array,
      default: () => [],
    },
    entities: {
      type: Array,
      default: () => [],
    },
    textSelected: {
      type: Object,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
    constrictEntities: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      entitiesToEdit: this.entities,
    };
  },
  computed: {
    addEntityEnabled() {
      if (this.constrictEntities && (this.availableEntities || []).length === 0) return false;
      return this.textSelected != null;
    },
    intentFormatters() {
      return formatters.bothubItemKey();
    },
    addEntityHelpText() {
      if (!(this.availableEntities && this.availableEntities.length > 0)) return this.$t('webapp.translate.no_entities');
      if (this.textSelected === null) return this.$t('webapp.trainings.select_text');
      return this.entityButtonText;
    },
    entityButtonText() {
      if (this.textSelected === null) {
        return this.$t('webapp.trainings.add_entity');
      }

      const selected = this.text.slice(this.textSelected.start, this.textSelected.end);

      return `${this.$t('webapp.trainings.add_entity_for')} "${selected}"`;
    },
  },
  watch: {
    entities() {
      this.entitiesToEdit = this.entities;
    },
    entitiesToEdit() {
      this.$emit('input', this.entitiesToEdit);
    },
    text(newText, oldText) {
      if (newText !== oldText) {
        this.recomputeEntitiesFor(newText, oldText);
      }
    },
  },
  mounted() {
    this.$emit('input', this.entitiesToEdit);
  },
  methods: {
    filterEntities(index) {
      if (this.availableEntities !== null) {
        return this.availableEntities.filter(entity => entity
          .toString()
          .toLowerCase()
          .indexOf(this.entitiesToEdit[index].entity.toLowerCase()) >= 0);
      }
      return [];
    },
    addEntity() {
      if (!this.addEntityEnabled) return;
      // It will be added at the end of the list, so we already know its index.
      const newEntity = {
        start: this.textSelected.start,
        end: this.textSelected.end,
        entity: this.intentFormatters(
          this.text.substring(this.textSelected.start, this.textSelected.end),
        ),
      };

      this.entitiesToEdit.push({
        ...newEntity,
      });

      this.$emit('addedEntity', newEntity);
    },
    removeEntity(entity, index) {
      this.$nextTick(() => {
        Vue.delete(this.entitiesToEdit, index);
      });
    },
    highlightedText(entity) {
      return this.text.slice(entity.start, entity.end);
    },
    recomputeEntitiesFor(text, oldText) {
      /*
        Entity follow text,
        based in https://github.com/RasaHQ/rasa-nlu-trainer/blob/master/src/components-v1/TextEditor.js
      */
      this.entitiesToEdit.forEach((entity, i) => {
        const oldEntityText = oldText.substring(entity.start, entity.end);

        const findClosestStart = (lastMatch) => {
          if (lastMatch === undefined) {
            if (oldEntityText.length === 0 || text.length === 0) return -1;
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
          this.entitiesToEdit[i] = false;
          return false;
        }

        this.entitiesToEdit[i].start = start;
        this.entitiesToEdit[i].end = start + oldEntityText.length;
        return true;
      });
      this.entitiesToEdit = this.entitiesToEdit.filter(value => !!value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';

    .icon {
        color: $color-grey-dark
    }
    .entity-input {
      &__input {
        margin-right: 0.5rem;
        &__label {
          font-size: 12px;
        }
      }

      &__icon-container {
        display: flex;
        align-items: center;
        .icon {
          margin-top: 1rem;
        }
      }

      &__entities {
        > * {
          margin: 0 8px 0 0;

          &:last-child {
            margin: 0;
          }
        }
      }
    }
</style>
