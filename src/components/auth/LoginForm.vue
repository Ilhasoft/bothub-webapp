<template>
  <form @submit.prevent="onSubmit">
    <messages :msgs="msgs" />
    <b-field
      label="E-mail"
      :type="errors.username && 'is-danger'"
      :message="errors.username">
      <b-input
        type="email"
        v-model="data.username" />
    </b-field>
    <b-field
      label="Password"
      :type="errors.password && 'is-danger'"
      :message="errors.password">
      <b-input
        type="password"
        v-model="data.password"
        password-reveal />
    </b-field>
    <div class="field">
      <div class="control has-text-right">
        <a
          href=""
          class="has-text-grey"
          @click.prevent="forgotPasswordClick">Forgot password?</a>
      </div>
    </div>
    <div class="field">
      <div class="control has-text-centered">
        <button
            type="submit"
            class="button is-primary"
            :disabled="submitting"
          >Login</button>
      </div>
    </div>
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
    ...mapActions([
      'login',
    ]),
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
    forgotPasswordClick() {
      this.$emit('forgotPasswordClick');
    },
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
