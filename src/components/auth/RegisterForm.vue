<template>
  <form @submit.prevent="onSubmit">
    <loading v-if="!formSchema" />
    <form-generator
      v-if="formSchema"
      :drf-model-instance="drfRegisterModel"
      :schema="formSchema"
      v-model="data"
      :errors="errors"
      class="field" />
    <div class="field">
      <div class="control has-text-centered">
        <button
          :disabled="submitting"
          type="submit"
          class="button is-primary">Register</button>
      </div>
    </div>
  </form>
</template>

<script>
import RegisterModel from '@/models/register';
import { mapActions } from 'vuex';
import { updateAttrsValues } from '@/utils/index';
import { getModel } from 'vue-mc-drf-model';
import FormGenerator from '@/components/form-generator/FormGenerator';
import Loading from '@/components-v1/shared/Loading';


const components = {
  FormGenerator,
  Loading,
};

export default {
  name: 'RegisterForm',
  components,
  data() {
    return {
      formSchema: null,
      data: {},
      submitting: false,
      errors: {},
      drfRegisterModel: {},
    };
  },
  async mounted() {
    this.formSchema = await this.getRegisterSchema();
    const Model = getModel(
      this.formSchema,
      RegisterModel,
    );

    this.drfRegisterModel = new Model(
      {},
      null,
      {
        validateOnChange: true,
      },
    );
  },
  methods: {
    ...mapActions([
      'register',
      'getRegisterSchema',
    ]),
    async onSubmit() {
      this.drfRegisterModel = updateAttrsValues(this.drfRegisterModel, this.data);
      this.drfRegisterModel.getSaveData();

      this.submitting = true;
      this.errors = {};

      try {
        await this.drfRegisterModel.save();
        this.$emit('registered');
        return true;
      } catch (error) {
        this.errors = this.drfRegisterModel.errors;
        this.submitting = false;
      }
      return false;
    },
  },
};
</script>
