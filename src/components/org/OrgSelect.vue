<template>
  <b-field>
    <b-select
      :loading="loading"
      :disabled="isDisabled"
      v-model="org">
      <option
        v-for="option in options"
        :key="option.id"
        :value="option.id"> {{ option.name }} </option>
      <option
        :value="null"> You </option>
    </b-select>
  </b-field>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'OrgSelect',
  data() {
    return {
      org: null,
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
      this.$emit('input', this.org);
    },
  },
  mounted() {
    this.getOrgs();
  },
  methods: {
    ...mapActions([
      'getAllOrgs',
    ]),
    async getOrgs() {
      console.log('getting orgs');
      this.loading = true;
      try {
        const response = await this.getAllOrgs();
        await response.updateItems(1);
        this.options = response.items;
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
