<template>
  <div>
    <b-field>
      <b-input
        v-model="search"
        :placeholder="$t('webapp.translate.search')"
        icon-right="magnify" />
    </b-field>
    <b-field>
      <b-select
        v-model="percentage"
        :placeholder="$t('webapp.translate.all')"
        expanded>
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
        { label: this.$t('webapp.translate.all'), value: { 'min-percentage': 0, 'max-percentage': 100 } },
        { label: this.$t('webapp.translate.more_than_half'), value: { 'min-percentage': 50, 'max-percentage': 100 } },
        { label: this.$t('webapp.translate.less_than_half'), value: { 'min-percentage': 0, 'max-percentage': 50 } },
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
