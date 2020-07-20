<template>
  <div>
    <form @submit.prevent="onSubmit">
      <loading v-if="!org || !formSchema" />
      <b-loading :active="submitting" />
      <form-generator
        v-if="formSchema && !submitting"
        :schema="formSchema"
        v-model="data"
        :initial-data="org"
        :errors="errors"
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
    org: {
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
  computed: {
    initialData() {
      return {};
    },
  },
  watch: {
    org() {
      this.getSchema();
    },
  },
  mounted() {
    this.getSchema();
  },
  methods: {
    ...mapActions([
      'getNewOrgSchema',
      'editOrg',
    ]),
    async getSchema() {
      if (!this.org) return;
      const response = await this.getNewOrgSchema({ nickname: this.org.nickname });
      this.formSchema = response;
    },
    async onSubmit() {
      this.submitting = true;
      try {
        await this.editOrg({ data: this.data, nickname: this.org.nickname });
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
