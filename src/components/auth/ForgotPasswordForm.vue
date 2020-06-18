<template>
  <form @submit.prevent="onSubmit">
    <messages :msgs="success_msgs" />
    <loading v-if="!formSchema" />
    <form-generator
      v-if="formSchema"
      :schema="formSchema"
      v-model="data"
      :errors="errors"
      :show-labels="false"
      class="field"/>
    <div class="field">
      <div class="control">
        <button
          type="button"
          class="button is-primary"
          @click="goToLoginPage">
          {{ $t('webapp.recover_form.cancel_button') }}
        </button>
        <button
          :disabled="submitting"
          type="submit"
          class="button is-primary">
          {{ $t('webapp.landing_page.reset_password') }}
        </button>
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
    goToLoginPage() {
      this.$router.push({
        name: 'signIn',
      });
    },
    async onSubmit() {
      this.errors = {};
      this.submitting = true;

      try {
        await this.forgotPassword(this.data);
        this.success_msgs = [
          {
            class: 'success',
            text: this.$t('webapp.landing_page.reset_password_success'),
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
<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

.control{
  margin-top: 1.5rem;
  display:flex;
  justify-content: center;
  align-items: center;
}
.button{
  width: 157px;
  height: 35px;
  margin: 0 0.6rem;
  font-family: $font-family;
  font-weight: $font-weight-bolder;
  border-radius: 6px;
  box-shadow: 0px 3px 6px #00000029;
}
</style>
