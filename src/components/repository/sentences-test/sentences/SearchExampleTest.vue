<template>
  <div class="search-example-test bh-grid">
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
        :formatters="inputFormatters"
        placeholder="Intent" />
    </bh-field>
    <bh-field
      :errors="errors.label"
      label="Search for labels:"
      class="bh-grid__item">
      <bh-autocomplete
        v-model="label"
        :data="labels || []"
        :formatters="inputFormatters"
        placeholder="All labels" />
    </bh-field>
    <bh-field
      :errors="errors.intent"
      label="Search for entities:"
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
      query: {},
      queryString: '',
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
    inputFormatters() {
      const formattersList = [
        formatters.bothubItemKey(),
      ];
      formattersList.toString = () => 'inputFormatters';
      return formattersList;
    },
  },
  watch: {
    query(value) {
      console.log(value);
      this.$emit('queryString', 'value here');
    },
    text(value) {
      // this.queryString = value;
      this.$emit('queryStringFormated', { search: value });
    },
    intent(value) {
      // this.queryString = `intent:${value}`;
      this.$emit('queryStringFormated', { intent: value });
    },
    entitie(value) {
      this.$emit('queryStringFormated', { entitie: value });
    },
    label(value) {
      this.$emit('queryStringFormated', { label: value });
    },
  },
  methods: {
    // onSubmit() {
    //   const data = {
    //     intent: this.intent,
    //     entitie: this.entitie,
    //     label: this.label,
    //     search: this.text,
    //   };
    //   console.log(data);

    //   this.$emit('searchQueryString', data);
    // },
    // filterByIntent(event) {
    //   this.queryString.intent = event;
    // },
    // filterByLabel(event) {
    //   this.queryString.label = event;
    //   console.log(this.data);
    // },
    // filterByEntitie(event) {
    //   console.log(event);

    //   this.queryString.entitie = event;
    // },
    // filterByText(value) {
    //   this.queryString.text = value;
    // },
  },
};
</script>

<style lang="scss" scoped>
.search-example-test {

}
</style>
