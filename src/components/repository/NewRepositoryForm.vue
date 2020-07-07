<template>
  <form @submit.prevent="onSubmit()">
    <loading v-if="!formSchema" />
    <form-generator
      v-if="formSchema"
      :drf-model-instance="drfRepositoryModel"
      :schema="formSchema"
      v-model="data"
      :errors="errors" />
    <div class="text-center">
      <b-button
        :disabled="submitting"
        type="is-primary"
        native-type="submit">{{ $t('webapp.landing_page.create_bot') }}</b-button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import { updateAttrsValues } from '@/utils/index';
import { getModel } from 'vue-mc-drf-model';
import RepositoryModel from '@/models/newRepository';
import FormGenerator from '@/components/form-generator/FormGenerator';
import Loading from '@/components/shared/Loading';


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
      drfRepositoryModel: {},
    };
  },
  computed: {
    filteredSchema() {
      return Object.entries(this.formSchema).reduce((schema, entry) => {
        const [key, value] = entry;
        // eslint-disable-next-line no-param-reassign
        if (!(value.style && typeof value.style.show === 'boolean' && !value.style.show)) schema[key] = value;
        return schema;
      }, {});
    },
  },
  async mounted() {
    this.formSchema = await this.getNewRepositorySchema();
    const Model = getModel(
      this.filteredSchema,
      RepositoryModel,
    );

    this.drfRepositoryModel = new Model({},
      null,
      {
        validateOnChange: true,
      });
  },
  methods: {
    ...mapActions([
      'getNewRepositorySchema',
      'newRepository',
    ]),
    async onSubmit() {
      this.drfRepositoryModel = updateAttrsValues(this.drfRepositoryModel, this.data);
      this.submitting = true;
      this.errors = {};

      try {
        const result = await this.drfRepositoryModel.save();
        this.$emit('created', result.response.data);
        return true;
      } catch (error) {
        this.errors = this.drfRepositoryModel.errors;
        this.submitting = false;
      }

      return false;
    },
  },
};
</script>
<style lang="scss">
.animation-content.modal-content {
    overflow: visible !important;
  }
</style>
