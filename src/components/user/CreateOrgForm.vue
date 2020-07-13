<template>
  <div>
    <form @submit.prevent="onSubmit">
      <loading v-if="!formSchema" />
      <b-loading :active="submitting" />
      <form-generator
        v-if="formSchema"
        :schema="filteredSchema"
        v-model="data"
        :initial-data="initialData"
        :show-labels="false"
        :errors="errors"
        class="field"/>
      <div class="control has-text-centered">
        <b-field>
          <b-input
            expanded
            placeholder="Invite to Organization" />
          <b-button
            class="submit-button--secondary"
            type="is-secondary"> {{ $t('webapp.orgs.send_email') }} </b-button>
        </b-field>
      </div>
      <div class="control submit-button__wrapper has-text-centered">
        <b-button
          :disabled="submitting"
          native-type="submit"
          type="is-primary"
          class="submit-button">{{ $t('webapp.orgs.create') }}</b-button>
      </div>
    </form>
  </div>
</template>

<script>
import FormGenerator from '@/components/form-generator/FormGenerator';
import Loading from '@/components/shared/Loading';
import { mapActions } from 'vuex';

export default {
  name: 'CreateOrgForm',
  components: {
    FormGenerator,
    Loading,
  },
  data() {
    return {
      data: null,
      formSchema: null,
      errors: {},
      submitting: false,
    };
  },
  computed: {
    initialData() {
      return {};
    },
    filteredSchema() {
      const { email, ...schema } = this.formSchema;
      return schema;
    },
  },
  async mounted() {
    this.formSchema = await this.getOrgSchema();
  },
  methods: {
    ...mapActions([
      'getOrgSchema',
    ]),
    onSubmit() {},
  },
};
</script>

<style lang="scss" scoped>
    .submit-button {

        &__wrapper {
            margin-top: 3.5rem;
        }

        &--secondary {
            margin-left: 0.625rem;
        }
    }
</style>
