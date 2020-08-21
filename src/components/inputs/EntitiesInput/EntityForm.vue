<template>
  <div>
    <div class="columns is-variable is-1">
      <div
        class="column is-half entity-form">
        <span
          slot="label"
          class="entity-form__label"><span
            :class="entityClass"
            class="is-rounded">{{ selectedText }}</span> is</span>
        <b-field
          id="tour-training-step-3"
          :is-previous-disabled="true">
          <b-autocomplete
            ref="entityInputField"
            v-model="entity"
            :data="availableEntities"
            expanded
            open-on-focus
            dropdown-position="down"
            icon-right="close"
            icon-right-clickable
            @icon-right-click="removeEntity()"/>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { formatters } from '@/utils';

export default {
  name: 'EntityForm',
  model: {
    prop: 'entity',
  },
  props: {
    entityClass: {
      type: String,
      required: true,
    },
    availableEntities: {
      type: Array,
      default: () => ([]),
    },
    text: {
      type: String,
      required: true,
    },
    selectedTextStart: {
      type: Number,
      required: true,
    },
    selectedTextEnd: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      entity: '',
    };
  },
  computed: {
    ...mapGetters([
      'activeTutorial',
    ]),
    entityFormatters() {
      return [
        formatters.bothubItemKey(),
      ];
    },
    selectedText() {
      return formatters.bothubItemKey()(
        this.text.substring(this.selectedTextStart, this.selectedTextEnd),
      );
    },
  },
  watch: {
    async entity() {
      if (!this.entity || this.entity.length <= 0) return;
      await this.$nextTick();
      this.entity = formatters.bothubItemKey()(this.entity);
      this.$emit('input', this.entity);
    },
  },
  mounted() {
    this.entity = this.selectedText;
  },
  methods: {
    async removeEntity() {
      if (this.activeTutorial === 'training') return;
      await this.$nextTick;
      this.$emit('removeEntity');
    },
  },
};
</script>

<style lang="scss" scoped>

  .entity-form{
    margin-left: 0.3rem;
    margin-bottom: 1.5rem;

    &__label{
      margin-bottom: 6px;
      display: block;
    }
  }
</style>
