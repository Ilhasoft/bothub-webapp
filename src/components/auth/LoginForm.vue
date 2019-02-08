<template>
  <form @submit.prevent="onSubmit">
    <loading v-if="!formSchema" />
    <form-generator
      v-if="formSchema"
      :drf-model-instance="drfLoginModel"
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
import LoginModel from '@/models/login';
import { getModel } from 'vue-mc-drf-model';
import { mapActions } from 'vuex';
import FormGenerator from '@/components/form-generator/FormGenerator';
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
      const loginAttrs = this.drfLoginModel.defaults();


      Object.keys(loginAttrs).forEach((attrName) => {
        Object.keys(this.data).forEach((item) => {
          if (attrName === item) {
            this.drfLoginModel[attrName] = this.data[item];
          }
        });
      });
      this.drfLoginModel.getSaveData();
      this.drfLoginModel.save();
      this.errors = this.drfLoginModel.errors;


      // this.errors = {};
      // this.submitting = true;
      // try {
      //   await this.login(this.data);
      //   this.$emit('authenticated');
      //   return true;
      // } catch (error) {
      //   const data = error.response && error.response.data;
      //   if (data) {
      //     this.errors = data;
      //   }
      //   this.submitting = false;
      // }

      // return false;
    },
    forgotPasswordClick() {
      this.$emit('forgotPasswordClick');
    },
  },
};
</script>
