<template>
  <form @submit.prevent="onSubmit">
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
          :disabled="submitting">Edit</button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import FormGenerator from '@/components/form-generator/FormGenerator';


const components = {
  FormGenerator,
};

export default {
  name: 'ChangePasswordForm',
  components,
  async mounted() {
    this.formSchema = await this.getChangePasswordSchema();
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
      'getChangePasswordSchema',
      'changePassword',
    ]),
    async onSubmit() {
      this.submitting = true;
      this.errors = {};
      try {
        await this.changePassword(this.data);
        this.$emit('changed');
        this.submitting = false;
        return true;
      } catch (error) {
        const data = error.response && error.response.data;
        if (data) {
          this.errors = data;
        }
      }
      this.submitting = false;
      return false;
    },
  },
};
</script>

