<template>
  <form @submit.prevent="onSubmit">
    <messages :msgs="msgs" />
    <b-field
      label="E-mail"
      :type="errors.email && 'is-danger'"
      :message="errors.email">
      <b-input
        type="email"
        v-model="data.email"
        @input="cleanFieldErrors('email')" />
    </b-field>
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
import Messages from '@/components/shared/Messages';

const components = {
  Messages,
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
      this.errors[field] = null;
    },
  },
};
</script>
