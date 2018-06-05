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
          type="submit"
          class="button is-primary"
          :disabled="submitting">Create bot</button>
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
        this.$emit('created', response.data);
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

