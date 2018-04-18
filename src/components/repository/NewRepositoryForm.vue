<template>
  <form @submit.prevent="onSubmit()">
    <form-generator
      v-if="formSchema"
      :schema="formSchema"
      v-model="data"
      :errors="errors" />
    <div class="field">
      <div class="control has-text-centered">
        <button
            type="submit"
            class="button is-primary"
            :disabled="submitting"
          >Register</button>
      </div>
    </div>
  </form>
</template>

<script>
import FormGenerator from '@/components/form-generator/FormGenerator';
import { mapActions } from 'vuex';

const components = {
  FormGenerator,
};

export default {
  name: 'NewRepositoryForm',
  components,
  async mounted() {
    this.formSchema = await this.getNewRepositorySchema();
  },
  data() {
    return {
      formSchema: null,
      data: {},
      submitting: false,
      errors: {},
    };
  },
  methods: {
    ...mapActions([
      'getNewRepositorySchema',
      'newRepository',
    ]),
    async onSubmit() {
      this.submitting = true;
      this.errors = {};

      try {
        const response = await this.newRepository(this.data);
        this.$emit('created', response);
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

