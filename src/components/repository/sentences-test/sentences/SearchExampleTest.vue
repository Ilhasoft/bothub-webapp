<template>
  <div>
    <form
      class="search-example-test bh-grid"
      @submit.prevent="onSubmit()">
      <bh-field
        :errors="errors.intent"
        label="Search for text:"
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
      <bh-field
        :errors="errors.intent"
        label="Search for intent:"
        class="bh-grid__item">
        <bh-autocomplete
          v-model="intent"
          :data="intents || []"
          :formatters="intentFormatters"
          placeholder="Intent" />
      </bh-field>
      <bh-field
        :errors="errors.label"
        label="Search for labels:"
        class="bh-grid__item">
        <bh-autocomplete
          v-model="label"
          :data="labels || []"
          placeholder="All labels" />
      </bh-field>
      <bh-field
        :errors="errors.intent"
        label="Search for entities:"
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
import { formatters } from '@/utils/index';
import BH from 'bh';


export default {
  name: 'SearchEaxampleTest',
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
      setTimeoutId: null,
      intent: '',
      label: '',
      entitie: '',
      errors: {},
    };
  },
  computed: {
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
  methods: {
    onSubmit() {
      const data = {
        intent: this.intent,
        entitie: this.entitie,
        label: this.label,
        search: this.text,
      };
      console.log(data);

      this.$emit('input', data);
    },
  },
};
</script>

<style lang="scss" scoped>
.search-example-test {

}
</style>
