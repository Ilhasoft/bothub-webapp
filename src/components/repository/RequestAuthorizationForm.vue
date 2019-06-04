<template>
  <form @submit.prevent="onSubmit()">
    <loading v-if="!formSchema" />
    <form-generator
      v-if="formSchema"
      :schema="formSchema"
      v-model="data"
      :errors="errors" />
    <div>
      <bh-button
        :disabled="submitting"
        full-width
        type="submit"
        primary> Request </bh-button>
    </div>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import FormGenerator from '@/components-v1/form-generator/FormGenerator';
import Loading from '@/components-v1/shared/Loading';


const components = {
  FormGenerator,
  Loading,
};

export default {
  name: 'RequestAuthorizationForm',
  components,
  data() {
    return {
      formSchema: null,
      data: {},
      errors: {},
      submitting: false,
    };
  },
  computed: {
    ...mapState({
      repositoryUuid: state => state.Repository.selectedRepository.uuid,
    }),
  },
  async mounted() {
    await this.updateFormSchema();
  },
  methods: {
    ...mapActions([
      'getRequestRepositoryAuthorizationSchema',
      'requestRepositoryAuthorization',
    ]),
    async updateFormSchema() {
      this.formSchema = await this.getRequestRepositoryAuthorizationSchema();
    },
    async onSubmit() {
      this.errors = {};
      this.submitting = true;

      try {
        const response = await this.requestRepositoryAuthorization({
          repositoryUuid: this.repositoryUuid,
          ...this.data,
        });
        this.$emit('requested', response.data);
        return true;
      } catch (error) {
        const data = error.response && error.response.data;
        if (data) {
          this.errors = data;
        }
        this.submitting = false;
      }

      return false;
    },
  },
};
</script>
