<template>
  <div>
    <form @submit.prevent="onSubmit">
      <loading v-if="!formSchema" />
      <b-loading :active="submitting" />
      <form-generator
        v-if="formSchema && !submitting"
        :schema="formSchema"
        v-model="data"
        :initial-data="initialData"
        :errors="errors"
        hide-help
        class="field"/>
      <div class="control has-text-centered">
        <b-button
          :disabled="submitting"
          native-type="submit"
          type="is-primary"
          class="submit-button">{{ $t('webapp.orgs.edit') }}</b-button>
      </div>
    </form>
  </div>
</template>

<script>
import FormGenerator from '@/components/form-generator/FormGenerator';
import Loading from '@/components/shared/Loading';
import { mapActions } from 'vuex';

export default {
  name: 'EditOrgForm',
  components: {
    FormGenerator,
    Loading,
  },
  props: {
    nickname: {
      type: String,
      required: true,
    },
    initialData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      data: null,
      formSchema: null,
      errors: {},
      submitting: false,
    };
  },
  mounted() {
    this.getSchema();
  },
  methods: {
    ...mapActions([
      'getEditOrgSchema',
      'editOrg',
    ]),
    async getSchema() {
      const response = await this.getEditOrgSchema({ nickname: this.nickname });
      this.formSchema = response;
    },
    async onSubmit() {
      this.submitting = true;
      try {
        await this.editOrg({ data: this.data, nickname: this.nickname });
        this.$emit('edited');
      } catch (error) {
        const data = error.response && error.response.data;
        if (data) {
          this.errors = data;
        }
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
