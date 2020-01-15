<template>
  <form @submit.prevent="onSubmit">
    <loading v-if="!formSchema" />
    <form-generator
      v-if="formSchema"
      v-model="data"
      :drf-model-instance="drfLoginModel"
      :schema="formSchema"
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
          @click.prevent="forgotPasswordClick">
          {{ this.$i18n.t('$bothub.landing_page.forgot_password') }}
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
        >Login</button>
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
