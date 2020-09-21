<template>
  <div
    class="translate-form">
    <example-text-with-highlighted-entities-input
      ref="textInput"
      v-model="text"
      :entities="allEntities"
      :readonly="!editing"
      :placeholder="''"
      :transparent="!editing && !translation"
      small-icon
      class="translate-form__input"
      size="normal"
      @textSelected="setTextSelected($event)"
      @focus="onFocus"
    >
      <div
        slot="append"
        class="translate-form__icon">
        <b-icon
          :icon="`chevron-${open ? 'up' : 'down'}`"
          class="translate-form__icon clickable"
          @click.native="open ? close() : onFocus()"/>
      </div>
    </example-text-with-highlighted-entities-input>
    <div
      v-show="open && editing"
      class="translate-form__entities">
      <example-entity-small-input
        v-if="entities"
        v-model="allEntities"
        :text="text"
        :available-entities="entityOptions"
        :entities="entities"
        :text-selected="textSelected"
        constrict-entities
        @addedEntity="onEntityAdded" />
    </div>
  </div>
</template>

<script>
import ExampleEntitySmallInput from '@/components/example/ExampleEntitySmallInput';
import ExampleTextWithHighlightedEntitiesInput from '@/components/inputs/ExampleTextWithHighlightedEntitiesInput';

export default {
  name: 'TranslateExampleForm',
  components: {
    ExampleEntitySmallInput,
    ExampleTextWithHighlightedEntitiesInput,
  },
  props: {
    availableEntities: {
      type: Array,
      default: () => [],
    },
    open: {
      type: Boolean,
      default: false,
    },
    translation: {
      type: Object,
      default: null,
    },
    editing: {
      type: Boolean,
      default: false,
    },
    initialData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      text: '',
      entities: null,
      allEntities: this.entities,
      textSelected: null,
    };
  },
  computed: {
    entityOptions() {
      return this.availableEntities.map(entity => entity.entity);
    },
    input() {
      return {
        text: this.text || '',
        entities: this.allEntities || [],
      };
    },
  },
  watch: {
    input() {
      this.$emit('input', this.input);
    },
    entities() {
      this.allEntities = this.entities;
    },
    translation() {
      if (this.initialData) return;
      const { text, entities } = this.initialData ? this.initialData : this.translation || {};
      this.text = text || '';
      this.entities = entities || [];
    },
    open() {
      if (!this.open) {
        this.close();
      }
    },
  },
  mounted() {
    const { text, entities } = this.initialData ? this.initialData : this.translation || {};
    this.text = text || '';
    this.entities = entities || [];
  },
  methods: {
    onFocus() {
      if (!this.editing) this.$refs.textInput.clearSelected();
      else this.$refs.textInput.focus();
      this.$emit('update:open', true);
    },
    close() {
      this.$refs.textInput.clearSelected();
      this.$emit('update:open', false);
    },
    clear() {
      this.text = '';
    },
    setTextSelected(value) {
      this.textSelected = value;
    },
    onEntityAdded() {
      if (this.$refs.textInput.clearSelected) {
        /* istanbul ignore next */
        this.$refs.textInput.clearSelected();
      }
      this.$emit('eventStep');
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/colors.scss';
    .translate-form {
        margin-top: 0.5rem;
        &__entities {
            margin-top: -0.8rem;
            padding: 1rem;
            background-color: $color-grey-light;
            border-radius: 4px;
            min-height: 5rem;
        }

        &__input {
          background-color: $color-fake-white;
          border-radius: 4px;
        }

        &__icon {
          width: 1rem;
        }
    }
</style>
