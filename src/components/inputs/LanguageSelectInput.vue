<template>
  <b-autocomplete
    v-model="value"
    v-bind="$attrs"
    :custom-formatter="formatter"
    :data="filteredChoices"
    dropdown-position="bottom"
    expanded
    open-on-focus
    @input="updateInput"
    @select="selectOption"/>
</template>

<script>
import { formatters, LANGUAGES } from '@/utils/index';

export default {
  name: 'LanguageSelectInput',
  props: {
    initialData: {
      type: [Array, String],
      default: null,
    },
    exclude: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      value: this.initialData,
      formatter: choice => choice.display_name,
    };
  },
  computed: {
    choices() {
      return Object.keys(LANGUAGES)
        .filter(([lang]) => !this.exclude.includes(lang))
        .map(lang => ({ value: lang, display_name: LANGUAGES[lang] }));
    },
    filteredChoices() {
      if (!this.value || this.value.length === 0) { return this.choices; }
      const search = new RegExp(formatters.bothubItemKey()(this.value.toLowerCase()));
      return this.choices.filter(
        choice => search.test(formatters.bothubItemKey()(choice.display_name.toLowerCase())),
      );
    },
  },
  mounted() {
    this.update();
  },
  methods: {
    updateInput() {
      const search = formatters.bothubItemKey()(this.value);
      const option = this.choices.find(
        choice => formatters.bothubItemKey()(choice.display_name.toLowerCase())
                    === search.toLowerCase(),
      );
      if (option) {
        this.$emit('input', option.value);
      } else {
        this.$emit('input', null);
      }
    },
    selectOption(option) {
      if (option) {
        this.$emit('input', option.value);
      } else {
        this.$emit('input', null);
      }
    },
    update() {
      this.$emit('input', this.value);
    },
  },
};
</script>
