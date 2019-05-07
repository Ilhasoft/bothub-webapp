<template>
  <form @submit.prevent="onSubmit">
    <loading v-if="!formSchema" />
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
          :disabled="submitting"
          type="submit"
          class="button is-primary"
        >Login</button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import FormGenerator from '@/components-v1/form-generator/FormGenerator';
import Loading from '@/components-v1/shared/Loading';


const components = {
  FormGenerator,
  Loading,
};

export default {
  name: 'LoginForm',
  components,
  props: {
    hideForgotPassword: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formSchema: null,
      data: {},
      submitting: false,
      errors: {},
    };
  },
  async mounted() {
    this.formSchema = await this.getLoginSchema();
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
