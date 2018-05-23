<template>
  <form @submit.prevent="onSubmit">
    <form-generator
      v-if="formSchema && myProfile"
      :schema="formSchema"
      v-model="data"
      :errors="errors"
      class="field"
      :initialData="myProfile" />
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
import { mapActions, mapGetters } from 'vuex';
import FormGenerator from '@/components/form-generator/FormGenerator';


const components = {
  FormGenerator,
};

export default {
  name: 'EditProfileForm',
  components,
  async mounted() {
    this.formSchema = await this.getMyProfileSchema();
  },
  data() {
    return {
      formSchema: null,
      data: {},
      submitting: false,
      errors: {},
    };
  },
  computed: {
    ...mapGetters([
      'myProfile',
    ]),
  },
  methods: {
    ...mapActions([
      'getMyProfileSchema',
      'patchMyProfile',
    ]),
    async onSubmit() {
      this.submitting = true;
      this.errors = {};
      try {
        await this.patchMyProfile(this.data);
        this.$emit('edited');
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
