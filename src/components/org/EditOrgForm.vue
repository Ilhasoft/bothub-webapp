<template>
  <div>
    <form @submit.prevent="onSubmit">
      <loading v-if="!filteredSchema" />
      <b-loading :active="submitting" />
      <form-generator
        v-if="filteredSchema && !submitting"
        :schema="filteredSchema"
        v-model="data"
        :initial-data="initialData"
        :errors="errors"
        hide-help
        class="field"/>
      <div>
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
  computed: {
    filteredSchema() {
      if (!this.formSchema) return null;
      const { nickname, description, ...schema } = this.formSchema;
      description.type = 'text';
      return { ...schema, description };
    },
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
  .submit-button {
    padding: 0 3rem;
  }
</style>
