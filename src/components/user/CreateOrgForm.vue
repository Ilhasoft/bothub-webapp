<template>
  <div>
    <form @submit.prevent="onSubmit">
      <loading v-if="!formSchema" />
      <b-loading :active="submitting" />
      <form-generator
        v-if="formSchema"
        :schema="formSchema"
        v-model="data"
        :initial-data="initialData"
        :show-labels="false"
        :errors="errors"
        class="field"/>
      <div class="control has-text-centered">
        <b-button
          :disabled="submitting"
          native-type="submit"
          type="is-primary"
          class="submit-button">{{ $t('webapp.orgs.create') }}</b-button>
      </div>
    </form>
  </div>
</template>

<script>
import FormGenerator from '@/components/form-generator/FormGenerator';
import Loading from '@/components/shared/Loading';
import { mapActions } from 'vuex';

export default {
  name: 'CreateOrgForm',
  components: {
    FormGenerator,
    Loading,
  },
  data() {
    return {
      data: null,
      formSchema: null,
      errors: [],
      submitting: false,
    };
  },
  computed: {
    initialData() {
      return {};
    },
  },
  async mounted() {
    this.formSchema = await this.getOrgSchema();
  },
  methods: {
    ...mapActions([
      'getOrgSchema',
    ]),
    onSubmit() {},
  },
};
</script>

<style lang="scss" scoped>

</style>
