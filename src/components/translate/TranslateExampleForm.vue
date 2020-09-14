<template>
  <div class="translate-form">
    <example-text-with-highlighted-entities-input
      ref="textInput"
      v-model="text"
      :entities="allEntities"
      :placeholder="''"
      :transparent="!focus && text.length === 0"
      class="translate-form__input"
      size="normal"
      @textSelected="setTextSelected($event)"
      @focus="focus = true"
      @blur="focus = false"
    />
    <div
      v-show="open"
      class="translate-form__entities">
      <example-entity-small-input
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
  },
  data() {
    return {
      allEntities: this.entities,
      text: this.translation ? this.translation.text : '',
      entities: this.translation ? this.translation.entities : [],
      focus: false,
      textSelected: null,
    };
  },
  computed: {
    entityOptions() {
      return this.availableEntities.map(entity => entity.entity);
    },
  },
  watch: {
    translation() {
      if (!this.translation) return;
      const { text, entities } = this.translation;
      this.text = text;
      this.entities = entities;
    },
    focus() {
      if (!this.focus) return;
      this.$emit('update:open', this.focus);
    },
    open() {
      if (this.open) {
        this.$refs.textInput.focus();
      } else {
        this.$refs.textInput.clearSelected();
      }
    },
  },
  methods: {
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
        }

        &__input {
          background-color: $color-fake-white;
          border-radius: 4px;
        }
    }
</style>
