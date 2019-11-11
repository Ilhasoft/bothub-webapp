<template>
  <form @submit.prevent="onSubmit()">
    <loading v-if="!formSchema" />
    <form-generator
      v-if="formSchema"
      :schema="formSchema"
      v-model="data"
      :errors="errors"
      :initial-data="initialData" />
    <div class="text-center">
      <bh-button
        :disabled="submitting"
        primary
        type="submit">Save</bh-button>
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
  name: 'EditRepositoryForm',
  components,
  props: {
    ownerNickname: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    initialData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      formSchema: null,
      data: {},
      submitting: false,
      errors: {},
    };
  },
  async mounted() {
    this.formSchema = await this.getEditRepositorySchema({
      repositoryUuid: this.$store.state.Repository.selectedRepository.uuid,
    });
  },
  methods: {
    ...mapActions([
      'getEditRepositorySchema',
      'editRepository',
    ]),
    async onSubmit() {
      this.submitting = true;
      this.errors = {};

      try {
        const response = await this.editRepository({
          ...this.data,
          ownerNickname: this.ownerNickname,
          repositorySlug: this.slug,
          repositoryUuid: this.$store.state.Repository.selectedRepository.uuid,
        });
        this.$emit('edited', response.data);
        this.submitting = false;
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
