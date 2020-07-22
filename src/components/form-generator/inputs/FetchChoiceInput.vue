<template>
  <b-field>
    <b-select
      :loading="loading"
      :disabled="isDisabled"
      :placeholder="labelPlaceholder"
      v-model="input"
      expanded>
      <option
        v-for="option in options"
        :key="option.label"
        :value="option"> {{ option.label }} </option>
    </b-select>
  </b-field>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    fetch: {
      type: Function,
      default: async () => [],
    },
    labelPlaceholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      input: null,
      options: [],
      loading: false,
    };
  },
  computed: {
    isDisabled() {
      return this.loading || !this.options || this.options.length === 0;
    },
  },
  watch: {
    org() {
      this.$emit('input', this.input.value);
    },
  },
  mounted() {
    this.getOptions();
  },
  methods: {
    ...mapActions([
      'getAllOrgs',
    ]),
    async getOptions() {
      this.loading = true;
      try {
        const list = await this.fetch();
        this.options = list;
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
