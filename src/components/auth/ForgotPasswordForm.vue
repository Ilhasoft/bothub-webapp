<template>
  <form @submit.prevent="onSubmit">
    <messages :msgs="msgs" />
    <field
      label="E-mail"
      help-text="Type your e-mail"
      :errors="errors.email"
      ref='emailField'
    >
      <email-input
        is-required
        v-model="data.email"
        @input="cleanFieldErrors('email')"
      />
    </field>
    <button
      type="submit"
      :disabled="submitting"
    >Reset password</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import Messages from '@/components/shared/Messages';
import Field from '@/components/shared/form/Field';
import EmailInput from '@/components/shared/form/inputs/EmailInput';

const components = {
  Messages,
  Field,
  EmailInput,
};

export default {
  name: 'ForgotPasswordForm',
  components,
  data() {
    return {
      submitting: false,
      data: {
        email: '',
      },
      success_msgs: [],
      errors: {},
    };
  },
  computed: {
    msgs() {
      return this.success_msgs.map(text => ({ text, class: 'success' })) || [];
    },
  },
  methods: {
    ...mapActions([
      'forgotPassword',
    ]),
    async onSubmit() {
      this.errors = {};
      this.submitting = true;

      try {
        await this.forgotPassword(this.data);
        this.success_msgs = ['Check your email, we\'ve sent you the instructions to reset your password.'];
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
    cleanFieldErrors(field) {
      this.errors[field] = [];
    },
  },
};
</script>
