<template>
  <form @submit.prevent="onSubmit">
    <messages :msgs="msgs" />
    <field
      label="New password"
      :errors="errors.password"
    >
      <text-input
        type="password"
        is-required
        :max-length=16
        v-model="data.password"
        @input="cleanFieldErrors('password')"
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
import Field from '@/components/shared/form/Field';
import TextInput from '@/components/shared/form/inputs/TextInput';
import Messages from '@/components/shared/Messages';

const components = {
  Field,
  TextInput,
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
    };
  },
  computed: {
    msgs() {
      return [];
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
