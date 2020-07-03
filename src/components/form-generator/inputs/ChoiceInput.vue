<template>
  <b-autocomplete
    v-if="compact"
    v-model="value"
    :placeholder="labelPlaceholder"
    :custom-formatter="formatter"
    :data="filteredChoices"
    dropdown-position="bottom"
    expanded
    open-on-focus
    @input="updateInput"
    @select="selectOption"/>
  <b-select
    v-else
    v-model="value"
    expanded
    @input="update()">
    <option
      v-for="choice in choices"
      :key="choice.value"
      :value="choice.value">{{ choice.display_name }}</option>
  </b-select>
</template>

<script>
import { formatters } from '@/utils';

export default {
  props: {
    choices: {
      required: true,
      type: Array,
    },
    initialData: {
      type: [Array, String],
      default: null,
    },
    compact: {
      type: Boolean,
      default: null,
    },
    labelPlaceholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      value: this.initialData,
      formatter: choice => choice.display_name,
    };
  },
  computed: {
    filteredChoices() {
      if (!this.value || this.value.length === 0) { return this.choices; }
      const search = new RegExp(formatters.bothubItemKey()(this.value));
      return this.choices
        .filter(choice => search.test(formatters.bothubItemKey()(choice.display_name)));
    },
  },
  mounted() {
    this.update();
  },
  methods: {
    updateInput() {
      const search = formatters.bothubItemKey()(this.value);
      const option = this.choices.find(
        choice => formatters.bothubItemKey()(choice.display_name)
                    === search,
      );
      if (option) {
        this.$emit('input', option.value);
      } else {
        this.$emit('input', '');
      }
    },
    selectOption(option) {
      this.$emit('input', option.value);
    },
    update() {
      this.$emit('input', this.value);
    },
  },
};
</script>
