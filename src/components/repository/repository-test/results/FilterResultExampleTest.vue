<template>
  <div class="filter-sentences-test bh-grid">
    <bh-field
      :errors="errors.intent"
      label=""
      class="bh-grid__item">
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
    <div class="bh-grid__item filter-sentences-test__text">
      <span>Filter by:</span>
    </div>
    <bh-field
      :errors="errors.intent"
      label=""
      class="bh-grid__item">
      <bh-autocomplete
        v-model="intent"
        :data="intents || []"
        :formatters="inputFormatters"
        placeholder="Intent" />
    </bh-field>
    <bh-field
      :errors="errors.label"
      label=""
      class="bh-grid__item">
      <bh-autocomplete
        v-model="label"
        :data="labels || []"
        :formatters="inputFormatters"
        placeholder="All labels" />
    </bh-field>
    <bh-field
      :errors="errors.intent"
      label=""
      class="bh-grid__item">
      <bh-autocomplete
        v-model="entitie"
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
  name: 'FilterResultExampleTest',
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
      entitie: '',
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
    entitie: _.debounce(function emitEntitie(value) {
      this.$emit('queryStringFormated', { entitie: value });
    }, 500),
    label: _.debounce(function emitLabel(value) {
      this.$emit('queryStringFormated', { label: value });
    }, 500),
  },
};
</script>

<style lang="scss">
.filter-sentences-test {
  &__text {
    width: 5rem;
    margin: 2rem 0 0 2rem;
    align-self: center;
  }
}
</style>
