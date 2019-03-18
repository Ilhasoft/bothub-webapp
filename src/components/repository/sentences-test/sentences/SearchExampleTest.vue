<template>
  <div>
    <form
      class="search-example-test bh-grid"
      @submit.prevent="onSubmit()">
      <bh-field
        :errors="errors.intent"
        class="bh-grid__item">
        <bh-text
          v-model="toString"
          :debounce="debounceTime">
          <div slot="append">
            <bh-icon-button
              value="magnify"
              size="small"
              type="submit" />
          </div>
        </bh-text>
      </bh-field>
      <bh-field
        :errors="errors.intent"
        class="bh-grid__item">
        <bh-autocomplete
          v-model="intent"
          :data="intents || []"
          :formatters="intentFormatters"
          placeholder="Intent" />
      </bh-field>
      <bh-field
        :errors="errors.label"
        class="bh-grid__item">
        <bh-autocomplete
          v-model="label"
          :data="labels || []"

          placeholder="All labels" />
      </bh-field>
      <bh-field
        :errors="errors.intent"
        class="bh-grid__item">
        <bh-autocomplete
          v-model="entitie"
          :data="entities || []"
          :formatters="intentFormatters"
          placeholder="All entities" />
      </bh-field>
    </form>
  </div>
</template>

<script>
import equal from 'deep-equal';
import { exampleSearchToDicty, exampleSearchToString, formatters } from '@/utils/index';
import BH from 'bh';


export default {
  name: 'SearchEaxampleTest',
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
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
      toString: exampleSearchToString(this.value),
      setTimeoutId: null,
      intent: '',
      label: '',
      entitie: '',
      errors: {},
    };
  },
  computed: {
    current() {
      return exampleSearchToDicty(this.toString);
    },
    textFormatters() {
      const formattersList = [
        BH.utils.formatters.trimStart(),
        BH.utils.formatters.removeBreakLines(),
        BH.utils.formatters.removeMultipleWhiteSpaces(),
      ];
      formattersList.toString = () => 'textFormatters';
      return formattersList;
    },
    intentFormatters() {
      const formattersList = [
        formatters.bothubItemKey(),
      ];
      formattersList.toString = () => 'intentFormatters';
      return formattersList;
    },
  },
  watch: {
    value(value) {
      if (!equal(this.current, value)) {
        this.toString = exampleSearchToString(value);
      }
    },
    toString() {
      this.$emit('input', this.current);
    },
  },
  methods: {
    onSubmit() {
      this.$emit('input', this.current);
    },
  },
};
</script>

<style lang="scss" scoped>
.search-example-test {

}
</style>
