<template>
  <form @submit.prevent="onSubmit">
    <messages :msgs="success_msgs" />
    <loading v-if="!formSchema" />
    <form-generator
      v-if="formSchema"
      :schema="formSchema"
      v-model="data"
      :errors="errors"
      class="field" />
    <div class="field">
      <div class="control">
        <button
          :disabled="submitting"
          type="submit"
          class="button is-primary">Reset password</button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import FormGenerator from '@/components/form-generator/FormGenerator';
import Messages from '@/components/shared/Messages';
import Loading from '@/components/shared/Loading';


const components = {
  FormGenerator,
  Messages,
  Loading,
};

export default {
  name: 'ForgotPasswordForm',
  components,
  data() {
    return {
      formSchema: null,
      data: {},
      submitting: false,
      errors: {},
      success_msgs: [],
    };
  },
  async mounted() {
    this.formSchema = await this.getForgotPasswordSchema();
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
