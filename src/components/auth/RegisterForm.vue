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
    <b-field
      label="Name"
      :type="errors.name && 'is-danger'"
      :message="errors.name">
      <b-input
        v-model="data.name"
        @input="cleanFieldErrors('name')" />
    </b-field>
    <b-field
      label="Nickname"
      :type="errors.nickname && 'is-danger'"
      :message="errors.nickname">
      <b-input
        v-model="data.nickname"
        @input="cleanFieldErrors('nickname')" />
    </b-field>
    <b-field
      label="Password"
      :type="errors.password && 'is-danger'"
      :message="errors.password">
      <b-input
        type="password"
        v-model="data.password"
        password-reveal
        @input="cleanFieldErrors('password')" />
    </b-field>
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
import { mapActions } from 'vuex';
import Messages from '@/components/shared/Messages';

const components = {
  Messages,
};

export default {
  name: 'RegisterForm',
  components,
  data() {
    return {
      submitting: false,
      data: {
        email: '',
        name: '',
        nickname: '',
        password: '',
      },
      errors: {},
    };
  },
  computed: {
    msgs() {
      /* istanbul ignore next */
      return (this.errors.non_field_errors &&
        this.errors.non_field_errors.map(text => ({ text, class: 'error' }))) || [];
    },
  },
  methods: {
    ...mapActions([
      'register',
    ]),
    async onSubmit() {
      this.errors = {};
      this.submitting = true;

      try {
        await this.register(this.data);
        this.$emit('registered');
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
