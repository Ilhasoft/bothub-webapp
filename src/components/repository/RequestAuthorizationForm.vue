<template>
  <form @submit.prevent="onSubmit()">
    <loading v-if="!formSchema" />
    <form-generator
      v-if="formSchema"
      :schema="formSchema"
      v-model="data"
      :errors="errors"
      class="field" />
    <div class="field">
      <div class="control has-text-centered">
        <button
          :disabled="submitting"
          type="submit"
          class="button is-primary">Request</button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import FormGenerator from '@/components/form-generator/FormGenerator';
import Loading from '@/components/shared/Loading';


const components = {
  FormGenerator,
  Loading,
};

export default {
  name: 'RequestAuthorizationForm',
  components,
  props: {
    repositoryUuid: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      formSchema: null,
      data: {},
      errors: {},
      submitting: false,
    };
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
