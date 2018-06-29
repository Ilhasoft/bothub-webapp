<template>
  <div class="field inputs">
    <div class="inputs-text">
      <entity-text-highlighted-input
        ref="entityTextInput"
        v-model="data.text"
        :errors="errors.text"
        @selected="updateSelected($event)"
        :entities="data.entities"
        :allEntities="allEntities" />
    </div>
    <div class="inputs-entities">
      <entities-as-badges
        v-model="data.entities"
        :errors="errors.entities"
        :text="data.text"
        :selected="selected"
        :extraEntitiesList="extraEntitiesList"
        :allEntities="allEntities"
        @entityAdded="onEntityAdded()" />
    </div>
  </div>
</template>

<script>
import EntityTextHighlightedInput from '@/components/inputs/EntityTextHighlightedInput';
import EntitiesAsBadges from '@/components/inputs/EntitiesAsBadges';


const components = {
  EntityTextHighlightedInput,
  EntitiesAsBadges,
};

export default {
  name: 'ExampleWithEntitiesInput',
  components,
  props: {
    value: {
      type: Object,
      default: () => ({
        text: '',
        entities: [],
      }),
    },
    errors: {
      type: Object,
      default: () => ({}),
    },
    extraEntitiesList: {
      type: Array,
      default: () => ([]),
    },
    allEntities: {
      type: Array,
      default: () => ([]),
    },
  },
  watch: {
    value: {
      handler() {
        this.data = this.value;
      },
      deep: true,
    },
    data: {
      handler() {
        /* istanbul ignore next */
        this.$emit('input', this.data);
      },
      deep: true,
    },
  },
  data() {
    return {
      data: this.value,
      selected: { start: 0, end: 0 },
    };
  },
  methods: {
    updateSelected(value) {
      /* istanbul ignore next */
      this.selected = value;
    },
    onEntityAdded() {
      /* istanbul ignore next */
      this.$refs.entityTextInput.clearSelected();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/utilities.scss';

.inputs {
  background-color: $grey-lighter;
  border-radius: 3px 3px 4px 4px;

  &-entities {
    padding: 8px;
  }
}
</style>
