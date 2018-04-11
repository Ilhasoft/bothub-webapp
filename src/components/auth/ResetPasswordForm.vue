<template>
  <form @submit.prevent="onSubmit">
    <messages :msgs="msgs" />
    <b-field
      label="New Password"
      :type="errors.password && 'is-danger'"
      :message="errors.password">
      <b-input
        type="password"
        v-model="data.password"
        password-reveal
        @input="cleanFieldErrors('password')" />
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
  app: 'ResetPasswordForm',
  components,
  props: {
    nickname: {
      required: true,
    },
    token: {
      required: true,
    },
  },
  data() {
    return {
      data: {},
      errors: {},
      submitting: false,
      success_msgs: [],
    };
  },
  computed: {
    msgs() {
      return (
        this.errors.token && this.errors.token
          .map(text => ({ text, class: 'error' }))) ||
        this.success_msgs.map(text => ({ text, class: 'success' })) ||
        [];
    },
  },
  methods: {
    ...mapActions([
      'resetPassword',
    ]),
    async onSubmit() {
      this.errors = {};
      this.submitting = true;

      try {
        await this.resetPassword({
          nickname: this.nickname,
          token: this.token,
          password: this.data.password,
        });
        this.success_msgs = ['Password changed'];
        this.$emit('reseted');
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
