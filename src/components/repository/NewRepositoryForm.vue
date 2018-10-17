<template>
  <form @submit.prevent="onSubmit()">
    <loading v-if="!formSchema" />
    <form-generator
      v-if="formSchema"
      :schema="formSchema"
      v-model="data"
      :errors="errors" />
    <div class="new-repository-form__create-button">
      <bh-button
        :disabled="submitting"
        primary
        type="submit">Create bot
      </bh-button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import FormGenerator from '@/components-v1/form-generator/FormGenerator';
import Loading from '@/components-v1/shared/Loading';


const components = {
  FormGenerator,
  Loading,
};

export default {
  name: 'NewRepositoryForm',
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
    this.formSchema = await this.getNewRepositorySchema();
  },
  methods: {
    ...mapActions([
      'getNewRepositorySchema',
      'newRepository',
    ]),
    async onSubmit() {
      this.submitting = true;
      this.errors = {};

      try {
        const response = await this.newRepository(this.data);
        this.$emit('created', response.data);
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
.new-repository-form {

  &__create-button {
    text-align: center;
  }
}
</style>
