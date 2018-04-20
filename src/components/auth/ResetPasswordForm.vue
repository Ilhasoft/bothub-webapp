<template>
  <form @submit.prevent="onSubmit">
    <messages :msgs="msgs" />
    <form-generator
      v-if="formSchema"
      :schema="formSchema"
      v-model="data"
      :initialData="initialData"
      :errors="errors"
      class="field" />
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
import FormGenerator from '@/components/form-generator/FormGenerator';

const components = {
  Messages,
  FormGenerator,
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
  mounted() {
    this.updateFormSchema();
  },
  watch: {
    nickname() {
      this.updateFormSchema();
    },
  },
  data() {
    return {
      formSchema: null,
      data: {},
      initialData: {
        token: this.token,
      },
      submitting: false,
      errors: {},
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
      'getResetPasswordSchema',
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
    async updateFormSchema() {
      this.formSchema = await this.getResetPasswordSchema({
        nickname: this.nickname,
      });
    },
  },
};
</script>
