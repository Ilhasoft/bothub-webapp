<template>
  <form @submit.prevent="onSubmit">
    <messages :msgs="success_msgs" />
    <form-generator
      v-if="formSchema"
      :schema="formSchema"
      v-model="data"
      :errors="errors"
      class="field" />
    <div class="field">
      <div class="control">
        <button
            type="submit"
            class="button is-primary"
            :disabled="submitting"
          >Reset password</button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import FormGenerator from '@/components/form-generator/FormGenerator';
import Messages from '@/components/shared/Messages';

const components = {
  FormGenerator,
  Messages,
};

export default {
  name: 'ForgotPasswordForm',
  components,
  async mounted() {
    this.formSchema = await this.getForgotPasswordSchema();
  },
  data() {
    return {
      formSchema: null,
      data: {},
      submitting: false,
      errors: {},
      success_msgs: [],
    };
  },
  methods: {
    ...mapActions([
      'getForgotPasswordSchema',
      'forgotPassword',
    ]),
    async onSubmit() {
      this.errors = {};
      this.submitting = true;

      try {
        await this.forgotPassword(this.data);
        this.success_msgs = [
          {
            class: 'success',
            text: 'Check your email, we\'ve sent you the instructions to reset your password.',
          },
        ];
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
