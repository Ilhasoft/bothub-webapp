<template>
  <div class="filter-evaluate-example bh-grid">
    <bh-field
      :errors="errors.intent"
      class="bh-grid__item bh-grid__item--grow-3">
      <bh-text
        v-model="text"
        :debounce="debounceTime">
        <div slot="append">
          <bh-icon-button
            value="magnify"
            size="small"
            type="submit" />
        </div>
      </bh-text>
    </bh-field>
    <div class="bh-grid__item filter-evaluate-example__text">
      <span>Filter by:</span>
    </div>
    <bh-field
      :errors="errors.intent"
      class="bh-grid__item">
      <bh-autocomplete
        v-model="intent"
        :data="intents || []"
        :formatters="inputFormatters"
        placeholder="All Intent" />
    </bh-field>
    <bh-field
      :errors="errors.label"
      class="bh-grid__item">
      <bh-autocomplete
        v-model="label"
        :data="labels || []"
        :formatters="inputFormatters"
        placeholder="All labels" />
    </bh-field>
    <bh-field
      :errors="errors.intent"
      class="bh-grid__item">
      <bh-autocomplete
        v-model="entity"
        :data="entities || []"
        :formatters="inputFormatters"
        placeholder="All entities" />
    </bh-field>
  </div>
</template>

<script>
import { formatters } from '@/utils/index';
import _ from 'lodash';


export default {
  name: 'FilterEvaluateResultExample',
  props: {
    debounceTime: {
      type: Number,
      default: 750,
    },
    intents: {
      type: Array,
      default: null,
    },
    entities: {
      type: Array,
      default: null,
    },
    labels: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      text: '',
      intent: '',
      label: '',
      entity: '',
      setTimeoutId: null,
      errors: {},
    };
  },
  computed: {
    inputFormatters() {
      const formattersList = [
        formatters.bothubItemKey(),
      ];
      formattersList.toString = () => 'inputFormatters';
      return formattersList;
    },
  },
  watch: {
    text(value) {
      this.$emit('queryStringFormated', { search: value });
    },
    intent: _.debounce(function emitIntent(value) {
      this.$emit('queryStringFormated', { intent: value });
    }, 500),
    entity: _.debounce(function emitEntity(value) {
      this.$emit('queryStringFormated', { entity: value });
    }, 500),
  },
};
</script>

<style lang="scss">
.filter-evaluate-example {
  align-items: center;
  justify-content: center;
  text-align: right;

  &__text {
    margin-top: .5rem;
  }
}
</style>
