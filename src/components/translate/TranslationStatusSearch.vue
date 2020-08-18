<template>
  <div>
    <b-field>
      <b-input
        v-model="search"
        icon-right="magnify"
        placeholder="Search" />
    </b-field>
    <b-field>
      <b-select
        v-model="percentage"
        expanded
        placeholder="All languages">
        <option
          v-for="option in options"
          :key="option.label"
          :value="option.value"> {{ option.label }} </option>
      </b-select>
    </b-field>
  </div>
</template>

<script>
export default {
  name: 'TranslationStatusSearch',
  data() {
    return {
      percentage: { 'min-percentage': 0, 'max-percentage': 100 },
      search: '',
      options: [
        { label: 'All languages', value: { 'min-percentage': 0, 'max-percentage': 100 } },
        { label: 'More than 50%', value: { 'min-percentage': 50, 'max-percentage': 100 } },
        { label: 'Less than 50%', value: { 'min-percentage': 0, 'max-percentage': 50 } },
      ],
    };
  },
  computed: {
    query() {
      return {
        search: this.search,
        ...this.percentage,
      };
    },
  },
  watch: {
    query() {
      this.$emit('input', this.query);
    },
  },
};
</script>
