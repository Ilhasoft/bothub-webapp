<template>
  <form @submit.prevent="onSubmit()">
    <loading v-if="!formSchema" />
    <form-generator
      v-if="formSchema"
      :schema="formSchema"
      v-model="data"
      :errors="errors"
      :initialData="initialData"
      class="field" />
    <div class="field">
      <div class="control has-text-centered">
        <button
          type="submit"
          class="button is-primary"
          :disabled="submitting">Edit</button>
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
  name: 'EditRepositoryForm',
  components,
  async mounted() {
    this.formSchema = await this.getEditRepositorySchema({
      ownerNickname: this.ownerNickname,
      slug: this.slug,
    });
  },
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
        });
        this.$emit('edited', response.data);
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
