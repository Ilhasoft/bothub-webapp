<template>
  <form @submit.prevent="onSubmit">
    <messages :msgs="msgs" />
    <loading v-if="!formSchema" />
    <form-generator
      v-if="formSchema"
      :schema="formSchema"
      v-model="data"
      :initial-data="initialData"
      :errors="errors"
      class="field" />
    <div class="field">
      <div class="control">
        <button
          :disabled="submitting"
          type="submit"
          class="button is-primary"
        >Reset password</button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import Messages from '@/components/shared/Messages';
import FormGenerator from '@/components/form-generator/FormGenerator';
import Loading from '@/components/shared/Loading';


const components = {
  Messages,
  FormGenerator,
  Loading,
};

export default {
  app: 'ResetPasswordForm',
  components,
  props: {
    nickname: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
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
          .map(text => ({ text, class: 'error' })))
        || this.success_msgs.map(text => ({ text, class: 'success' }))
        || [];
    },
  },
  watch: {
    nickname() {
      this.updateFormSchema();
    },
  },
  mounted() {
    this.updateFormSchema();
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
