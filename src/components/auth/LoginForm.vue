<template>
  <form @submit.prevent="onSubmit">
    <form-generator
      v-if="formSchema"
      :schema="formSchema"
      v-model="data"
      :errors="errors"
      class="field" />
    <div
      v-if="!hideForgotPassword"
      class="field">
      <div class="control has-text-right">
        <a
          ref="forgotPassword"
          href="#forgot-password"
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
import FormGenerator from '@/components/form-generator/FormGenerator';

const components = {
  FormGenerator,
};

export default {
  name: 'LoginForm',
  props: {
    hideForgotPassword: {
      type: Boolean,
      default: false,
    },
  },
  components,
  async mounted() {
    this.formSchema = await this.getLoginSchema();
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
      'getLoginSchema',
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
    forgotPasswordClick() {
      this.$emit('forgotPasswordClick');
    },
  },
};
</script>
