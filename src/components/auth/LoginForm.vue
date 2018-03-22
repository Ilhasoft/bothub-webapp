<template>
  <form @submit.prevent="onSubmit">
    <messages :msgs="msgs" />
    <field
      label="E-mail"
      help-text="Type your e-mail"
      :errors="errors.username"
    >
      <email-input
        is-required
        v-model="data.username"
        @input="cleanFieldErrors('username')"
      />
    </field>
    <field
      label="Password"
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
    >Login</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import Field from '@/components/shared/form/Field';
import EmailInput from '@/components/shared/form/inputs/EmailInput';
import TextInput from '@/components/shared/form/inputs/TextInput';
import Messages from '@/components/shared/Messages';

const components = {
  Field,
  EmailInput,
  TextInput,
  Messages,
};

export default {
  name: 'LoginForm',
  components,
  data() {
    return {
      submitting: false,
      data: {
        username: '',
        password: '',
      },
      errors: {},
    };
  },
  computed: {
    msgs() {
      return (this.errors.non_field_errors &&
        this.errors.non_field_errors.map(text => ({ text, class: 'error' }))) || [];
    },
  },
  methods: {
    async onSubmit() {
      this.errors = {};
      this.submitting = true;

      try {
        await this.login(this.data);
        this.$emit('authenticated');
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
    ...mapActions([
      'login',
    ]),
  },
};
</script>

<style lang="scss" scoped>
form {
  display: block;
  margin: 0;
  padding: 0;
}
</style>
