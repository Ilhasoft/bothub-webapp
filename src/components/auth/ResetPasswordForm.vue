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
      :show-labels="false"
      class="field"/>
    <div class="field">
      <p
        class="passwordError">
        {{ confirmError }}
      </p>
      <div class="control buttonStyle">
        <button
          :disabled="submitting"
          type="submit"
          class="button is-primary"
        >{{ $t('webapp.recover_form.save_password') }}</button>
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
      confirmError: '',
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
        if (this.data.confirmPassword !== this.data.password) {
        // eslint-disable-next-line no-unused-expressions
          this.data.confirmPassword === ''
            ? this.confirmError = this.$t('webapp.register_form.confirm_password_empty')
            : this.confirmError = this.$t('webapp.register_form.password_didnt_match');
          this.submitting = false;
          return '';
        // eslint-disable-next-line no-else-return
        } else {
          this.confirmError = '';
        }

        if (this.data.confirmPassword === '') {
          this.confirmError = this.$t('webapp.register_form.confirm_password_empty');
          this.submitting = false;
        } else {
          this.confirmError = '';
        }

        delete this.data.confirmPassword;
        await this.resetPassword({
          nickname: this.nickname,
          token: this.token,
          password: this.data.password,
        });
        this.success_msgs = [this.$t('webapp.recover_form.changed_password')];
        this.$emit('reseted');

        setTimeout(() => {
          this.$router.push({
            name: 'signIn',
          });
        }, 4000);

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
      const recoverSchema = await this.getResetPasswordSchema({
        nickname: this.nickname,
      });
      const { password } = recoverSchema;
      const confirmPassword = {
        ...password, label: this.$t('webapp.recover_form.confirm_password'),
      };
      this.formSchema = { ...recoverSchema, confirmPassword };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

.passwordError{
  color: #ff3860;
  font-size: 0.75rem;
  margin: -1.4rem 0px;
}
.buttonStyle{
  display: flex;
  justify-content: center;
  align-items: center;
}
.button{
  margin-top: 2rem;
  width: 9.813rem;
  height: 2.188rem;
  border-radius: 6px;
  box-shadow: 0px 3px 6px #00000029;
  font-weight: $font-weight-bolder;
  font-family: $font-family;
  font-size: $font-size;
}

</style>
