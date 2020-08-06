<template>
  <form @submit.prevent="onSubmit">
    <loading v-if="!formSchema" />
    <form-generator
      v-if="formSchema"
      :schema="formSchema"
      v-model="data"
      :errors="errors"
      class="field" />
    <div class="field">
      <div class="control has-text-centered">
        <b-button
          :disabled="submitting"
          native-type="submit"
          type="is-primary"
          class="submit">{{ $t('webapp.my_profile.edit') }}</b-button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import FormGenerator from '@/components/form-generator/FormGenerator';
import Loading from '@/components/shared/Loading';


const components = {
  FormGenerator,
  Loading,
};

export default {
  name: 'ChangePasswordForm',
  components,
  data() {
    return {
      formSchema: null,
      data: {},
      submitting: false,
      errors: {},
    };
  },
  async mounted() {
    this.formSchema = await this.getChangePasswordSchema();
  },
  methods: {
    ...mapActions([
      'getChangePasswordSchema',
      'changePassword',
    ]),
    async onSubmit() {
      this.submitting = true;
      this.errors = {};
      try {
        await this.changePassword(this.data);
        this.$emit('changed');
        this.submitting = false;
        return true;
      } catch (error) {
        const data = error.response && error.response.data;
        if (data) {
          this.errors = data;
        }
      }
      this.submitting = false;
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
  .submit {
    margin-top: 2rem;
  }
</style>
