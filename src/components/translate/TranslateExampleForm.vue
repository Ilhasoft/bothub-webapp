<template>
  <div class="translate-form">
    <example-text-with-highlighted-entities-input
      ref="textInput"
      v-model="text"
      :entities="allEntities"
      :placeholder="$t('webapp.example.enter_sentence')"
      size="normal"
      @textSelected="setTextSelected($event)"
      @entityEdited="onEditEntity($event)"
      @entityAdded="onEntityAdded()"
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
    //   this.$emit('update:open', this.focus);
    },
    open() {
    //   if (this.open) {
    //     this.$refs.textInput.focus();
    //   } else {
    //     this.$refs.textInput.clearSelected();
    //   }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/colors.scss';
    .translate-form {
        margin-top: 0.5rem;
        &__entities {
            margin-top: -1rem;
            padding: 1rem;
            background-color: $color-grey-light;
        }
    }
</style>
