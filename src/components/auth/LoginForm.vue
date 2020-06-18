<template>
  <form @submit.prevent="onSubmit">
    <loading v-if="!formSchema" />
    <form-generator
      v-if="formSchema"
      v-model="data"
      :drf-model-instance="drfLoginModel"
      :schema="formSchema"
      :errors="errors"
      :show-labels="false"
      class="field"/>
    <div
      v-if="!hideForgotPassword"
      class="field">
      <div class="control has-text-right forgot-password">
        <a
          ref="forgotPassword"
          href="#forgot-password"
          class="has-text-grey"
          @click.prevent="forgotPasswordClick">
          {{ $t('webapp.landing_page.forgot_password') }}
        </a>
      </div>
    </div>
    <div class="field">
      <div class="control has-text-centered">
        <button
          ref="submit"
          :disabled="submitting"
          type="submit"
          class="button is-primary"
        >{{ $t('webapp.login_form.signin') }}</button>
      </div>
    </div>
  </form>
</template>

<script>
import { updateAttrsValues } from '@/utils/index';
import { mapActions } from 'vuex';
import { getModel } from 'vue-mc-drf-model';
import LoginModel from '@/models/login';
import FormGenerator from '@/components/form-generator/FormGenerator';
import Loading from '@/components/shared/Loading';


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
      drfLoginModel: {},
    };
  },
  async mounted() {
    this.formSchema = await this.getLoginSchema();
    const Model = getModel(
      this.formSchema,
      LoginModel,
    );

    this.drfLoginModel = new Model(
      {},
      null,
      {
        validateOnChange: true,
      },
    );
  },
  methods: {
    ...mapActions([
      'getLoginSchema',
      'login',
    ]),
    async onSubmit() {
      this.drfLoginModel = updateAttrsValues(this.drfLoginModel, this.data);
      this.drfLoginModel.getSaveData();

      this.submitting = true;
      this.errors = {};
      try {
        await this.drfLoginModel.save();
        this.$emit('authenticated');
        return true;
      } catch (error) {
        this.errors = this.drfLoginModel.errors;
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
<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

.forgot-password{
  margin-bottom: 1.5rem;
}
.button{
    width: 9.813rem;
    height: 2.188rem;
    border-radius: 6px;
    box-shadow: 0px 3px 6px #00000029;
    font-weight: $font-weight-bolder;
    font-family: $font-family;
    font-size: $font-size;
}
</style>
